import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { resetPassword } from '@/features/auth/authSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error("Token not found in URL");
      navigate('/forget-password', { replace: true });  // Replace the current entry in the history stack
    }
  }, [token, navigate]);

  const validationSchema = Yup.object({
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      const resetData = {
        token: token,
        password: values.password,
      };
      dispatch(resetPassword(resetData))
        .unwrap()
        .then(() => {
          toast.success("Password has been reset successfully");
          navigate('/', { replace: true });
        })
        .catch(error => {
          toast.error(error.message);
        });
    },
  });

  return (
    <>
      <Card className="mx-auto max-w-sm my-20">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
          <CardDescription>
            Please enter your new password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">New Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="New password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className='text-xs text-red-500'>{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
              </div>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
                name="confirmPassword"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className='text-xs text-red-500'>{formik.errors.confirmPassword}</div>
              ) : null}
            </div>
            <Button type="submit" className="w-full">
              Reset Password
            </Button>
          </form>
        </CardContent>
      </Card>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  );
};

export default ResetPassword;
