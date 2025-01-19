import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import TaskList from "./TaskList";
import { TaskProps } from "../Task";

const mockTasks: TaskProps[] = [
  { id: 1, title: "Task 1", description: "Description 1", priority: "High" },
  { id: 2, title: "Task 2", description: "Description 2", priority: "Medium" },
  { id: 3, title: "Task 3", description: "Description 3", priority: "Low" },
];

describe("TaskList Component", () => {
  it("renders tasks based on filter", () => {
    render(<TaskList tasks={mockTasks} filter="Medium" />);
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Task 3")).not.toBeInTheDocument();
  });

  it("renders all tasks when no filter is applied", () => {
    render(<TaskList tasks={mockTasks} />);
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.getByText("Task 3")).toBeInTheDocument();
  });
});
