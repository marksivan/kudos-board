import React, { useState } from "react";
import "./Categories.css";

function Categories({ onCategoryFilter }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    onCategoryFilter(category);
  };

  return (
    <div className="categories-list">
      <button
        className={`category-button ${
          activeCategory === "All" ? "active" : ""
        }`}
        onClick={() => handleCategoryClick("All")}
      >
        All
      </button>
      <button
        className={`category-button ${
          activeCategory === "Recent" ? "active" : ""
        }`}
        onClick={() => handleCategoryClick("Recent")}
      >
        Recent
      </button>
      <button
        className={`category-button ${
          activeCategory === "Celebration" ? "active" : ""
        }`}
        onClick={() => handleCategoryClick("Celebration")}
      >
        Celebration
      </button>
      <button
        className={`category-button ${
          activeCategory === "Thank You" ? "active" : ""
        }`}
        onClick={() => handleCategoryClick("Thank You")}
      >
        Thank You
      </button>
      <button
        className={`category-button ${
          activeCategory === "Inspiration" ? "active" : ""
        }`}
        onClick={() => handleCategoryClick("Inspiration")}
      >
        Inspiration
      </button>
    </div>
  );
}

export default Categories;
