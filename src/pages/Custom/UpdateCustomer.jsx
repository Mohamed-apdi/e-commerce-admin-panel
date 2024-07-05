import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserId, resetState } from '@/features/customers/customerSlice';
import { Skeleton } from "@/components/ui/skeleton";
import { updateUser } from '@/features/auth/authSlice';
import toast, { Toaster } from 'react-hot-toast';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const schema = Yup.object().shape({
  firstname: Yup.string().required('First name is required').max(15, 'Must be 15 characters or less'),
  lastname: Yup.string().required('Last name is required').max(15, 'Must be 15 characters or less'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  mobile: Yup.string().matches(/^[0-9]+$/, "Must be only digits").required('mobile is required'),
  role: Yup.string(),
  isBlocked: Yup.boolean(),
});



const UpdateCustomer = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserId(id));
    return () => {
      dispatch(resetState());
    };
  },[dispatch, id])

  const {customer, isLoading} = useSelector((state) => state.customer);
  
  useEffect(() => {
    if(customer){
      formik.setValues({
      firstname:customer.firstname || "",
      lastname:customer.lastname,
      email:customer.email || "",
      mobile:customer.mobile || "",
      role:customer.role || "user",
      isBlocked:customer.isBlocked,
      })
    }
  },[customer])

  const formik = useFormik({
    initialValues:{
      firstname:"",
      email:"",
      mobile:"",
      role:"user",
      isBlocked:false,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (values) {
        dispatch(updateUser({ id, data: values }))
          .then(() => {
            toast.success("Customer updated successfully.");
            navigate("/admin/customers");
          })
          .catch(() => {
            toast.error("Error updating customer.");
          });
      } else {
        toast.error("Please fill in the required fields.");
      }
    }
  })
  return (
    <>
    <div>
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Update User</CardTitle>
      </CardHeader>
      {isLoading ? (
        // add Skeleton 
         <CardContent>
         <div className="grid w-full items-center gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
       </CardContent>
      ):(
        <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="firstname">firstname</Label>
              <Input id="firstname" placeholder="Enter your firstname..."
              name="firstname"
              onChange={formik.handleChange("firstname")}
              onBlur={formik.handleBlur("firstname")}
              value={formik.values.firstname} 
              />
              {formik.touched.firstname && formik.errors.firstname ? (
                  <div className='text-xs text-red-500'>{formik.errors.firstname}</div>
                ) : null}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="lastname">Lastname</Label>
              <Input id="lastname" placeholder="Enter your lastname..."
              name="lastname"
              onChange={formik.handleChange("lastname")}
              onBlur={formik.handleBlur("lastname")}
              value={formik.values.lastname} 
              />
               {formik.touched.lastname && formik.errors.lastname ? (
                  <div className='text-xs text-red-500'>{formik.errors.lastname}</div>
                ) : null}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Enter your email..."
              name="email"
              onChange={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
              value={formik.values.email} 
              />
              {formik.touched.email && formik.errors.email ? (
                  <div className='text-xs text-red-500'>{formik.errors.email}</div>
                ) : null}
            </div>
            <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="mobile">Mobile</Label>
                    <PhoneInput
                      id="mobile"
                      placeholder="Enter your mobile..."
                      name="mobile"
                      country={'us'}
                      value={formik.values.mobile}
                      onChange={(value) => formik.setFieldValue('mobile', value)}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.mobile && formik.errors.mobile ? (
                      <div className="text-xs text-red-500">{formik.errors.mobile}</div>
                    ) : null}
                  </div>
              
            <div className="flex flex-col space-y-1.5">
                  <Label>User Role</Label>
                  <div className="flex gap-3">
                    <input type="radio" id="admin" name="role" value="admin"
                      onChange={formik.handleChange("role")}
                      onBlur={formik.handleBlur("role")}
                      checked={formik.values.role === "admin"} />
                    <label htmlFor="admin" className="text-sm font-medium leading-none ">Admin</label>
                    <input type="radio" id="user" name="role" value="user"
                      onChange={formik.handleChange("role")}
                      onBlur={formik.handleBlur("role")}
                      checked={formik.values.role === "user"} />
                    <label htmlFor="user" className="text-sm font-medium leading-none ">User</label>
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label className="mb-3">Blocked</Label>
                  <div className='flex gap-3 '>
                  <Input className="h-4 w-4 cursor-pointer" type="checkbox" id="isBlocked"
                    name="isBlocked"
                    onChange={formik.handleChange("isBlocked")}
                    onBlur={formik.handleBlur("isBlocked")}
                    checked={formik.values.isBlocked}
                  />
                  <label htmlFor="isBlocked" className="text-sm cursor-pointer font-medium leading-none ">Block</label>
                  </div>
                </div>

          </div>
          <div className='mt-4'>
          <Button type="submit" className="w-full">Edit User</Button>
          </div>
        </form>
      </CardContent>
      )}
     
    </Card>
    <Toaster position="top-center" reverseOrder={false} />
    </div>
    </>
  )
}

export default UpdateCustomer