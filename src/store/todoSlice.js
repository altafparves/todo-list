import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  loading: false,
  error: null,
  filters: {
    category: "all",
    priority: "all",
    status: "all",
  },
  sortBy: "date",
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setTodos: (state, action) => {
      state.todos = action.payload;
      state.loading = false;
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    updateTodo: (state, action) => {
      const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setLoading, setError, setTodos, addTodo, updateTodo, deleteTodo, setFilters, setSortBy } = todoSlice.actions;
export default todoSlice.reducer;
