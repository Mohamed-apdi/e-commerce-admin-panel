import { getOrders } from '@/features/Orders/orderSlice';
import { Table } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const columns = [
  {
    title: 'No.',
    dataIndex: 'no',
  },
  {
    title: 'Product',
    dataIndex: 'product',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Count',
    dataIndex: 'count',
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: 'Method',
    dataIndex: 'method',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
  {
    title: "Orderby",
    dataIndex: "orderby",
  }
];


const Order = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  },[dispatch]);

  const orderState = useSelector((state) => state.order.orders);

   // Transform orderState into a format suitable for the table
  const data = orderState.map((order, index) => {
    const firstProduct = order.products[0] || {}; // Accessing the first product safely

    return {
      no: index + 1, // Showing order number starting from 1
      product: firstProduct.product.title, // Provide a default value if not available
      status: order.orderStatus,
      count: firstProduct.count, // Provide a default value if not available
      color: firstProduct.color, // Provide a default value if not available
      method: order.paymentIntent.method,
      date:new Date(order.createdAt).toLocaleString(),
      amount: order.paymentIntent.amount,
      orderby: order.orderby.fastname,
    };
  });
  
  return (
    <div className="my-4">
    <div className='bg-white shadow-md rounded-sm border'>
    <h3 className="scroll-m-20 text-2xl pl-7 py-4 font-semibold tracking-tight">Orders List</h3>
    <Table  columns={columns} dataSource={data} />
    </div>
  </div>
  )
}

export default Order