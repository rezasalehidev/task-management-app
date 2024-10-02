import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../redux/tasksSlice";
import { AppDispatch, RootState } from "../redux/store";
import { Button, ButtonGroup } from "@mui/material";

export const TaskFilter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filter = useSelector((state: RootState) => state.tasks.filter);

  return (
    <ButtonGroup variant="contained" sx={{ marginBottom: "30px" }}>
      <Button
        onClick={() => dispatch(setFilter("all"))}
        color={filter === "all" ? "primary" : "inherit"}
      >
        All
      </Button>
      <Button
        onClick={() => dispatch(setFilter("completed"))}
        color={filter === "completed" ? "primary" : "inherit"}
      >
        Completed
      </Button>
      <Button
        onClick={() => dispatch(setFilter("not_completed"))}
        color={filter === "not_completed" ? "primary" : "inherit"}
      >
        Not Completed
      </Button>
    </ButtonGroup>
  );
};
