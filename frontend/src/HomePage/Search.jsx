import React, { useState } from "react";
import "./Search.css";

function Search({ onSearch, onClear }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery("");
    onClear();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // If input is cleared, show all boards
    if (value === "") {
      onClear();
    }
  };

  return (
    <div className="search-section">
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search boards..."
        />
      </div>

      <div className="search-button">
        <button className="button" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="clear-button">
        <button className="button" onClick={handleClear}>
          Clear
        </button>
      </div>
    </div>
  );
}

export default Search;
