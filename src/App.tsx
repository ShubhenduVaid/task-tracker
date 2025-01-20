import React, { useState } from "react";

import GlobalStyles from "./GlobalStyles";
import { TaskList } from "./components/TaskList";
import { TaskForm } from "./components/TaskForm";
import { TaskProvider } from "./contexts/TaskContext";
import { SearchBar } from "./components/SearchBar";

import { AppHeaderContainer, AppTitle } from "./App.style";

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <GlobalStyles />
      <TaskProvider>
        <div className="app">
          <AppHeaderContainer>
            <AppTitle>Task Tracker</AppTitle>
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </AppHeaderContainer>
          <TaskForm />
          <TaskList />
        </div>
      </TaskProvider>
    </>
  );
};

export default App;
