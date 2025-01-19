import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

import TaskList from "./TaskList";
import { useTaskContext } from "../../contexts/TaskContext";

vi.mock("../Task", () => ({
  Task: vi.fn(({ title, description, priority, handleEdit, handleDelete }) => (
    <div data-testid="task">
      <h3>{title}</h3>
      <p>{description}</p>
      <div data-testid="taskFooter">
        <h2>{priority}</h2>
        <div data-testid="taskFooterButton">
          <button onClick={() => handleEdit("1", title, description, priority)}>
            Edit
          </button>
          <button onClick={() => handleDelete("1")}>Delete</button>
        </div>
      </div>
    </div>
  )),
}));

vi.mock("../TaskPopup", () => ({
  TaskPopup: vi.fn(({ handlePopupClose }) => (
    <div data-testid="popup">
      <button onClick={handlePopupClose}>Close Popup</button>
    </div>
  )),
}));

vi.mock("../../contexts/TaskContext", () => ({
  useTaskContext: vi.fn(),
}));

describe("TaskList Component", () => {
  const mockDispatch = vi.fn();

  const mockContextValue = {
    state: {
      tasks: [
        {
          id: "1",
          title: "Task 1",
          description: "Description 1",
          priority: "High",
        },
        {
          id: "2",
          title: "Task 2",
          description: "Description 2",
          priority: "Low",
        },
      ],
      filter: "All",
    },
    dispatch: mockDispatch,
  };

  beforeEach(() => {
    (useTaskContext as jest.Mock).mockReturnValue(mockContextValue);
    mockDispatch.mockClear();
  });

  it("renders tasks from the context state", () => {
    render(<TaskList />);

    const tasks = screen.getAllByTestId("task");
    expect(tasks.length).toBe(2);
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  it("handles the Edit button click and opens the popup with correct data", () => {
    render(<TaskList />);

    const editButtons = screen.getAllByText("Edit");
    fireEvent.click(editButtons[0]);

    expect(screen.getByTestId("popup")).toBeInTheDocument();
    expect(screen.getByText("Close Popup")).toBeInTheDocument();
  });

  it("handles the Delete button click and dispatches the correct action", () => {
    render(<TaskList />);

    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);

    expect(mockDispatch).toHaveBeenCalledWith({ type: "DELETE_TASK", id: "1" });
  });

  it("filters tasks based on the priority filter", () => {
    (useTaskContext as jest.Mock).mockReturnValue({
      ...mockContextValue,
      state: {
        ...mockContextValue.state,
        filter: "High",
      },
    });

    render(<TaskList />);

    const tasks = screen.getAllByTestId("task");
    expect(tasks.length).toBe(1);
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.queryByText("Task 2")).not.toBeInTheDocument();
  });

  it("closes the popup when handlePopupClose is triggered", () => {
    render(<TaskList />);

    const editButtons = screen.getAllByText("Edit");
    fireEvent.click(editButtons[0]);

    expect(screen.getByTestId("popup")).toBeInTheDocument();

    const closeButton = screen.getByText("Close Popup");
    fireEvent.click(closeButton);

    expect(screen.queryByTestId("popup")).not.toBeInTheDocument();
  });
});
