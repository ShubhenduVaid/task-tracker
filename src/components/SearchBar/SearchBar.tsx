import React from "react";
import { useDebouncedCallback } from "use-debounce";

import { SearchBarInput } from "./SearchBar.style";
import { useTaskContext } from "../../contexts/TaskContext";

type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const { dispatch } = useTaskContext();
  const debounced = useDebouncedCallback((value) => {
    setSearchQuery(value);
    dispatch({ type: "SET_SEARCH", search: value });
  }, 100);

  return (
    <SearchBarInput
      type="text"
      placeholder="Search tasks..."
      value={searchQuery}
      onChange={(e) => debounced(e.target.value)}
    />
  );
};

export default SearchBar;
