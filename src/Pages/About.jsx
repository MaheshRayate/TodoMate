import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="relative  pt-30 pb-10 min-h-142 border-1 h-fit my-auto">
        <div className="w-8/10 mx-auto border-gray-200 border-1">
          <h1 className="text-center text-5xl font-bold py-2 text-orange-500">
            About Us
          </h1>
          <div>
            <p className="px-4 py-2 md:text-2xl text-xl">
              Welcome to TodoMate – your smart companion for staying organized
              and getting things done. At TodoMate, we believe that productivity
              should be simple, intuitive, and stress-free. That’s why we built
              a powerful yet user-friendly task management app that helps
              individuals and teams stay on top of their goals, deadlines, and
              daily responsibilities. Whether you're managing work projects,
              personal errands, or school assignments, TodoMate keeps everything
              in one place and makes your to-do list easy to tackle. We're
              passionate about helping people take control of their time—and
              we're here to support your journey, one task at a time.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
