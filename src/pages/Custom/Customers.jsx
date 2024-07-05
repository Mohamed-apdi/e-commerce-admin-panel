import { deleteUser, getUsers } from '@/features/customers/customerSlice';
import { AlertCircle, Pencil, Trash2 } from 'lucide-react';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import toast, { Toaster } from 'react-hot-toast';


const Customers = () => {
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const { customers, isLoading } = useSelector((state) => state.customer);

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id)).then(() => {
      toast.success("Customer deleted successfully");
      dispatch(getUsers());
    }).catch(() => {
      toast.error("Failed to delete Customer");
    });
  }

  const data = customers.map((user, index) => ({
    no: index + 1,
    name: `${user.firstname} ${user.lastname}`,
    email: user.email,
    phone: user.mobile,
    role: (
      <Badge variant={user.role === 'admin' ? 'destructive' : 'secondary'}>
        {user.role}
      </Badge>
    ),
    address: user.address,
    isBlocked: user.isBlocked ? "Blocked" : "unBlocked",
    action: (
      <div className='flex gap-2'>
        <Link to={`edit/${user._id}`}>
          <Pencil className='w-6 h-6 text-green-500 text-center hover:bg-gray-200 rounded p-[4px]' />
        </Link>
        <Link onClick={() => handleDeleteUser(user._id)}>
          <Trash2 className='text-red-500 w-6 h-6 text-center hover:bg-gray-200 rounded p-[4px]' />
        </Link>
      </div>
    )
  }));

 

  return (
    <div className="my-4">
      <div className='bg-white shadow-md rounded-sm border'>
        <h3 className="scroll-m-20 text-2xl pl-7 py-4 font-semibold tracking-tight">Customers List</h3>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Blocked</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-5 w-10" /></TableCell>
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
                  <TableCell className="font-medium text-sm">{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell>{item.isBlocked}</TableCell>
                  <TableCell className="text-right">{item.action}</TableCell>
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
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
}

export default Customers;
