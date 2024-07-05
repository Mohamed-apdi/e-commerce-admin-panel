import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { createCategory, deleteCategory, getBlogCategorys, updateCategory } from '@/features/blogCategory/bCategorySlice';
import { Link } from 'react-router-dom';
import { AlertCircle, Pencil, Trash2 } from 'lucide-react';
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from 'formik';
import * as Yup from 'yup';


 
  let schema = Yup.object().shape({
    title: Yup.string().required("Title is Required"),
  });


const Blogcatlist = () => {

  const dispatch = useDispatch();
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(getBlogCategorys());
  },[dispatch]);

  const {blogCategorys, isLoading} = useSelector((state) => state.bcategory)

  const handleCategoryDelete = (id) => {
    dispatch(deleteCategory(id)).then(() => {
      toast.success("Category deleted successfully...");
      formik.resetForm();
      dispatch(getBlogCategorys());
    }).catch(() => {
      toast.error("Failed to deleted Category...");
    });
  }

  const handleCategoryEdit = (category) => {
    setCurrentCategory(category);
    setIsDialogOpen(true);
    formik.setFieldValue("title", category.title);
  }

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: values => {
      if (currentCategory) {
        dispatch(updateCategory({ id: currentCategory._id, categoryData: values })).then(() => {
          toast.success("Category updated successfully...");
          setCurrentCategory(null);
          formik.resetForm();
          dispatch(getBlogCategorys());
        }).catch(() => {
          toast.error("Failed to update Category...");
        });
      }else{
      dispatch(createCategory(values)).then(() => {
        toast.success("Category created successfully...");
        formik.resetForm();
        dispatch(getBlogCategorys());
      }).catch(() => {
        toast.error("Failed to create Category...");
      });
    }
    setIsDialogOpen(false);
    }
  });

  const data = blogCategorys.map((category, index) => ({
    no: index + 1,
    title: category.title,
    action: <div className='flex gap-2'><Link><Pencil onClick={() => handleCategoryEdit(category)} className='w-6 h-6 text-green-500 text-center hover:bg-gray-200  rounded p-[4px]'/></Link><Link><Trash2 onClick={() => handleCategoryDelete(category._id)} className='text-red-500 w-6 h-6 text-center hover:bg-gray-200  rounded p-[4px]'/></Link></div>,
  }))


  return (
    <div className="my-4">
      <div>
      
      </div>
    <div className='bg-white shadow-md rounded-sm border'>
    <div className='flex justify-between px-4 items-center'>
    <h3 className="scroll-m-20 text-3xl pl-7 py-4 font-semibold tracking-tight text-start">Blog Categorys</h3>
    <Button onClick={() => { 
            setCurrentCategory(null); 
            formik.resetForm(); 
            setIsDialogOpen(true); 
          }}>Add New Brand</Button>
    <Dialog
    open={isDialogOpen}
    onClose={() => {
    formik.resetForm();
    setCurrentCategory(null);
    setIsDialogOpen(false);
  }}>
      <DialogTrigger asChild>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="category"
              placeholder="Enter a category"
              className="col-span-4"
              name="title"
              onChange={formik.handleChange("title")}
              onBlur={formik.handleBlur("title")}
              value={formik.values.title}
            />
             {formik.touched.title && formik.errors.title ? (
                  <div className='text-xs text-red-500'>{formik.errors.title}</div>
                ) : null}
          </div>
        </div>
        <DialogFooter >
          <Button className="w-full" type="submit">Save</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
    </div>
    <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Action</TableHead>
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
            ) : data.length > 0 ? (
              data.map((item, key) => (
                <TableRow key={key}>
                  <TableCell>{item.no}</TableCell>
                  <TableCell className="font-medium text-sm">{item.title}</TableCell>
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
    <Toaster
        position="top-center"
        reverseOrder={false}
      />
  </div>
  )
}

export default Blogcatlist