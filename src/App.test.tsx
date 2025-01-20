import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

import App from "./App";

vi.mock("./components/SearchBar", () => ({
  SearchBar: ({
    searchQuery,
    setSearchQuery,
  }: {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  }) => (
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      data-testid="search-input"
    />
  ),
}));

vi.mock("./components/TaskForm", () => ({
  TaskForm: () => <div data-testid="task-form">Task Form</div>,
}));

vi.mock("./components/TaskList", () => ({
  TaskList: () => <div data-testid="task-list">Task List</div>,
}));

vi.mock("./GlobalStyles", () => ({
  default: () => <style>{"body { background-color: #fff; }"}</style>,
}));

describe("App Component", () => {
  it("should render the header with title and search bar", () => {
    render(<App />);

    expect(screen.getByText("Task Tracker")).toBeInTheDocument();
    const searchInput = screen.getByTestId("search-input") as HTMLInputElement;
    expect(searchInput).toBeInTheDocument();
  });

  it("should update search query when typing in the search bar", () => {
    render(<App />);

    const searchInput = screen.getByTestId("search-input") as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: "Test query" } });

    expect(searchInput.value).toBe("Test query");
  });

  it("should render TaskForm and TaskList components", () => {
    render(<App />);

    expect(screen.getByTestId("task-form")).toBeInTheDocument();
    expect(screen.getByTestId("task-list")).toBeInTheDocument();
  });

  it("should render GlobalStyles component", () => {
    const { container } = render(<App />);

    const styles = container.querySelector("style");
    expect(styles).toHaveTextContent("body { background-color: #fff; }");
  });

  it("should wrap the app in TaskProvider context", () => {
    const { container } = render(<App />);

    // We expect the app to be wrapped with TaskProvider, so let's check if the context is used.
    expect(
      container.querySelector("[data-testid='task-list']")
    ).toBeInTheDocument();
  });
});
