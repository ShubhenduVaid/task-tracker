import { render, fireEvent, screen } from "@testing-library/react";
import { vi } from "vitest";

import { TaskForm } from "./";
import { PriorityType } from "../Task";

describe("TaskForm", () => {
  it("renders the form correctly", () => {
    render(<TaskForm onSubmit={vi.fn()} />);

    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
    expect(screen.getByText("Add Task")).toBeInTheDocument();
  });

  it("renders existing task data for editing", () => {
    const existingTask = {
      id: 1,
      title: "Existing Task",
      description: "Existing description",
      priority: "Medium" as PriorityType,
    };

    render(<TaskForm onSubmit={vi.fn()} existingTask={existingTask} />);

    expect(screen.getByPlaceholderText("Title")).toHaveValue("Existing Task");
    expect(screen.getByPlaceholderText("Description")).toHaveValue(
      "Existing description"
    );
    expect(screen.getByDisplayValue("Medium")).toBeInTheDocument();
  });

  it("submits the form data", () => {
    const handleSubmit = vi.fn();
    render(<TaskForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "New Task" },
    });
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Task description" },
    });

    fireEvent.click(screen.getByText("Add Task"));

    expect(handleSubmit).toHaveBeenCalledWith({
      title: "New Task",
      description: "Task description",
      priority: "Low",
    });
  });
});
