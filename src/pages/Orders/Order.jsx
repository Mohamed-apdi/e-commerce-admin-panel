import { getOrders } from '@/features/Orders/orderSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AlertCircle, Pencil, Trash2 } from 'lucide-react';
import classNames from 'classnames';

const Order = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  },[dispatch]);

  const {orders, isLoading} = useSelector((state) => state.order);

  
  const data = orders.map((order, index) => ({
    no: index + 1,
    product: order.products.map((item) => item.product ? item.product.title : "").join(""),
    status: (
      <span 
      className={classNames('px-1.5 py-0.5 rounded-md text-black', {
        'bg-green-500 text-white font-semibold': order.orderStatus === 'Paid',
        'bg-red-500 text-white font-semibold': order.orderStatus === 'Cancelled',
        'bg-yellow-500 text-white font-semibold': order.orderStatus === 'Processing',
        'bg-gray-500 text-white font-semibold': order.orderStatus === 'Not processed',
      })}
      >
      {order.orderStatus}
    </span>
    ),
    count: order.products.map((item) => item.count).join(", "),
    color: order.products.map((item) => item.color ? item.color : "").join(", "),
    price: order.products.map((item) => item.product ? item.product.price : "").join(", "),
    method: order.paymentIntent?.method || "",
    date: new Date(order.createdAt).toLocaleDateString(),
    amount: order.paymentIntent.amount || "no",
    orderby: order.orderby ? `${order.orderby.firstname} ${order.orderby.lastname}` : "",
    action: (
      <div className='flex gap-2'>
        <Link to={`update/${order._id}`}>
          <Pencil className='w-6 h-6 text-green-500 text-center hover:bg-gray-200 rounded p-[4px]' />
        </Link>
        <Link to={`/delete/${order._id}`}>
          <Trash2 className='text-red-500 w-6 h-6 text-center hover:bg-gray-200 rounded p-[4px]' />
        </Link>
      </div>
    )
  }));
  
  return (
    <div className="my-4">
    <div className='bg-white shadow-md rounded-sm border'>
    <h3 className="scroll-m-20 text-2xl pl-7 py-4 font-semibold tracking-tight">Orders List</h3>
    <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Count</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Orderby</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: data.length }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-5 w-10" /></TableCell>
                  <TableCell><Skeleton className="h-5" /></TableCell>
                  <TableCell><Skeleton className="h-5" /></TableCell>
                  <TableCell><Skeleton className="h-5" /></TableCell>
                  <TableCell><Skeleton className="h-5" /></TableCell>
                  <TableCell><Skeleton className="h-5" /></TableCell>
                  <TableCell><Skeleton className="h-5" /></TableCell>
                  <TableCell><Skeleton className="h-5" /></TableCell>
                  <TableCell><Skeleton className="h-5" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-5 w-24" /></TableCell>
                </TableRow>
              ))
            ) : data.length > 0 ? (
              data.map((item, key) => (
                <TableRow key={key}>
                  <TableCell>{item.no}</TableCell>
                  <TableCell className="font-medium text-xs flex gap-5 flex-col">{item.product}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.count}</TableCell>
                  <TableCell>{item.color}</TableCell>
                  <TableCell>{item.method}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>${item.amount}</TableCell>
                  <TableCell>{item.orderby}</TableCell>
                  <TableCell>{item.action}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} className="text-center">
                  <div className="flex flex-col items-center justify-center">
                    <AlertCircle className="w-12 h-12 text-gray-400 mb-2" />
                    <span className="text-gray-400 ">No data available</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
    </div>
  </div>
  )
}

export default Order