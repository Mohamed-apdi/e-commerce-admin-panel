import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { OrdersService } from "@/features/Orders/orderService"
import { getOrderById, updateOrder } from "@/features/Orders/orderSlice"
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"



const UpdateOrder = () => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const [status, setStatus] = useState("");
    const [orderStatusEnum, setOrderStatusEnum] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(getOrderById(id));
        const fetchOrderStatusEnum = async () => {
            try {
              const statuses = await OrdersService.getOrderStatusEnum();
              setOrderStatusEnum(statuses);
            } catch (error) {
              toast.error("Failed to fetch order status enum:", error)
            }
          };
          fetchOrderStatusEnum();
    }, [dispatch, id])

    const {myorder} = useSelector((state) => state.order);

    
    
    useEffect(() => {
        if (myorder && myorder.orderStatus) {
          setStatus(myorder.orderStatus);
        }
      }, [myorder]);
    
      const handleStatusChange = (value) => {
        setStatus(value);
      };
    
      const handleSubmit =  () => {
        dispatch(updateOrder({ id, data: { status } }));
        toast.success("Order status updated successfully");
        navigate("/admin/orders");
      };
      
  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Update Order Status</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="status">Order status</Label>
                <Select onValueChange={handleStatusChange}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder={status} />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {orderStatusEnum.map((statusValue, index) => (
                      <SelectItem key={index} value={statusValue}>
                        {statusValue}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSubmit}>Deploy</Button>
        </CardFooter>
        
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      </Card>
    </div>
  )
}

export default UpdateOrder