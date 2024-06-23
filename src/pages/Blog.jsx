import { Button } from '@/components/ui/button';
import { getBlogs } from '@/features/blog/blogSlice';
import { Pencil, Trash2 } from 'lucide-react';
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
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";



const Blog = () => {

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getBlogs());
    },[dispatch]);

    const {blogs,isLoading} = useSelector((state) => state.blog);



  const data = blogs.map((blog, index) => ({
    no: index +1,
    title: blog.title,
    author:blog.author,
    category:blog.category,
    numViews:blog.numView,
    likes:0,
    disLikes:0,
    action: <div className='flex gap-2'><Link><Pencil className='w-6 h-6 text-green-500 text-center hover:bg-gray-200  rounded p-[4px]'/></Link><Link><Trash2 className='text-red-500 w-6 h-6 text-center hover:bg-gray-200  rounded p-[4px]'/></Link></div>,
  }))

  return (
    <div className="my-4">
    <div className='bg-white shadow-md rounded-sm border'>
    <div className='flex justify-between px-4 items-center'>
    <h3 className="scroll-m-20 text-3xl pl-7 py-4 font-semibold tracking-tight text-start">Blogs</h3>
    <Button><Link to="/admin/add-blog">Add New Blog</Link></Button>
    </div>
    <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>NumViews</TableHead>
              <TableHead>Likes</TableHead>
              <TableHead>DisLikes</TableHead>
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
                  <TableCell className="text-right"><Skeleton className="h-5 w-24" /></TableCell>
                </TableRow>
              ))
            ) : (
              data.map((item, key) => (
                <TableRow key={key}>
                  <TableCell>{item.no}</TableCell>
                  <TableCell className="font-medium text-sm">{item.title}</TableCell>
                  <TableCell>{item.author}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.numViews}</TableCell>
                  <TableCell>{item.likes}</TableCell>
                  <TableCell>{item.disLikes}</TableCell>
                  <TableCell className="text-right">{item.action}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
    </div>
  </div>
  )
}

export default Blog