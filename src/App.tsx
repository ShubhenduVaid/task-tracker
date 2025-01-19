import React from "react";

import GlobalStyles from "./GlobalStyles";
import { Task } from "./components/Task";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <div className="app">
        <h1>Task Tracker</h1>
        <Task
          title="Test Task"
          description="This is a test description"
          priority="High"
        />
      </div>
    </>
  );
};

export default App;
