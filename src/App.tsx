import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Container } from "@mui/material";
import { AddTaskForm, TaskFilter, TaskList } from "./components";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Container>
        <h1>Task Manager</h1>
        <TaskFilter />
        <AddTaskForm />
        <TaskList />
      </Container>
    </Provider>
  );
};

export default App;
