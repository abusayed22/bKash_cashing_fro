'use client'
import React, { useState } from "react"
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RegisterPost } from "../_actions/handler";
import { useRouter } from "next/navigation";
import { useToast } from "@/src/hooks/use-toast";
import { ToastProvider } from "@/src/components/ui/toast";
import { Toaster } from "@/src/components/ui/toaster";


const RegisterForm = (props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {toast} = useToast()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const result = await RegisterPost(data);
      console.log('response', result.status)
      if (result.status !== 201) {
        toast({
          variant: 'destructive',
          description: `Register Unsuccessfully!.Please try again!`,
        });
        console.log('Register Unsuccessfully. Please try again!');
        setLoading(false)
      } else {
        toast({
          variant: 'success',
          description: `Register Successfully. `,
        });
        // redirect('/dashboard');
        router.push('/dashboard')
        setLoading(false)
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        description: `Register Unsuccessfully. Please try again! ${error.message}`,
      });
      console.log('Login Unsuccessfully. Something wrong!', error.message);
      setLoading(false)
    }
  };

  return (
    <ToastProvider>
      <Toaster />
      <Card className="p-6 max-w-md w-full shadow-lg rounded-lg bg-white">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <Label htmlFor="fullName" className="block text-gray-700">
              Full Name
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              {...register("fullName", {
                required: "Full Name is required",
                minLength: { value: 3, message: "Must be at least 3 characters" },
              })}
              className="w-full mt-1"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
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

          {/* Password */}
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

          {/* Confirm Password */}
          <div>
            <Label htmlFor="confirmPassword" className="block text-gray-700">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              className="w-full mt-1"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Submit Button */}
          {loading ? (<Button
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md"
          >
            Loading...
          </Button>) : (<Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md"
          >
            Register
          </Button>)}
          {/* <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md"
          >
            Register
          </Button> */}
        </form>

        {/* Already have an account */}
        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/auth/login" className="hover:underline text-indigo-600">
            Login
          </a>
        </div>
      </Card>
    </ToastProvider>
  )
};

export default RegisterForm;
