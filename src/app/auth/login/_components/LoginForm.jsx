"use client";

import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginForm = (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const onSubmit = (data) => {
        console.log("Login Data:", data);
        alert("Login Successful!");
      };
  return (
    <div>
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
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className="w-full mt-1"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md"
          >
            Login
          </Button>
        </form>

        {/* Forgot Password & Signup Links */}
        <div className="mt-4 text-center text-sm text-gray-600">
          <a href="#" className="hover:underline">
            Forgot password?
          </a>{" "}
          |{" "}
          <a href="#" className="hover:underline text-indigo-600">
            Create an account
          </a>
        </div>
      </Card>
    </div>
    </div>
  )
};

export default LoginForm;
