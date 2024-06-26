"use client";

import { API } from "@/services/api";
import { useState } from "react";

const SearchBar = ( {onSearch} ) => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // request data object to the api
      const requestData = {
        searchText: searchPrompt,
      };

      const response = await API.post("/scrapper/", requestData);
      // response from the server
      //console.log(response.data);
      onSearch(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
      alert(error.message);
    }
  };

  return (
    <div>
      <form className="flex flex-wrap gap-4 mt-12" onSubmit={submit}>
        <input
          type="text"
          value={searchPrompt}
          onChange={(e) => setSearchPrompt(e.target.value)}
          placeholder="Enter product name"
          className="searchbar-input"
          disabled={isLoading}
        />
        <button type="submit" className="searchbar-btn">
          {isLoading ? "Loading..." : "Search"}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
