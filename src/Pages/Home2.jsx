import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import TodoForm from "../Components/TodoForm";
import TodoCard from "../Components/TodoCard";
import { ToastContainer, toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import {
  setTodo,
  setItems,
  addTodo,
  resetTodo,
  deleteTodo,
  resetItems,
} from "./../redux/todo/todoSlice";

const Home2 = () => {
  // const todo = useSelector((state) => state.todo.current);
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const items = useSelector((state) => state.todo.items);

  useEffect(() => {
    if (!user) return;

    axios
      .get(`https://todomate-backend.onrender.com/api/v1/todos/`, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data.data.todos);
        const dbTodos = res.data.data.todos;
        // ✅ Clear old items before setting new ones to avoid duplication
        dispatch(resetItems());
        dispatch(setItems(dbTodos));
      });
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="py-30 min-h-142 ">
        <ToastContainer />
        <TodoForm />
        <div className="flex  columns-0 content-start md:gap-x-5 gap-y-2 lg:gap-x-14 px-4  lg:px-10 flex-wrap justify-center">
          {items.map((todo, index) => {
            return <TodoCard key={index} todo={todo} />;
          })}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home2;
