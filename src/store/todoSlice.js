import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addTodoAsync = createAsyncThunk("todos/addTodoAsync", async ({ title, token }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) {
      throw new Error("Failed to add task");
    }

    const data = await response.json();
    return data; // Return the new task
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getTasksAsync = createAsyncThunk("todos/getTasksAsync", async (token, { rejectWithValue }) => {
  try {
    const response = await fetch("https://todo-app-project-indol.vercel.app/todos", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    const data = await response.json();
    return data.datas; // Extract the tasks array
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    loading: false,
    error: null,
  },
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodoAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload);
      })
      .addCase(addTodoAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTasksAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTasksAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload; // Update todos with fetched data
      })
      .addCase(getTasksAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setTodos } = todoSlice.actions;
export default todoSlice.reducer;
