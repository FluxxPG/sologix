"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/router";
import { API } from "@/utils";

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();  // Importing the useRouter hook

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      console.log("data", data);
      API.post("/auth/login", {
        email: data.loginId,
        password: data.password,
      })
        .then((response) => {
          if (response.status === 200) {
            toast.success("Login successful!");
            reset({
              email: "",
              password: "",
            });
            router.push("/afterleadingpage");  // Redirect to the desired URL
          } else {
            toast.error(response?.data?.error);
            console.log(response);
          }
        })
        .catch((error) => {
          toast.error("Registration failed!");
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold mb-4 text-center">Login Page</h2>
      <p className="text-center mb-6">
        Welcome to SologixEnergy, Your Solar Partner! Please Sign in to Continue.
      </p>
      <div className="flex items-center justify-center bg-cover bg-center mb-5">
        <div className="max-w-md w-full mb-10 ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-[#0C2D86] bg-opacity-90 p-8 rounded-lg shadow-lg mb-[40px]"
          >
            <div className="mb-[40px]">
              <label
                htmlFor="login-id"
                className="block text-sm font-medium text-white"
              >
                Login ID
              </label>
              <input
                type="text"
                id="login-id"
                {...register("loginId", { required: true })}
                autoComplete="username"
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.loginId ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                placeholder="Enter your Email-ID/Mobile Number"
              />
              {errors.loginId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.loginId.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password")}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                placeholder="Enter Password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-center mt-4">
              <button
                type="submit"
                disabled={loading}
                className={`bg-[#0C2D86] text-white py-2 rounded-full hover:bg-blue-700 px-12 shadow-2xl ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
            <div className="text-center my-4">
              <p className="text-sm flex flex-col">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="text-[#07038D] hover:underline font-bold"
                >
                  Create Account
                </a>
              </p>
            </div>
            {/* <div className="text-center mt-1">
              <p className="text-base text-[#FF0000] font-extrabold">or</p>
            </div>
            <div className="flex items-center justify-center mb-8">
              <button className="mt-2 border-2 border-black py-2 px-8 rounded-md flex items-center justify-center gap-2">
                <Image src={googleicon} className="w-8" />
                Connect with Google
              </button>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};
