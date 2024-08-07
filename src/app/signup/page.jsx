"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Undo2 } from "lucide-react";
import Link from "next/link";
import { Input } from "@/src/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";

const Signup = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSignup = async (data) => {
    // validate password and confirmpassword
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      // Use toast.promise for the entire API call
      await toast.promise(axios.post("/api/users/signup", data), {
        loading: "Signing up...",
        success: (response) => {
          if (response?.data?.status) {
            setIsDialogOpen(true);
            reset();
            return "Signup successful! Verification link sent.";
          }
          return "Signup successful.";
        },
        error: (error) => {
          if (error?.response?.status === 403) {
            return error?.response?.data?.error || "Email already exists.";
          }
          return "An error occurred. Please try again.";
        },
      });
    } catch (error) {
      // You should not need this block if `toast.promise` handles errors
      // But keeping it here in case you need more specific error handling
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  // const handleSignup = async (data) => {
  //   if (data.password !== data.confirmPassword) {
  //     toast.error("Password and confirm password should be same");
  //     return;
  //   }
  //   // API call to signup
  //   try {

  //     let response = await axios.post("/api/users/signup", data);
  //     toast.promise("Signup successful");
  //     toast.promise(myPromise, {
  //       loading: 'Loading...',
  //       success: () => {
  //         return "Verification link send successfully";
  //       },
  //       error: 'Error',
  //     });
  //     // console.log(response);
  //     // console.log(response.status);
  //     if (response?.data.status) {
  //       setIsDialogOpen(true);
  //     }
  //     reset();
  //   } catch (error) {
  //     if (error?.response?.status === 403) {
  //       toast.error(error?.response?.data?.error);
  //       return;
  //     }
  //     toast.error("Please try again");
  //   }
  // };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://img.freepik.com/free-photo/blockchain-technology-cartoon-illustration_23-2151572163.jpg?t=st=1722931678~exp=1722935278~hmac=1873d6df3ed748203c983a74e2ada255f694fbca21ef001544256477120f51c2&w=740"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <button
            onClick={() => router.back()}
            className="bg-black hover:scale-105 transition-all absolute top-7 left-10 z-50 text-white p-2 rounded-lg"
          >
            <Undo2 />
          </button>
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Register here 🦑
            </h1>

            <form
              onSubmit={handleSubmit(handleSignup)}
              className="mt-8 grid grid-cols-6 gap-6"
            >
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="FullName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name
                </label>

                <Input required type="text" {...register("userName")} />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="LastName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Mobile No.
                </label>

                <Input
                  required
                  type="number"
                  {...register("number", { maxLength: 10 })}
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium mb-2 text-gray-700"
                >
                  {" "}
                  Email{" "}
                </label>

                <Input required type="email" {...register("email")} />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium mb-2 text-gray-700"
                >
                  {" "}
                  Password{" "}
                </label>

                <Input required type="password" {...register("password")} />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="PasswordConfirmation"
                  className="block text-sm mb-2 font-medium text-gray-700"
                >
                  Confirm Password
                </label>

                <Input
                  required
                  type="password"
                  {...register("confirmPassword")}
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="MarketingAccept" className="flex gap-4">
                  <input
                    required
                    type="checkbox"
                    className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                  />

                  <span className="text-sm text-gray-700">
                    I want to receive emails about events, product updates and
                    company announcements.
                  </span>
                </label>
              </div>

              <div className="col-span-6">
                <p className="text-sm text-gray-500">
                  By creating an account, you agree to our
                  <a href="#" className="text-gray-700 underline">
                    {" "}
                    terms and conditions{" "}
                  </a>
                  and{" "}
                  <a href="#" className="text-gray-700 underline">
                    privacy policy
                  </a>
                  .
                </p>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                  Create an account
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already have an account?{" "}
                  <Link href="/login" className="text-gray-700 underline">
                    Log in
                  </Link>
                  .
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Please Verify</DialogTitle>
            <DialogDescription>
              You will get a verification link on registered mail id. Please
              verify for login.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Signup;
