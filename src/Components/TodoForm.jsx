import React, { useState, useEffect } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { setTodo, addTodo, resetTodo } from "./../redux/todo/todoSlice";

import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const TodoForm = () => {
  const [isOpened, setIsOpened] = useState(false);

  const todo = useSelector((state) => state.todo.current);
  const user = useSelector((state) => state.user.user);
  const items = useSelector((state) => state.todo.items);
  const dispatch = useDispatch();

  const openDescription = () => {
    setIsOpened(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setTodo({ name, value }));
    // console.log(todo);
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error("You are Not Logged in. Please log in to add a Task!");
      return;
    }
    if (todo.title === "" || todo.description === "") {
      toast.error("Title and Description should not be empty");
      return;
    } else {
      // console.log("Todo:", todo);
      try {
        const res = await axios.post(
          `https://todomate-backend.onrender.com/api/v1/todos/`,
          todo,
          {
            withCredentials: true,
          }
        );
        // console.log(res.data);
        toast.success("Your task added successfully");
        dispatch(addTodo());
        dispatch(resetTodo());
        // console.log("Items:", items);
      } catch (err) {
        console.log(err);
        toast.error("Issue while adding Task");
      }
    }
  };

  return (
    <div className="">
      <div className="border-1 border-gray-500 w-8/10 lg:w-4/10 mx-auto relative shadow-lg/20">
        <input
          type="text"
          name="title"
          id=""
          placeholder="Title"
          className="block w-full my-2 py-2 px-2 outline-none"
          onClick={openDescription}
          onChange={handleChange}
          value={todo.title}
        />

        <textarea
          name="description"
          id=""
          placeholder="Description"
          className="block w-full my-2 py-2 px-2 outline-none"
          style={{ display: isOpened ? "block" : "none" }}
          onChange={handleChange}
          value={todo.description}
        ></textarea>

        <MdAddCircleOutline
          className="text-4xl text-orange-500 absolute right-0 bottom-0 cursor-pointer hover:text-orange-600"
          style={{ display: isOpened ? "block" : "none" }}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default TodoForm;
