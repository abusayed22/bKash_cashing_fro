"use client";

import { useForm } from "react-hook-form";
import { LoginPost, storeDashboardInSessionStorage } from "../_actions/handler";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useToast } from "@/src/hooks/use-toast";
import { Toast, ToastAction, ToastProvider } from "@/src/components/ui/toast";
import { Toaster } from "@/src/components/ui/toaster";
import { MAIN_PATH } from "@/src/utility/enviroment";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";



const LoginForm = (props) => {
  const [loading, setLoading] = useState(false);
  // const isSubmitting = useRef(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const { toast } = useToast()

  const onSubmit = async (data) => {
    // Prevent submitting again if already submitting
    // if (isSubmitting.current) return;
    // isSubmitting.current = true;

    setLoading(true);

    try {
      const res = await LoginPost(data);
      const jsonData = res?.loginData;
      const response = res?.response;
      console.log(response)
      // handleTokenSet(loginData);

      if (response.status !== 200) {
        toast({
          variant: 'destructive',
          description: 'Login Unsuccessfully. Please try again!',
        });
      } else {
        toast({
          variant: 'success',
          description: 'Login Successfully.',
        });
        router.push('/dashboard') // Perform the redirect immediately
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        description: `Login Unsuccessfully. Please try again! ${error.message}`,
      });
      console.log('Login Unsuccessfully. Something wrong!', error);
    } finally {
      setLoading(false);
      // isSubmitting.current = false;  // Allow future submissions
    }
  };


  // handle cookie and data set
  // Function to handle token and session storage after redirect
  const handleTokenSet = (result) => {
    const token = result?.data;
    // const dashboard = result?.dashboard;

    // Set the token and store in sessionStorage asynchronously
    if (token) {
      // Set cookie with expiration of 1 hour
      const expirationDate = new Date();
      expirationDate.setSeconds(expirationDate.getSeconds() + 3600);  // Add 3600 seconds (1 hour)

      // Set cookie with a different SameSite attribute for testing
      document.cookie = `accessToken=${token}; expires=${expirationDate.toUTCString()}; path=/; secure; samesite=lax;`;

      // Store dashboard data in sessionStorage
      // storeDashboardInSessionStorage(dashboard)
    }
  };

  return (
    <ToastProvider >
      <Toaster />
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <Card className="p-6 max-w-sm w-full shadow-lg rounded-lg bg-white">
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Input */}
            <div>
              <Label htmlFor="email" className="block text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
                className="w-full mt-1"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <Label htmlFor="password" className="block text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  // minLength: {
                  //   value: 6,
                  //   message: "Password must be at least 6 characters long",
                  // },
                })}
                className="w-full mt-1"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            {
              loading ? (<Button
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md"
              >
                Loading...
              </Button>) : (
                <Button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md"
                >
                  Login
                </Button>
              )
            }
          </form>

          {/* Forgot Password & Signup Links */}
          <div className="mt-4 text-center text-sm text-gray-600">
            <a href="#" className="hover:underline">
              Forgot password?
            </a>{" "}
            |{" "}
            <a href="/auth/register" className="hover:underline text-indigo-600">
              Create an account
            </a>
          </div>
        </Card>
      </div>
    </ToastProvider>
  )
};

export default LoginForm;
