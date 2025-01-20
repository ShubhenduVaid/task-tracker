import React, { createContext, useContext, useReducer } from "react";

import { PriorityType } from "../components/Task";

type Task = {
  id: string;
  title: string;
  description: string;
  priority: PriorityType;
};

type TaskState = {
  tasks: Task[];
  filter: string;
};

type Action =
  | { type: "ADD_TASK"; task: Task }
  | { type: "EDIT_TASK"; task: Task }
  | { type: "DELETE_TASK"; id: string }
  | { type: "SET_FILTER"; filter: string };

const initialState: TaskState = {
  tasks: [],
  filter: "All",
};

const TaskContext = createContext<{
  state: TaskState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

const taskReducer = (state: TaskState, action: Action): TaskState => {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.task] };
    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.task.id ? action.task : task
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.id),
      };
    case "SET_FILTER":
      return { ...state, filter: action.filter };
    default:
      return state;
  }
};

export const TaskProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    taskReducer,
    initialState,
    (init) => init
  );

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("useTaskContext must be used within a TaskProvider");
  return context;
};
