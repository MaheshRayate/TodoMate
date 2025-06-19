import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { FaPowerOff } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../redux/user/userSlice";
import { resetItems } from "../redux/todo/todoSlice";
import axios from "axios";

const UserOptions = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    dispatch(clearUser());
    dispatch(resetItems());
    localStorage.removeItem("user");
    try {
      const res = await axios.post(
        `https://todomate-backend.onrender.com/api/v1/users/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      // console.log("✅", res);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    // ""
    <div className="absolute w-5/10 top-18 right-0 z-10 md:block md:transition-all md:ease-linear md:duration-600 border-1 border-gray-200 md:w-2/10 md:absolute bg-white md:right-0 md:top-21">
      <ul>
        <li>
          <Link
            to="/profile"
            className="mb-2 flex items-center px-4 py-2 gap-x-2"
          >
            <span>
              <FaUser />
            </span>
            Profile
          </Link>
        </li>
        <li>
          <div
            onClick={handleLogout}
            id="logout-btn"
            className="mb-2  flex items-center px-4 py-2 gap-x-2 cursor-pointer"
          >
            <span>
              <FaPowerOff />
            </span>
            Logout
          </div>
        </li>
      </ul>
    </div>
  );
};

export default UserOptions;
