import { taskReducer } from "./TaskContext";
import { PriorityType } from "../components/Task";

beforeEach(() => {
  localStorage.clear();
});

describe("TaskContext", () => {
  describe("taskReducer", () => {
    it("should add a new task when ADD_TASK action is dispatched", () => {
      const initialState = { tasks: [], filter: "All", search: "" };
      const action = {
        type: "ADD_TASK",
        task: {
          id: "1",
          title: "New Task",
          description: "Test Task",
          priority: "High" as PriorityType,
        },
      };
      const newState = taskReducer(initialState, action as never);
      expect(newState.tasks).toHaveLength(1);
      expect(newState.tasks[0].title).toBe("New Task");
    });

    it("should edit an existing task when EDIT_TASK action is dispatched", () => {
      const initialState = {
        tasks: [
          {
            id: "1",
            title: "Old Task",
            description: "Old description",
            priority: "Low" as PriorityType,
          },
        ],
        filter: "All",
        search: "",
      };
      const action = {
        type: "EDIT_TASK",
        task: {
          id: "1",
          title: "Updated Task",
          description: "Updated description",
          priority: "High",
        },
      };
      const newState = taskReducer(initialState, action as never);
      expect(newState.tasks[0].title).toBe("Updated Task");
    });

    it("should delete a task when DELETE_TASK action is dispatched", () => {
      const initialState = {
        tasks: [
          {
            id: "1",
            title: "Task to Delete",
            description: "Description",
            priority: "Medium" as PriorityType,
          },
        ],
        filter: "All",
        search: "",
      };
      const action = {
        type: "DELETE_TASK",
        id: "1",
      };
      const newState = taskReducer(initialState, action as never);
      expect(newState.tasks).toHaveLength(0);
    });

    it("should set the filter when SET_FILTER action is dispatched", () => {
      const initialState = { tasks: [], filter: "All", search: "" };
      const action = {
        type: "SET_FILTER",
        filter: "Completed",
      };
      const newState = taskReducer(initialState, action as never);
      expect(newState.filter).toBe("Completed");
    });

    it("should set the search query when SET_SEARCH action is dispatched", () => {
      const initialState = { tasks: [], filter: "All", search: "" };
      const action = {
        type: "SET_SEARCH",
        search: "New search",
      };
      const newState = taskReducer(initialState, action as never);
      expect(newState.search).toBe("New search");
    });
  });
});
