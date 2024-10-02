import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, TaskPayload, TasksState } from "../types";

const initialState: TasksState = {
  tasks: [],
  filter: "all", 
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskPayload>) => {
      const newTask: Task = {
        id: Date.now().toString(),
        title: action.payload.title,
        description: action.payload.description,
        completed: false,
      };
      state.tasks.push(newTask);
    },
    toggleComplete: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    reorderTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    setFilter: (state, action: PayloadAction<"all" | "completed" | "not_completed">) => {
      state.filter = action.payload; 
    },
  },
});

export const { addTask, toggleComplete, reorderTasks, setFilter } = tasksSlice.actions;
export default tasksSlice.reducer;
