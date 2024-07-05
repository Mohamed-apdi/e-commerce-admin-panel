import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { createBrands, deleteBrands, getBrands, updateBrands } from '@/features/brand/brandSlice';
import { AlertCircle, Pencil, Trash2 } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from "react-hot-toast";

let schema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
});

const Brands = () => {
  const dispatch = useDispatch();
  const [currentBrand, setCurrentBrand] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {brands,isLoading} = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const handleBrandDelete = (id) => {
    dispatch(deleteBrands(id)).then(() => {
      toast.success("Brand deleted successfully");
        dispatch(getBrands());
    }).catch(() => {
      toast.error("Failed to delete brand");
    });
  }

  const handleBrandEdit = (brand) => {
    setCurrentBrand(brand);
    setIsDialogOpen(true);
    formik.setFieldValue("title", brand.title);
  }

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: values => {
      if (currentBrand) {
        dispatch(updateBrands({ id: currentBrand._id, brandData: values })).then(() => {
          toast.success("Brand updated successfully...");
          setCurrentBrand(null);
          formik.resetForm();
          dispatch(getBrands());
        }).catch(() => {
          toast.error("Failed to update brand...");
        });
      } else {
        dispatch(createBrands(values)).then(() => {
          toast.success("Brand created successfully...");
          formik.resetForm();
          dispatch(getBrands());
        }).catch(() => {
          toast.error("Failed to create brand...");
        });
      }
      setIsDialogOpen(false);
    },
  });

  const data = brands.map((brand, index) => ({
      no: index + 1,
      name: brand.title,
      action: (
        <div className='flex gap-2'>
          <Pencil 
            onClick={() => handleBrandEdit(brand)}
            className='w-6 h-6 text-green-500 text-center hover:bg-gray-200 rounded p-[4px]'
          />
          <Trash2
            onClick={() => handleBrandDelete(brand._id)}
            className='text-red-500 w-6 h-6 text-center hover:bg-gray-200 rounded p-[4px]'
          />
        </div>
      ),
  }))

  return (
    <div className="my-4">
      <div className='bg-white shadow-md rounded-sm border'>
        <div className='flex justify-between px-4 items-center'>
          <h3 className="scroll-m-20 text-2xl pl-7 py-4 font-semibold tracking-tight">Product Brands</h3>
          <Button onClick={() => { 
            setCurrentBrand(null); 
            formik.resetForm(); 
            setIsDialogOpen(true); 
          }}>Add New Brand</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: data.length }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-4 w-10" /></TableCell>
                  <TableCell><Skeleton className="h-4" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-4 w-24" /></TableCell>
                </TableRow>
              ))
            ) : data.length > 0 ? (
              data.map((item, key) => (
                <TableRow key={key}>
                  <TableCell>{item.no}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
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
      <Dialog
        open={isDialogOpen}
        onClose={() => {
          formik.resetForm();
          setCurrentBrand(null);
          setIsDialogOpen(false);
        }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentBrand ? 'Update' : 'Add'} Product Brand</DialogTitle>
          </DialogHeader>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 items-center gap-4">
                <Input
                  id="Color"
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
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  )
}
export default Brands;
