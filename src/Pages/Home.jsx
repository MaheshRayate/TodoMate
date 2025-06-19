import React, { useState, useRef, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Typed from "typed.js";
import TodoForm from "../Components/TodoForm";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const [count, setCount] = useState(0);

  const el = useRef(null);
  const typed = useRef(null);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const options = {
      strings: [
        "Turn chaos into checklists.",
        "From ‘to-do’ to ‘done’ – effortlessly.",
        "Tame your tasks, master your time.",
        "Tasks, tracked. Life, sorted.",
      ],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
    };

    // elRef refers to the <span> rendered below
    typed.current = new Typed(el.current, options);

    return () => {
      // Make sure to destroy Typed instance during cleanup
      // to prevent memory leaks
      typed.current.destroy();
      setCount(count + 1);
    };
  }, [count]);

  return (
    <>
      <div className="">
        <Navbar />

        <div className="px-10  mx-auto text-center -z-10 bg-red-100 py-10 min-h-120">
          {/*  */}
          <h1 className=" text-4xl md:w-8/10 md:text-5xl lg:py-30 pt-25 pb-10 md:py-20  mx-auto lg:text-6xl ">
            <span
              style={{ whiteSpace: "normal", wordWrap: "break-word" }}
              ref={el}
              className=""
            ></span>
          </h1>

          <p className="md:w-8/10 text-center mx-auto lg:text-xl">
            Stay organized and boost your productivity with our simple, powerful
            Todo app. Create, manage, and track your tasks effortlessly—anytime,
            anywhere.
          </p>
          <p className="md:w-8/10 text-center mx-auto lg:text-xl">
            Your personal task manager—smart, simple, and always ready. Plan
            your day, check off tasks, and get things done with ease.
          </p>

          {!user.user ? (
            <Link to="/register">
              <button className="border-1 cursor-pointer my-4 px-3 py-1 rounded bg-orange-500 text-white lg:my-5 hover:bg-orange-600">
                Get Started with Us
              </button>
            </Link>
          ) : (
            <Link to="/todo">
              <button className="border-1 cursor-pointer my-4 px-3 py-1 rounded bg-orange-500 text-white lg:my-5 hover:bg-orange-600">
                Add New Task
              </button>
            </Link>
          )}
        </div>
        <div></div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
