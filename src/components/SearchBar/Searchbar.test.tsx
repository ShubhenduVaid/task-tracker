import { render, screen, fireEvent, act } from "@testing-library/react";
import { vi } from "vitest";

import { useTaskContext } from "../../contexts/TaskContext";
import { useDebouncedCallback } from "use-debounce";
import SearchBar from "./SearchBar";

vi.mock("../../contexts/TaskContext", () => ({
  useTaskContext: vi.fn(),
}));

vi.mock("use-debounce", () => ({
  useDebouncedCallback: vi.fn(),
}));

describe("SearchBar", () => {
  const mockDispatch = vi.fn();
  const mockSetSearchQuery = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useTaskContext as jest.Mock).mockReturnValue({
      dispatch: mockDispatch,
    });

    (useDebouncedCallback as jest.Mock).mockImplementation((callback) => {
      return callback;
    });
  });

  test("renders the SearchBar with a placeholder", () => {
    render(<SearchBar searchQuery="" setSearchQuery={mockSetSearchQuery} />);

    const input = screen.getByPlaceholderText("Search tasks...");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  test("calls setSearchQuery and dispatches an action on input change", () => {
    render(<SearchBar searchQuery="" setSearchQuery={mockSetSearchQuery} />);

    const input = screen.getByPlaceholderText("Search tasks...");

    fireEvent.change(input, { target: { value: "New Task" } });

    expect(mockSetSearchQuery).toHaveBeenCalledWith("New Task");
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_SEARCH",
      search: "New Task",
    });
  });

  test("debounces the input correctly", async () => {
    const debouncedMock = vi.fn();
    (useDebouncedCallback as jest.Mock).mockImplementation((callback) => {
      return (...args: any[]) => {
        debouncedMock(...args);
        callback(...args);
      };
    });

    render(<SearchBar searchQuery="" setSearchQuery={mockSetSearchQuery} />);

    const input = screen.getByPlaceholderText("Search tasks...");
    fireEvent.change(input, { target: { value: "Debounced Task" } });

    await act(async () => {
      vi.useFakeTimers();
      vi.advanceTimersByTime(100);
    });

    expect(debouncedMock).toHaveBeenCalledWith("Debounced Task");
    expect(mockSetSearchQuery).toHaveBeenCalledWith("Debounced Task");
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_SEARCH",
      search: "Debounced Task",
    });
  });
});
