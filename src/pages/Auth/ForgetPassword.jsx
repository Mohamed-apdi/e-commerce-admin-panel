
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
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { forgetPassword } from '@/features/auth/authSlice';

const ForgetPassword = () => {
  const dispatch = useDispatch();

  let schema = Yup.object({
    email: Yup.string().email("Please enter a valid email address.").required("Email is required.")
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },validationSchema: schema,
    onSubmit: values => {
      dispatch(forgetPassword(values))
      toast.success("forget password success please check your email.")
      formik.resetForm();
    },
  });
  console.log(formik.values)
  return (
    <>
       <Card className="mx-auto max-w-sm my-20">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Forget Password</CardTitle>
          <CardDescription>
          Please Enter your register email to get reset password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="text"
                placeholder="you@example.com"
                onChange={formik.handleChange("email")}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className='text-xs text-red-500'>{formik.errors.email}</div>
              ) : null}
            </div>
            <Button type="submit" className="w-full">
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  )
}

export default ForgetPassword