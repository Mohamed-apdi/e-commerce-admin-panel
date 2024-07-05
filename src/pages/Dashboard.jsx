import { IoTrendingUpOutline , IoTrendingDown  } from "react-icons/io5";
import ReactECharts from 'echarts-for-react';
import { Separator } from '@/components/ui/separator';
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrders, getRecentOrders } from "@/features/Orders/orderSlice";
import { Link } from "react-router-dom";
import { AlertCircle, Eye } from "lucide-react";
import { IoCubeOutline,IoAnalyticsOutline  } from "react-icons/io5";
import { TiChartBar } from "react-icons/ti";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";



const Dashboard = () => {

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '${value}'
      }
    },
    series: [{
      data: [50, 130, 525, 285, 470, 130, 285, 240, 710, 470, 640, 1110],
      barWidth: '60%',
      type: 'bar',
      color:"#ffd60a"
    }]
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecentOrders());
    dispatch(getOrders());
  },[dispatch]);


  const {recentOrder, isLoading} = useSelector((state) => state.order);

  
  const data = recentOrder.map((order, index) => ({
    no: index + 1,
    product: order.products.map((item) => item.product ? item.product.title : "").join(""),
    status: order.orderStatus,
    count: order.products.map((item) => item.count).join(", "),
    color: order.products.map((item) => item.color ? item.color : "").join(", "),
    price: order.products.map((item) => item.product ? item.product.price : "").join(", "),
    method: order.paymentIntent?.method || "",
    date: new Date(order.createdAt).toLocaleDateString(),
    amount: order.paymentIntent?.amount || "",
    orderby: order.orderby ? `${order.orderby.firstname} ${order.orderby.lastname}` : "",
    action: (
      <div className='flex gap-2'>
        <Link to={`/delete/${order.id}`}>
          <Eye className='text-blue-500 w-6 h-6 text-center hover:bg-gray-200 rounded p-[4px]' />
        </Link>
      </div>
    )
  }));


  return (
    <>
      <h3 className='scroll-m-20 pb-2 mb-5 text-3xl font-semibold tracking-tight first:mt-0'>Dashbard</h3>
      <div className="flex justify-around items-center gap-3">
        <div className=" w-80 p-3 shadow-md border rounded-md bg-white">
          <div className="flex justify-between items-center">
            <h5 className="scroll-m-20 text-sm text-muted-foreground font-semibold tracking-tight">Total sells</h5>
            <TiChartBar className="text-green-500 text-3xl"/>
          </div>
          <div className="mt-4 text-center flex justify-between">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">$3799.00</h3>
           <div>
           <h5 className="scroll-m-20 text-sm mt-2 text-end text-green-600 font-semibold tracking-tight"><IoTrendingUpOutline  className="inline text-sm"/> 34.7%</h5>
            <p className="text-sm text-muted-foreground leading-7">Compared to April 2021</p>
           </div>
          </div>
        </div>
        <div className=" w-80 p-3 shadow-md  border rounded-md bg-white">
          <div className="flex justify-between items-center">
            <h5 className="s`croll-m-20 text-sm text-muted-foreground font-semibold tracking-tight">Average order value</h5>
            <button><IoAnalyticsOutline className="text-red-500 text-3xl"/></button>
          </div>
          <div className="mt-5 text-center flex justify-between">
            <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight">$272.98</h3>
            <div>
            <h5 className="scroll-m-20 text-sm mt-2 text-end text-red-600 font-semibold tracking-tight"><IoTrendingDown   className="inline text-sm"/>12.0%</h5>
            <p className="text-sm text-muted-foreground leading-7">Compared to April 2021</p>
            </div>
          </div>
        </div>
        <div className=" w-80 p-3 shadow-md  border rounded-md bg-white">
          <div className="flex justify-between items-center">
            <h5 className="scroll-m-20 text-sm text-muted-foreground font-semibold tracking-tight">Total orders</h5>
            <button><IoCubeOutline className="text-green-500 text-3xl"/></button>
          </div>
          <div className="mt-5 text-center flex justify-between">
            <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight">578</h3>
            <div>
            <h5 className="scroll-m-20 text-sm mt-2 text-end text-green-600 font-semibold tracking-tight"><IoTrendingUpOutline  className="inline text-sm"/>27.9%</h5>
            <p className="text-sm text-muted-foreground leading-7">Compared to April 2021</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-1">
      <div className="my-4 w-[50%]">
        <div className='bg-white shadow-md rounded-sm border'>
        <h3 className="scroll-m-20 text-2xl pl-7 py-4 font-semibold tracking-tight">Recent Reviews</h3>
        <Separator className="my-1"/>
        <div className="flex justify-between mb-2 px-3 items-center">
          <div className="flex gap-x-4 items-center">
            <img className='rounded border w-16 h-16' src="/public/images/camera.jpg" alt="img" />
            <div>
            <h4 className="scroll-m-20 hover:underline text-sm font-semibold tracking-tight">Wiper Blades Brandix WL2</h4>
            <p className="text-xs leading-7 text-muted-foreground">Reviewed by Ryan Ford</p>
          </div>
          </div>
          <div>
          <ReactStars
              count={5}
              size={24}
              value={2}
              edit={false}
              activeColor="#ffd700"
            />
          </div>
        </div>
        <Separator className="my-1"/>
        <div className="flex justify-between mb-2 px-3 items-center">
          <div className="flex gap-x-4 items-center">
            <img className='rounded border w-16 h-16' src="/public/images/camera.jpg" alt="img" />
            <div>
            <h4 className="scroll-m-20 hover:underline text-sm font-semibold tracking-tight">Wiper Blades Brandix WL2</h4>
            <p className="text-xs leading-7 text-muted-foreground">Reviewed by Ryan Ford</p>
          </div>
          </div>
          <div>
          <ReactStars
              count={5}
              size={24}
              value={2}
              edit={false}
              activeColor="#ffd700"
            />
          </div>
        </div>
        <Separator className="my-1"/>
        <div className="flex justify-between mb-2 px-3 items-center">
          <div className="flex gap-x-4 items-center">
            <img className='rounded border w-16 h-16' src="/public/images/camera.jpg" alt="img" />
            <div>
            <h4 className="scroll-m-20 hover:underline text-sm font-semibold tracking-tight">Wiper Blades Brandix WL2</h4>
            <p className="text-xs leading-7 text-muted-foreground">Reviewed by Ryan Ford</p>
          </div>
          </div>
          <div>
          <ReactStars
              count={5}
              size={24}
              value={2}
              edit={false}
              activeColor="#ffd700"
            />
          </div>
        </div>
        <Separator className="my-1"/>
        <div className="flex justify-between mb-2 px-3 items-center">
          <div className="flex gap-x-4 items-center">
            <img className='rounded border w-16 h-16' src="/public/images/camera.jpg" alt="img" />
            <div>
            <h4 className="scroll-m-20 hover:underline text-sm font-semibold tracking-tight">Wiper Blades Brandix WL2</h4>
            <p className="text-xs leading-7 text-muted-foreground">Reviewed by Ryan Ford</p>
          </div>
          </div>
          <div>
          <ReactStars
              count={5}
              size={24}
              value={2}
              edit={false}
              activeColor="#ffd700"
            />
          </div>
        </div>
        <Separator className="my-1"/>
        <div className="flex justify-between mb-4 px-3 items-center">
          <div className="flex gap-x-4 items-center">
            <img className='rounded border w-16 h-16' src="/public/images/camera.jpg" alt="img" />
            <div>
            <h4 className="scroll-m-20 hover:underline text-sm font-semibold tracking-tight">Wiper Blades Brandix WL2</h4>
            <p className="text-xs leading-7 text-muted-foreground">Reviewed by Ryan Ford</p>
          </div>
          </div>
          <div>
          <ReactStars
              count={5}
              size={24}
              value={2}
              edit={false}
              activeColor="#ffd700"
            />
          </div>
        </div>
        </div>
      </div>
      <div className="my-4 w-[65%]">
        <div className="bg-white shadow-md rounded-sm border">
        <h3 className="scroll-m-20 text-2xl pl-7 py-4 font-semibold tracking-tight">Income statistics</h3>
        <ReactECharts option={option} style={{ height: 400 }} />
        </div>
      </div>
      </div>
        
      <div className="my-4">
        <div className='bg-white shadow-md rounded-sm border'>
        <h3 className="scroll-m-20 text-2xl pl-7 py-4 font-semibold tracking-tight">Recent Orders</h3>
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
                <TableCell colSpan={7} className="text-center">
                  <div className="flex flex-col items-center">
                    <AlertCircle className="w-12 h-12 text-gray-400 mb-2" />
                    <span className="text-gray-400">No data available</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </div>
      </div>

     
    </>
  )
}

export default Dashboard