import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

import TaskPopup from "./TaskPopup";
import { TaskForm } from "../TaskForm";

vi.mock("../TaskForm", () => ({
  TaskForm: vi.fn(() => <div>TaskForm Mocked</div>),
}));

describe("TaskPopup Component", () => {
  const mockHandlePopupClose = vi.fn();

  beforeEach(() => {
    mockHandlePopupClose.mockClear();
  });

  it("renders TaskPopup with correct content", () => {
    render(
      <TaskPopup
        id="1"
        title="Sample Task"
        description="Sample Description"
        priority="Medium"
        handlePopupClose={mockHandlePopupClose}
      />
    );

    expect(screen.getByText("TaskForm Mocked")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
  });

  it("calls handlePopupClose when Close button is clicked", () => {
    render(
      <TaskPopup
        id="1"
        title="Sample Task"
        description="Sample Description"
        priority="Medium"
        handlePopupClose={mockHandlePopupClose}
      />
    );

    fireEvent.click(screen.getByText("Close"));

    expect(mockHandlePopupClose).toHaveBeenCalledTimes(1);
  });

  it("passes correct props to TaskForm", () => {
    const existingTask = {
      id: "1",
      title: "Sample Task",
      description: "Sample Description",
      priority: "Medium",
    };

    render(
      <TaskPopup
        id="1"
        title="Sample Task"
        description="Sample Description"
        priority="Medium"
        handlePopupClose={mockHandlePopupClose}
      />
    );

    expect(TaskForm).toHaveBeenCalledWith(
      {
        existingTask,
        handleUpdate: mockHandlePopupClose,
      },
      {}
    );
  });
});
