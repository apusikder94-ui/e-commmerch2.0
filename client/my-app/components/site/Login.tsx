"use client";

import React, { useState } from "react";
import login from "@/public/login.png";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import Image from "next/image";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSignInMutation, useSignUpMutation } from "@/store/authApi";
import { toast } from "sonner";

interface IDialog {
  open: boolean;
  setOpen: (v: boolean) => void;
}

interface IUserForm {
  name?: string;
  email: string;
  password: string;
}

const Login = ({ open, setOpen }: IDialog) => {
  const [signUp] = useSignUpMutation();
  const [signIn] = useSignInMutation();
  const [status, setStatus] = useState("signup");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>();

  const onSubmit: SubmitHandler<IUserForm> = async (data) => {
    if (status === "signup") {
      await signUp(data);
      toast.success("User signUp successFully");
      setOpen(false);
    } else {
      await signIn(data);
      toast.success("User signIn successFully");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="min-w-3xl p-0 overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* LEFT IMAGE */}
          <div className="hidden md:flex items-center justify-center bg-gray-100">
            <Image
              src={login}
              alt="login"
              className="w-full h-full object-cover"
            />
          </div>

          {/* RIGHT FORM */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-violet-600 mb-6">
              {status === "signup" ? "Create Account" : "Welcome Back"}
            </h2>

            {status === "signup" ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Your Name</Label>
                  <Input
                    {...register("name", { required: "name is required" })}
                    placeholder="Enter your name"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label>Email</Label>
                  <Input
                    {...register("email", { required: "email is required" })}
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label>Password</Label>
                  <Input
                    {...register("password", {
                      required: "password is required",
                    })}
                    type="password"
                    placeholder="Enter password"
                  />
                </div>

                <Button className="w-full">Sign Up</Button>

                <p className="text-sm text-center">
                  Already have an account?{" "}
                  <span
                    onClick={() => setStatus("signin")}
                    className="text-violet-600 cursor-pointer font-medium"
                  >
                    Sign In
                  </span>
                </p>
              </form>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Email</Label>
                  <Input
                    {...register("email", { required: "email is required" })}
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Password</Label>
                  <Input
                    {...register("password", {
                      required: "password is required",
                    })}
                    type="password"
                    placeholder="Enter password"
                  />
                </div>

                <Button className="w-full">Sign In</Button>

                <p className="text-sm text-center">
                  Don't have an account?{" "}
                  <span
                    onClick={() => setStatus("signup")}
                    className="text-violet-600 cursor-pointer font-medium"
                  >
                    Sign Up
                  </span>
                </p>
              </form>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
