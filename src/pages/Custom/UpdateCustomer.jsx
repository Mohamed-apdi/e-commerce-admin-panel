import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from 'react-redux';
import { getUserId, resetState } from '@/features/customers/customerSlice';
import { Skeleton } from "@/components/ui/skeleton";
import { updateUser } from '@/features/auth/authSlice';
import toast, { Toaster } from 'react-hot-toast';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Switch } from "@/components/ui/switch";

const schema = Yup.object().shape({
  firstname: Yup.string().required('First name is required').max(15, 'Must be 15 characters or less'),
  lastname: Yup.string().required('Last name is required').max(15, 'Must be 15 characters or less'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  mobile: Yup.string().matches(/^[0-9]+$/, "Must be only digits").required('Mobile is required'),
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
  }, [dispatch, id]);

  const { customer, isLoading } = useSelector((state) => state.customer);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      role: "user",
      isBlocked: false,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(updateUser({ id, data: values }))
        .then(() => {
          toast.success("Customer updated successfully.");
          navigate("/admin/customers");
        })
        .catch(() => {
          toast.error("Error updating customer.");
        });
    }
  });

  useEffect(() => {
    if (customer) {
      formik.setValues({
        firstname: customer.firstname || "",
        lastname: customer.lastname || "",
        email: customer.email || "",
        mobile: customer.mobile || "",
        role: customer.role || "user",
        isBlocked: customer.isBlocked || false,
      });
    }
  }, [customer, formik.setValues]);

  return (
    <>
      <div>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Update User</CardTitle>
          </CardHeader>
          {isLoading ? (
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
          ) : (
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="firstname">First Name</Label>
                    <Input
                      id="firstname"
                      placeholder="Enter your first name..."
                      name="firstname"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstname}
                    />
                    {formik.touched.firstname && formik.errors.firstname ? (
                      <div className='text-xs text-red-500'>{formik.errors.firstname}</div>
                    ) : null}
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="lastname">Last Name</Label>
                    <Input
                      id="lastname"
                      placeholder="Enter your last name..."
                      name="lastname"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastname}
                    />
                    {formik.touched.lastname && formik.errors.lastname ? (
                      <div className='text-xs text-red-500'>{formik.errors.lastname}</div>
                    ) : null}
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      placeholder="Enter your email..."
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
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
                      <input
                        type="radio"
                        id="admin"
                        name="role"
                        value="admin"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.role === "admin"}
                      />
                      <label htmlFor="admin" className="text-sm font-medium leading-none">Admin</label>
                      <input
                        type="radio"
                        id="user"
                        name="role"
                        value="user"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.role === "user"}
                      />
                      <label htmlFor="user" className="text-sm font-medium leading-none">User</label>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isBlocked"
                      name="isBlocked"
                      onChange={(checked) => formik.setFieldValue("isBlocked", checked)}
                      onBlur={formik.handleBlur}
                      checked={formik.values.isBlocked}
                    />
                    <Label htmlFor="isBlocked">isBlocked</Label>
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
  );
}

export default UpdateCustomer;
