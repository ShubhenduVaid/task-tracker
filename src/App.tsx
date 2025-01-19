import React from "react";

import GlobalStyles from "./GlobalStyles";
import { TaskList } from "./components/TaskList";
import { TaskForm } from "./components/TaskForm";
import { TaskProvider } from "./contexts/TaskContext";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <TaskProvider>
        <div className="app">
          <h1>Task Tracker</h1>
          <TaskForm />
          <TaskList />
        </div>
      </TaskProvider>
    </>
  );
};

export default App;
