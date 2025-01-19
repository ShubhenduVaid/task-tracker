import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import Task, { PriorityType } from "./Task";

describe("Task Component", () => {
  const mockHandleEdit = vi.fn();
  const mockHandleDelete = vi.fn();
  const defaultProps = {
    id: "1",
    title: "Test Task",
    description: "This is a test description",
    priority: "High" as PriorityType,
    handleEdit: mockHandleEdit,
    handleDelete: mockHandleDelete,
  };

  it("renders the component with the correct data", () => {
    render(<Task {...defaultProps} />);

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("This is a test description")).toBeInTheDocument();
    expect(screen.getByText("High")).toBeInTheDocument();
  });

  it("calls handleEdit when the Edit button is clicked", () => {
    render(<Task {...defaultProps} />);

    // Click the Edit button
    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    // Assert the mock function is called with correct arguments
    expect(mockHandleEdit).toHaveBeenCalledWith(
      "1",
      "Test Task",
      "This is a test description",
      "High"
    );
  });

  it("calls handleDelete when the Delete button is clicked", () => {
    render(<Task {...defaultProps} />);

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    expect(mockHandleDelete).toHaveBeenCalledWith("1");
  });

  it("displays the correct priority class based on the priority level", () => {
    const { rerender } = render(<Task {...defaultProps} priority="Low" />);
    expect(screen.getByText("Low")).toBeInTheDocument();

    rerender(<Task {...defaultProps} priority="Medium" />);
    expect(screen.getByText("Medium")).toBeInTheDocument();

    rerender(<Task {...defaultProps} priority="High" />);
    expect(screen.getByText("High")).toBeInTheDocument();
  });
});
