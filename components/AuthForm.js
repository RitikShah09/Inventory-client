"use client";
import { asyncSignInUser, asyncSignUpUser } from "@/store/actions/auth";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

const AuthForm = ({ type }) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    if (type === "signup") {
      await dispatch(asyncSignUpUser({ email, password }));
    } else {
      await dispatch(asyncSignInUser({ email, password }));
    }
  };

  const handleGuest = async () => {
    await dispatch(
      asyncSignInUser({ email: "ritiksbs@gmail.com", password: "Ritik" })
    );
  };

  return (
    <div className="h-full w-full flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold text-green-950 mb-10">
        {type === "signup" ? "Sign Up" : "Sign In"}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-4 w-1/5"
      >
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="px-3 py-2 border border-gray-300 rounded-lg"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid email address.",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col relative">
          <label htmlFor="password">Password</label>
          <div>
            <input
              id="password"
              className="px-3 w-full py-2 border border-gray-300 rounded-lg"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters long.",
                },
              })}
            />
            <button
              type="button"
              className="text-md text-gray-600 absolute top-1/2 right-3 "
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <i className="ri-eye-off-line"></i>
              ) : (
                <i className="ri-eye-line"></i>
              )}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="px-3 py-2 rounded-lg bg-green-950 text-white"
        >
          {type === "signup" ? "Sign Up" : "Sign In"}
        </button>

        <div
          className="px-3 py-2 text-center cursor-pointer rounded-lg bg-yellow-950 text-white"
          onClick={handleGuest}
        >
          Login With Guest Credentials
        </div>

        <p className="text-center">
          {type === "signup" ? (
            <>
              Already have an account?{" "}
              <Link href="/" className="font-bold">
                Sign In
              </Link>
            </>
          ) : (
            <>
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-bold">
                Sign Up
              </Link>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
