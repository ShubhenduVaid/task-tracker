# Simple Task Tracker

This app has been made using REACT + Typescript + Vite

- npm create vite@latest task-tracker -- --template react-ts
- Rationale for vite usage: https://github.com/facebook/react/issues/32016#issuecomment-2585731803

## Steps to run app locally

- Install Dependencies

  ```js
  npm i
  ```

- To run app locally

  ```js
  npm run dev
  ```

- To generate a build

  ```js
  npm run build
  ```

- To run generated build locally

  ```js
  npm run preview
  ```

- To run tests

  ```js
  npm run test
  ```

- To run tests and check code coverage

  ```js
  npm run testCoverage
  ```

## Functionality

- Display a list of tasks, each with a title, description, and priority (e.g., Low, Medium, High)
- Allow tasks to be added, edited, and deleted
- Dropdown to filter tasks by priority
- Context API to manage the global state for the list of tasks and the priority filter selection
- Saved the task list in the browser's localStorage to persist data between refreshes
- Load tasks from localStorage on application startup
- Unit tests for components and Context
- Used styled-components to ensure styles are specific to the component and avoid class name conflict
- Simple search function to search tasks by title or description
- The app is responsive.

## State Management Using Context API

- The taskReducer is a pure function used to manage the state of tasks in the application. It takes two inputs: the current state (TaskState) and an action (Action), and returns a new state based on the action type (ADD_TASK, EDIT_TASK, etc)
- State is synchronized with localStorage using useEffect, providing data persistence across page reloads.
- The TaskProvider wraps the app, encapsulating logic and state, while the useTaskContext hook simplifies access.
- The Context API avoids prop drilling by sharing state directly across components.

## Components

- SearchBar : Dispatches the SET_SEARCH action along with searchQuery.
- Task : Dumb skeketon task component.
- TaskForm :
  - The component for adding/editing tasks.
  - Dispatches the ADD_TASK/EDIT_TASK actions with task definition.
  - It is re-used in TaskPopup component using the existingTask prop and has conditional rendering logic based on existingTask.
- TaskPopup : Dumb component that encapsulates the TaskForm component to provide interface for Editing the Task.
- TaskList :

  - Handles the filtering and search logic based on the state from useTaskContext.
  - Search overrides filter.
  - Dispatches DELETE_TASK with id

## External components/hooks

- react-select : https://react-select.com/home
- use-debounce : https://www.npmjs.com/package/use-debounce
