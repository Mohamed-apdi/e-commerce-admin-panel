import { getEnquiries } from '@/features/Enquiries/enquiriesSlice';
import { AlertCircle, Pencil, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
const Enquiries = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEnquiries());
  }, [dispatch]);

  const { enquiries, isLoading } = useSelector((state) => state.enquiry) || [];

  const data = enquiries.map((enquiry, index) => ({
    no: index + 1,
    name: enquiry.name,
    email: enquiry.email,
    phone: enquiry.mobile,
    status: enquiry.status,
    comment: enquiry.comment,
    action: (
      <div className='flex gap-2'>
        <Link to={`/edit/${enquiry.id}`}>
          <Pencil className='w-6 h-6 text-green-500 text-center hover:bg-gray-200 rounded p-[4px]' />
        </Link>
        <Link to={`/delete/${enquiry.id}`}>
          <Trash2 className='text-red-500 w-6 h-6 text-center hover:bg-gray-200 rounded p-[4px]' />
        </Link>
      </div>
    )
  }));

  return (
    <div className="my-4">
      <div className='bg-white shadow-md rounded-sm border'>
        <h3 className="scroll-m-20 text-2xl pl-7 py-4 font-semibold tracking-tight">Enquiries</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead >Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: data.length }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-4 w-10" /></TableCell>
                  <TableCell><Skeleton className="h-4" /></TableCell>
                  <TableCell><Skeleton className="h-4" /></TableCell>
                  <TableCell><Skeleton className="h-4" /></TableCell>
                  <TableCell><Skeleton className="h-4" /></TableCell>
                  <TableCell><Skeleton className="h-4" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-4 w-24" /></TableCell>
                </TableRow>
              ))
            ) : data.length > 0 ? (
              data.map((item, key) => (
                <TableRow key={key}>
                  <TableCell>{item.no}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.comment}</TableCell>
                  <TableCell className="text-right">{item.action}</TableCell>
                </TableRow>
              ))
            ): (
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
  );
}

export default Enquiries;
