import { render, screen } from "@testing-library/react";

import Task, { PriorityType } from "./Task";

describe("Task Component", () => {
  const taskProps = {
    title: "Test Task",
    description: "This is a test description",
    priority: "High" as PriorityType,
  };

  it("renders the task title", () => {
    render(<Task {...taskProps} />);
    const titleElement = screen.getByText("Test Task");
    expect(titleElement).toBeInTheDocument();
  });

  it("renders the task description", () => {
    render(<Task {...taskProps} />);
    const descriptionElement = screen.getByText("This is a test description");
    expect(descriptionElement).toBeInTheDocument();
  });

  it("renders the task priority", () => {
    render(<Task {...taskProps} />);
    const priorityElement = screen.getByText("High");
    expect(priorityElement).toBeInTheDocument();
  });
});
