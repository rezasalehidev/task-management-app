import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { toggleComplete, reorderTasks } from "../redux/tasksSlice";
import { List, ListItem, ListItemText, Checkbox } from "@mui/material";

export const TaskList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const filter = useSelector((state: RootState) => state.tasks.filter);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "not_completed") return !task.completed;
    return true;
  });

  
  // drag and drop functionality
  const handleDragStart = (taskId: string) => {
    setDraggedTaskId(taskId);
  };

  const handleDrop = (taskId: string) => {
    if (draggedTaskId && draggedTaskId !== taskId) {
      const draggedIndex = tasks.findIndex((task) => task.id === draggedTaskId);
      const targetIndex = tasks.findIndex((task) => task.id === taskId);
      const updatedTasks = [...tasks];

      const [removedTask] = updatedTasks.splice(draggedIndex, 1);
      updatedTasks.splice(targetIndex, 0, removedTask);

      dispatch(reorderTasks(updatedTasks));
    }
    setDraggedTaskId(null);
  };

  const handleDragOver = (event: React.DragEvent<HTMLLIElement>) => {
    event.preventDefault();
  };

  return (
    <List>
      {filteredTasks.map((task) => (
        <ListItem
          key={task.id}
          style={{ textDecoration: task.completed ? "line-through" : "none" }}
          draggable
          onDragStart={() => handleDragStart(task.id)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(task.id)}
        >
          <Checkbox
            checked={task.completed}
            onChange={() => dispatch(toggleComplete(task.id))}
          />
          <ListItemText primary={task.title} secondary={task.description} />
        </ListItem>
      ))}
    </List>
  );
};
