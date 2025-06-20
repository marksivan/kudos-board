import React, { useState } from "react";
import Header from "./Header";
import Search from "./Search";
import Categories from "./Categories";
import CreateBoard from "./CreateBoard";
import BoardList from "./BoardList";
import Footer from "./Footer";
import boardsData from "../data/data.js";

export default function HomePage() {
  const [boards, setBoards] = useState(boardsData);
  const [filteredBoards, setFilteredBoards] = useState(boardsData);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Apply both search and category filters
  const applyFilters = (
    searchTerm = searchQuery,
    category = activeCategory
  ) => {
    let filtered = [...boards];

    // Apply category filter first
    if (category !== "All") {
      if (category === "Recent") {
        // Show the 3 most recently added boards (assuming higher IDs are more recent)
        filtered = filtered.sort((a, b) => b.id - a.id).slice(0, 3);
      } else {
        // Filter by category (case-insensitive, handle spaces)
        filtered = filtered.filter((board) => {
          const boardCategory = board.category
            .toLowerCase()
            .replace(/\s+/g, "");
          const filterCategory = category.toLowerCase().replace(/\s+/g, "");
          return boardCategory === filterCategory;
        });
      }
    }

    // Apply search filter
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((board) =>
        board.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBoards(filtered);
  };

  // refresh list after creating a new board
  const addBoard = (newBoard) => {
    const updatedBoards = [newBoard, ...boards];
    setBoards(updatedBoards);

    // Reapply filters with updated boards
    let filtered = [...updatedBoards];

    // Apply category filter
    if (activeCategory !== "All") {
      if (activeCategory === "Recent") {
        filtered = filtered.sort((a, b) => b.id - a.id).slice(0, 3);
      } else {
        filtered = filtered.filter((board) => {
          const boardCategory = board.category
            .toLowerCase()
            .replace(/\s+/g, "");
          const filterCategory = activeCategory
            .toLowerCase()
            .replace(/\s+/g, "");
          return boardCategory === filterCategory;
        });
      }
    }

    // Apply search filter
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((board) =>
        board.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredBoards(filtered);
  };

  // remove board from state after deletion
  const deleteBoard = (boardId) => {
    const updatedBoards = boards.filter((board) => board.id !== boardId);
    setBoards(updatedBoards);
    setFilteredBoards((prev) => prev.filter((board) => board.id !== boardId));
  };

  // handle search functionality
  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
    applyFilters(searchTerm, activeCategory);
  };

  // handle clear search
  const handleClearSearch = () => {
    setSearchQuery("");
    applyFilters("", activeCategory);
  };

  // handle category filtering
  const handleCategoryFilter = (category) => {
    setActiveCategory(category);
    applyFilters(searchQuery, category);
  };

  return (
    <div>
      <Header />
      <Search onSearch={handleSearch} onClear={handleClearSearch} />
      <Categories onCategoryFilter={handleCategoryFilter} />
      <CreateBoard onBoardCreated={addBoard} />
      <BoardList boards={filteredBoards} onDeleteBoard={deleteBoard} />
      <Footer />
    </div>
  );
}
