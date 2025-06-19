import React, { useState, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { updateTodo } from "../redux/todo/todoSlice";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateTask = ({ todo, onCancel }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const handleUpdate = async (todo) => {
    // console.log(todo);
    dispatch(updateTodo({ id: todo._id, title, description }));
    onCancel(); // hide edit form after update
    try {
      await axios.patch(
        `https://todomate-backend.onrender.com/api/v1/todos/${todo._id}`,
        {
          title: title,
          description: description,
        },
        { withCredentials: true }
      );
      toast.success("Task updated Successfully");
    } catch (err) {
      console.log(err);
      toast.error("Unable to update the Task");
    }
  };

  return (
    <div>
      <div className="mx-auto rounded">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block border border-gray-500 w-full mx-auto my-1 py-2 px-2"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block border border-gray-500 w-full mx-auto my-1 py-2 px-2"
        ></textarea>
        <div className="flex justify-center gap-4">
          <button
            className="bg-orange-500 text-white hover:bg-orange-600 px-4 py-1 rounded mb-2"
            onClick={() => {
              handleUpdate(todo);
            }}
          >
            Update
          </button>
          <button
            className="bg-orange-500 text-white hover:bg-orange-600 px-4 py-1 rounded mb-2"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;
