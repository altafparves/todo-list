import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addTodoAsync = createAsyncThunk("todos/addTodoAsync", async ({ title,token,is_completed }, { rejectWithValue,dispatch }) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title,is_completed }),
    });

    if (!response.ok) {
      const errorData = await response.json(); // Improved error handling
      throw new Error(errorData.message || "Failed to add task"); // Use server message or default
    }
    const filter = {};
    dispatch(getTasksAsync({ token, filter }));



    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getTasksAsync = createAsyncThunk("todos/getTasksAsync", async ({ token, filter = {}, search = "", category = "all" }, { rejectWithValue }) => {
  try {
    const params = new URLSearchParams();

    if (filter.priority) {
      params.append("priority", filter.priority);
    }

    if (filter.is_complete) {
      params.append("is_complete", filter.is_complete);
    }

    if (filter.start) {
      params.append("start", filter.start);
    }

    if (filter.end) {
      params.append("end", filter.end);
    }

    if (search) {
      params.append("search", search);
    }

    const queryString = params.toString();

    let endpoint = "todos"; // Default endpoint
    switch (category) {
      case "today":
        endpoint = "todos/today";
        break;
      case "high_priority":
        endpoint = "todos/high_priority";
        break;
      case "completed":
        endpoint = "todos/completed";
        break;
      default:
        endpoint = "todos";
    }

    const url = `${process.env.REACT_APP_API_URL}/${endpoint}${queryString ? `?${queryString}` : ""}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch tasks");
    }

    const data = await response.json();

    if (data && data.datas && Array.isArray(data.datas)) {
      return data.datas;
    } else {
      console.error("Invalid API response:", data);
      return rejectWithValue("Invalid API response format.  Check the console for details.");
    }
  } catch (error) {
    return rejectWithValue(error.message); // Reject with the error message
  }
});

export const deleteTodoAsync = createAsyncThunk("todos/deleteTodoAsync", async ({ todo_id, token }, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://todo-app-project-indol.vercel.app/todos/${todo_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json(); // Improved error handling
      throw new Error(errorData.message || "Failed to delete task"); // Use server message or default
    }

    return todo_id;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});


export const editTodoAsync = createAsyncThunk("todos/editTodoAsync", async ({ todo_id, updates }, { rejectWithValue, dispatch, getState }) => {
  try {
    const token = getState().auth.token; 
    const response = await fetch(`https://todo-app-project-indol.vercel.app/todos/${todo_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update task");
    }

    const data = await response.json();
    // refetch
    const filter = {};
    dispatch(getTasksAsync({ token, filter }));

    return data;
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
        state.todos = action.payload;
      })
      .addCase(getTasksAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTodoAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter((todo) => todo.todo_id !== action.payload);
      })
      .addCase(deleteTodoAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editTodoAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(editTodoAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTodo = action.payload; 
        state.todos = state.todos.map(
          (todo) => (todo.todo_id === updatedTodo.todo_id ? updatedTodo : todo) 
        );
      })
      .addCase(editTodoAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setTodos } = todoSlice.actions;
export default todoSlice.reducer;

