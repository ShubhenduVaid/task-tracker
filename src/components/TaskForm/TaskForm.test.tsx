import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

import TaskForm from "./TaskForm";
import { useTaskContext } from "../../contexts/TaskContext";
import { PriorityType } from "../Task/Task";

vi.mock("../../contexts/TaskContext", () => ({
  useTaskContext: vi.fn(),
}));

describe("TaskForm Component", () => {
  const mockDispatch = vi.fn();
  const mockHandleUpdate = vi.fn();

  beforeEach(() => {
    (useTaskContext as jest.Mock).mockReturnValue({
      dispatch: mockDispatch,
    });
    mockDispatch.mockClear();
    mockHandleUpdate.mockClear();
  });

  it("renders input fields and submit button correctly", () => {
    const { container } = render(<TaskForm handleUpdate={mockHandleUpdate} />);

    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
    expect(screen.getByText("Add Task")).toBeInTheDocument();
    const elements = container.querySelectorAll(".select-priority");
    expect(elements.length).toBeGreaterThan(0);
  });

  it("populates fields with existing task data when provided", () => {
    const existingTask = {
      id: "1",
      title: "Sample Task",
      description: "Sample Description",
      priority: "Medium" as PriorityType,
    };

    render(
      <TaskForm existingTask={existingTask} handleUpdate={mockHandleUpdate} />
    );

    expect(screen.getByPlaceholderText("Title")).toHaveValue("Sample Task");
    expect(screen.getByPlaceholderText("Description")).toHaveValue(
      "Sample Description"
    );
    expect(screen.getByText("Medium")).toBeInTheDocument();
    expect(screen.getByText("Update Task")).toBeInTheDocument();
  });

  it("dispatches ADD_TASK action when adding a new task", () => {
    render(<TaskForm handleUpdate={mockHandleUpdate} />);

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "New Task" },
    });
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "New Description" },
    });

    fireEvent.submit(screen.getByRole("form"));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "ADD_TASK",
      task: expect.objectContaining({
        title: "New Task",
        description: "New Description",
      }),
    });

    expect(screen.getByPlaceholderText("Title")).toHaveValue("");
    expect(screen.getByPlaceholderText("Description")).toHaveValue("");
    expect(screen.getByText("Low")).toBeInTheDocument();
  });

  it("dispatches EDIT_TASK action when updating an existing task", () => {
    const existingTask = {
      id: "1",
      title: "Sample Task",
      description: "Sample Description",
      priority: "Medium" as PriorityType,
    };

    render(
      <TaskForm existingTask={existingTask} handleUpdate={mockHandleUpdate} />
    );

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "Updated Task" },
    });

    fireEvent.submit(screen.getByRole("form"));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "EDIT_TASK",
      task: {
        id: "1",
        title: "Updated Task",
        description: "Sample Description",
        priority: "Medium",
      },
    });

    expect(mockHandleUpdate).toHaveBeenCalled();
  });

  it("resets fields after submitting a new task", () => {
    render(<TaskForm handleUpdate={mockHandleUpdate} />);

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "Another Task" },
    });
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Another Description" },
    });

    fireEvent.submit(screen.getByRole("form"));

    expect(screen.getByPlaceholderText("Title")).toHaveValue("");
    expect(screen.getByPlaceholderText("Description")).toHaveValue("");
    expect(screen.getByText("Low")).toBeInTheDocument();
  });

  it("renders default priority as Low when no existing task is provided", () => {
    render(<TaskForm handleUpdate={mockHandleUpdate} />);

    expect(screen.getByText("Low")).toBeInTheDocument();
  });
});
