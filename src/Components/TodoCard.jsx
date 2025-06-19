import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import UpdateTask from "./UpdateTask";
import { ToastContainer, toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import {
  setTodo,
  addTodo,
  resetTodo,
  deleteTodo,
} from "./../redux/todo/todoSlice";
import axios from "axios";

const TodoCard = ({ todo }) => {
  const dispatch = useDispatch();
  const [editClicked, setEditClicked] = useState(false);

  const handleDelete = async (todo) => {
    // console.log(todo._id);
    dispatch(deleteTodo({ id: todo._id }));

    try {
      await axios.delete(`https://todomate-backend.onrender.com/api/v1/todos/${todo._id}`, {
        withCredentials: true,
      });
      toast.success("Task deleted Successfully");
    } catch (err) {
      console.log(err);
      toast.error("Couldn't Delete the Task.");
    }
  };

  return (
    <div className="border-1 my-6 rounded w-full md:w-4/10 lg:w-3/10 relative pb-10 px-2">
      {!editClicked ? (
        <div>
          <h1 className="text-xl">{todo.title}</h1>
          <p>{todo.description}</p>

          <FaEdit
            className="text-2xl absolute right-7 text-orange-500 bottom-1 cursor-pointer hover:text-orange-600"
            onClick={() => setEditClicked(true)}
          />
          <MdDelete
            className="text-2xl absolute right-0 text-orange-500 bottom-1 cursor-pointer hover:text-orange-600"
            onClick={() => {
              handleDelete(todo);
            }}
          />
        </div>
      ) : (
        <UpdateTask todo={todo} onCancel={() => setEditClicked(false)} />
      )}
    </div>
  );
};

export default TodoCard;
