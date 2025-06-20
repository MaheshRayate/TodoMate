import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import contact from "../assets/images/contact_page.jpg";

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="relative min-h-200 md:min-h-auto pt-20 md:pt-30 pb-10 flex lg:px-20 md:px-4">
        <div className="w-full md:4/10 lg:w-5/10">
          <h1 className="text-center md:text-start lg:text-5xl text-4xl font-bold text-orange-500 py-10">
            Reach out to us
          </h1>
          <div className=" border-gray-300  py-5 flex flex-col gap-y-2">
            <div className=" flex items-center py-2 px-2 gap-x-1 lg:gap-x-10 text-center md:text-start">
              <FaPhoneAlt className="text-3xl" />
              <span className="lg:text-2xl  text-xl">(+91) 9307438889</span>
            </div>

            <div className=" flex items-center py-2 px-2 gap-x-1 lg:gap-x-10 text-center md:text-start">
              <MdOutlineMailOutline className="text-3xl" />
              <span className="lg:text-2xl text-xl">
                maheshrayate16106227@gmail.com
              </span>
            </div>

            <div className="flex items-center py-2 px-2 gap-x-1 lg:gap-x-10 text-center md:text-start">
              <FaInstagram className="text-3xl" />
              <span className="lg:text-2xl text-xl">Instagram</span>
            </div>

            <div className="flex items-center py-2 px-2 gap-x-1 lg:gap-x-10 text-center md:text-start">
              <FaFacebookF className="text-3xl" />
              <span className="lg:text-2xl text-xl">Facebook</span>
            </div>
          </div>
        </div>
        <div className="hidden md:block border-1 border-gray-300 ">
          <img src={contact} className="lg:h-120 md:h-100" alt="" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
