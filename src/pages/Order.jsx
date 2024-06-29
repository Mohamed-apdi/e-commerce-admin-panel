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




const Order = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  },[dispatch]);

  const {orders, isLoading} = useSelector((state) => state.order);

  
  const data = orders.map((order, index) => ({
    no: index + 1,
    product: order.products.map((item) => item.product ? item.product.title : "Unknown Product").join(", "),
    status: order.orderStatus,
    count: order.products.map((item) => item.count).join(", "),
    color: order.products.map((item) => item.color ? item.color : "Unknown Color").join(", "),
    price: order.products.map((item) => item.product ? item.product.price : "Unknown Price").join(", "),
    method: order.paymentIntent?.method || "Unknown Method",
    date: new Date(order.createdAt).toLocaleString(),
    amount: order.paymentIntent?.amount || "Unknown Amount",
    orderby: order.orderby ? `${order.orderby.firstname} ${order.orderby.lastname}` : "Unknown User",
  }));
  console.log(data)
  
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: data.length }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-5 w-10" /></TableCell>
                  <TableCell><Skeleton className="h-5" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-5 w-24" /></TableCell>
                </TableRow>
              ))
            ) : (
              data.map((item, key) => (
                <TableRow key={key}>
                  <TableCell>{item.no}</TableCell>
                  <TableCell className="font-medium text-xs">{item.product}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.count}</TableCell>
                  <TableCell>{item.color}</TableCell>
                  <TableCell>{item.method}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>{item.orderby}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
    </div>
  </div>
  )
}

export default Order