import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "../redux/user/userSlice";
import login from "../assets/images/login.jpg";

const Login = () => {
  const {
    register,
    watch,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `https://todomate-backend.onrender.com/api/v1/users/login`,
        data,
        { withCredentials: true }
      );
      // console.log(res.data);
      // console.log(res.data.data.user);
      const User = res.data.data.user;
      // console.log("User:", User);
      dispatch(setUser(User));
      localStorage.setItem("user", JSON.stringify(User));
      toast.success("Logged in successfully");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("We encountered an issue while Logging in! Try Again!");
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... h-screen lg:px-15">
        <ToastContainer />
        <div className="flex relative top-20 bg-white  mx-auto justify-around w-9/10 rounded-2xl">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white lg:w-5/10 w-9/10 pt-10 pb-20 text-center rounded-2xl h-fit my-auto"
          >
            <h1 className="md:text-4xl text-3xl mb-8">Welcome Back</h1>

            <div className="my-3">
              <input
                {...register("email", {
                  required: {
                    value: true,
                    message: "This is a required field",
                  },
                })}
                type="email"
                placeholder="Email"
                className="border-1 w-8/10 border-gray-500 py-1 px-2"
              />
              {errors.email && (
                <p role="alert" className="text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="my-3">
              <input
                type="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "This is a required field",
                  },
                })}
                placeholder="Password"
                className="border-1 w-8/10 border-gray-500 py-1 px-2"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="my-3">
              <button
                disabled={isSubmitting}
                type="submit"
                className="border-1 w-8/10 border-gray-500 rounded py-1 bg-orange-500 hover:bg-orange-600 hover:text-white cursor-pointer"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
            <Link to="/register" className="text-gray-700">
              Don't have an account? <span className="font-medium">Signup</span>
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

export default Login;
