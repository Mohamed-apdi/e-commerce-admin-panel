import { Button } from '@/components/ui/button';
import { getBlogs } from '@/features/blog/blogSlice';
import { Table } from 'antd';
import { Pencil, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const columns = [
    {
      title: 'No.',
      dataIndex: 'no',
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Author',
      dataIndex: 'author',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'NumViews',
      dataIndex: 'numViews',
    },
    {
      title: 'Likes',
      dataIndex: 'likes',
    },
    {
      title: 'DisLikes',
      dataIndex: 'disLikes',
    },
    {
      title:"Action",
      dataIndex:"action"
    }
    
  ];
  


const Blog = () => {

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getBlogs());
    },[dispatch]);

    const blogState = useSelector((state) => state.blog.blogs);



  const data = [];
  for (let i = 0; i < blogState.length; i++) {
    data.push({
      no: i +1,
      title: blogState[i].title,
      author:blogState[i].author,
      category:blogState[i].category,
      numViews:blogState[i].numView,
      likes:0,
      disLikes:0,
      action: <div className='flex gap-2'><Link><Pencil className='w-6 h-6 text-green-500 text-center hover:bg-gray-200  rounded p-[4px]'/></Link><Link><Trash2 className='text-red-500 w-6 h-6 text-center hover:bg-gray-200  rounded p-[4px]'/></Link></div>,
    });
  }
  return (
    <div className="my-4">
    <div className='bg-white shadow-md rounded-sm border'>
    <div className='flex justify-between px-4 items-center'>
    <h3 className="scroll-m-20 text-3xl pl-7 py-4 font-semibold tracking-tight text-start">Blogs</h3>
    <Button><Link to="/admin/add-blog">Add New Blog</Link></Button>
    </div>
    <Table  columns={columns} dataSource={data} />
    </div>
  </div>
  )
}

export default Blog