import React, { useContext, useState } from "react";
import { AppContext } from "../context/FirestoreContext";
import { AppContextType } from "../types";

export const Search: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const { filterItems } = useContext(AppContext) as AppContextType;
  const handleOnChange = (event: any) => {
    setSearchText(event.target.value);
    filterItems(searchText);
  };

  const handleOnSubmit = (event: any) => {
    event.preventDefault();
    filterItems(searchText);
  };
  return (
    <form className="d-flex" onSubmit={handleOnSubmit}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange={handleOnChange}
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
  );
};
