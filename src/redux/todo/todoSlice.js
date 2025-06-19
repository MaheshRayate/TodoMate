import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  current: { title: "", description: "" },
  items: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodo: (state, action) => {
      console.log(action);
      const { name, value } = action.payload;
      state.current[name] = value;
    },

    setItems: (state, action) => {
      state.items = [...state.items, ...action.payload];
    },

    addTodo: (state) => {
      const newTodo = {
        id: nanoid(),
        ...state.current,
      };
      state.items.push(newTodo);
    },

    deleteTodo: (state, action) => {
      console.log(action.payload);
      state.items = state.items.filter(
        (todo) => todo._id !== action.payload.id
      );
    },

    updateTodo: (state, action) => {
      const { id, title, description } = action.payload;
      const index = state.items.findIndex((item) => item._id === id);
      if (index !== -1) {
        state.items[index].title = title;
        state.items[index].description = description;
      }
    },

    resetTodo: (state) => {
      state.current = { title: "", description: "" };
    },
    resetItems: (state) => {
      state.items = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setTodo,
  setItems,
  resetItems,
  addTodo,
  resetTodo,
  deleteTodo,
  updateTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
