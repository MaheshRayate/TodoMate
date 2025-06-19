import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "../redux/user/userSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import login from "../assets/images/login.jpg";
const Register = () => {
  const {
    register,
    watch,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const password = watch("password", ""); //watch the password input

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `https://todomate-backend.onrender.com/api/v1/users/signup`,
        data,
        { withCredentials: true }
      );
      // console.log(res.data);

      const User = res.data.data.user;
      // console.log("User:", User);
      dispatch(setUser(User));
      localStorage.setItem("user", JSON.stringify(User));
      toast.success("User Registered successfully");
      navigate("/");
      // console.log(user);
    } catch (err) {
      console.log(err);
      toast.error("We encountered an issue while Registering.Try Again!");
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... h-screen lg:px-15">
        <ToastContainer />
        <div className="flex relative top-20 bg-white  mx-auto justify-around w-9/10 rounded-2xl">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white lg:w-5/10 w-9/10 pt-10 pb-20 text-center rounded-2xl"
          >
            <h1 className="md:text-4xl text-3xl mb-8">Get Started With Us</h1>
            <div className="my-3">
              <input
                {...register("name", {
                  required: {
                    value: true,
                    message: "This is a required Field",
                  },
                })}
                placeholder="Full Name"
                className="border-1 w-8/10 border-gray-500 py-1 px-2"
              />
              {errors.name && (
                <p role="alert" className="text-red-500 text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="my-3">
              <input
                type="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "This is a required Field",
                  },
                })}
                placeholder="Email"
                className="border-1 w-8/10 border-gray-500 py-1 px-2"
              />
              {errors.email && (
                <p role="alert" className="text-red-500 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="my-3">
              <input
                type="password"
                {...register("password", {
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                  required: {
                    value: true,
                    message: "This is a required Field",
                  },
                })}
                placeholder="Password"
                className="border-1 w-8/10 border-gray-500 py-1 px-2"
              />
              {errors.password && (
                <p role="alert" className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="my-3">
              <input
                type="password"
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "This is a required Field",
                  },
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                placeholder="Confirm Password"
                className="border-1 w-8/10 border-gray-500 py-1 px-2"
              />
              {errors.confirmPassword && (
                <p role="alert" className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="my-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="border-1 w-8/10 border-gray-500 rounded py-1 bg-orange-500 hover:bg-orange-600 hover:text-white cursor-pointer"
              >
                {isSubmitting ? "Submitting..." : "Register"}
              </button>
              {/* <input /> */}
            </div>
            <Link to="/login" className="text-gray-700">
              Already have an account?{" "}
              <span className="font-medium">Login</span>
            </Link>
          </form>
          <div className="lg:block hidden">
            <img src={login} className="h-110" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
