import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../features/auth/authSlice'
import { useEffect } from 'react'
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();

  let schema = Yup.object({
    email: Yup.string().email("Please enter a valid email address.").required("Email is required."),
    password: Yup.string().required("Password is required.")
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: values => {
      dispatch(login(values))
    },
  });

  const authState = useSelector((state) => state.auth);
  const {  isSuccess, message } = authState;
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin");
    } else if (message) {
      toast.error(message);
    }
  }, [isSuccess, message, navigate]);

  return (
    <>
      <Card className="mx-auto max-w-sm my-20">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Login to your account to continue.
            <div className='mt-4 text-center text-red-500'>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                autoComplete="off"
                type="text"
                placeholder="you@example.com"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className='text-xs text-red-500'>{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link to="/forget-password" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="password" 
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className='text-xs text-red-500'>{formik.errors.password}</div>
              ) : null}
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default Login;
