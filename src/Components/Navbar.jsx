import React, { useState, useRef, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosArrowDropup } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UserOptions from "./UserOptions";
import logo5 from "../assets/images/logo5.png";

const Navbar = () => {
  const user = useSelector((state) => state.user);

  const [hamClicked, setHamClicked] = useState(false);
  const [userClicked, setUserClicked] = useState(false);

  const userDropDownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userDropDownRef.current &&
        !userDropDownRef.current.contains(event.target)
      ) {
        setUserClicked(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  console.log(user.user);

  return (
    <div>
      <div className="border-black flex-col flex px-8 py-3 bg-black text-white md:flex-row md:items-center md:gap-0 md:justify-between lg:gap-0 lg:justify-between lg:pr-15 z-40 absolute w-full">
        <div className="flex gap-15 items-center md:gap-0">
          <div>
            <GiHamburgerMenu
              className={`md:hidden text-2xl transition-all ease-linear transition-500 ${
                hamClicked ? "hidden" : "block"
              }`}
              onClick={() => {
                setHamClicked(!hamClicked);
              }}
            />
            <IoIosArrowDropup
              className={`md:hidden text-2xl ${
                hamClicked ? "block" : "hidden"
              }`}
              onClick={() => {
                setHamClicked(!hamClicked);
              }}
            />
          </div>

          <Link to="/">
            <img src={logo5} alt="logo" className="h-10" />
          </Link>
        </div>

        <div
          className={`flex flex-col overflow-hidden md:items-center transition-all pb-2 duration-800 ease-linear gap-4 ${
            hamClicked ? "max-h-60" : "max-h-0"
          } md:flex md:flex-row md:space-x-6 md:max-h-none`}
        >
          <div>
            <ul className="flex flex-col md:flex-row md:items-center md:gap-5">
              <li className="border-b-1 md:border-none border-white py-1 z-10">
                <Link to="/todo" className="md:text-xl">
                  Todo
                </Link>
              </li>
              <li className="border-b-1 md:border-none border-white py-1">
                <Link to="/about" className="md:text-xl">
                  About
                </Link>
              </li>
              <li className="border-b-1 md:border-none border-white py-1">
                <Link to="/contact" className="md:text-xl z-10">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {!user.user ? (
            <div className="flex gap-2">
              <button className="border-1 px-4 rounded py-1">
                <Link to="/register">Signup</Link>
              </button>
              <button className="border-1 px-4 rounded py-1">
                <Link to="/login">Login</Link>
              </button>
            </div>
          ) : (
            <div className="absolute top-2 right-2  md:static flex flex-col items-center cursor-pointer">
              <FaCircleUser
                onClick={() => {
                  setUserClicked(true);
                }}
                className="text-3xl"
              />
              <p className="text-white">{user.user.name.split(" ")[0]}</p>
            </div>
          )}
        </div>
      </div>
      {userClicked ? (
        <div ref={userDropDownRef}>
          <UserOptions />
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
