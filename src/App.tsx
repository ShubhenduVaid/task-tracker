import React from "react";

import GlobalStyles from "./GlobalStyles";
import { TaskList } from "./components/TaskList";
import { TaskProps } from "./components/Task";

const mockTasks: TaskProps[] = [
  { id: 1, title: "Task 1", description: "Description 1", priority: "High" },
  { id: 2, title: "Task 2", description: "Description 2", priority: "Medium" },
  { id: 3, title: "Task 3", description: "Description 3", priority: "Low" },
];

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <div className="app">
        <h1>Task Tracker</h1>
        <TaskList tasks={mockTasks} />
      </div>
    </>
  );
};

export default App;
