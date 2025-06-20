import React, { useState, useEffect } from "react";
import Header from "./Header";
import Search from "./Search";
import Categories from "./Categories";
import CreateBoard from "./CreateBoard";
import BoardList from "./BoardList";
import Footer from "./Footer";
import { boardAPI } from "../services/api";

export default function HomePage() {
  const [boards, setBoards] = useState([]);
  const [filteredBoards, setFilteredBoards] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch boards from API on component mount
  useEffect(() => {
    fetchBoards();
  }, []);

  // Fetch boards from API
  const fetchBoards = async () => {
    try {
      setLoading(true);
      setError(null);
      const boardsData = await boardAPI.getAll();
      setBoards(boardsData);
      setFilteredBoards(boardsData);
    } catch (err) {
      setError("Failed to fetch boards. Please try again.");
      console.error("Error fetching boards:", err);
    } finally {
      setLoading(false);
    }
  };

  // Apply both search and category filters
  const applyFilters = (
    searchTerm = searchQuery,
    category = activeCategory
  ) => {
    let filtered = [...boards];

    // Apply category filter first
    if (category !== "All") {
      if (category === "Recent") {
        // Show the 6 most recently added boards (assuming higher IDs are more recent)
        filtered = filtered.sort((a, b) => b.id - a.id).slice(0, 6);
      } else {
        // Filter by category (case-insensitive matching)
        filtered = filtered.filter(
          (board) =>
            board.category &&
            board.category.toLowerCase() === category.toLowerCase()
        );
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

  // Create a new board via API
  const addBoard = async (boardData) => {
    try {
      const newBoard = await boardAPI.create(boardData);
      const updatedBoards = [newBoard, ...boards];
      setBoards(updatedBoards);

      // Reapply filters with updated boards using the applyFilters function
      applyFilters(searchQuery, activeCategory);
    } catch (err) {
      setError("Failed to create board. Please try again.");
      console.error("Error creating board:", err);
    }
  };

  // Delete a board via API
  const deleteBoard = async (boardId) => {
    try {
      await boardAPI.delete(boardId);
      const updatedBoards = boards.filter((board) => board.id !== boardId);
      setBoards(updatedBoards);
      setFilteredBoards((prev) => prev.filter((board) => board.id !== boardId));
    } catch (err) {
      setError("Failed to delete board. Please try again.");
      console.error("Error deleting board:", err);
    }
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

  if (loading) {
    return (
      <div>
        <Header />
        <div style={{ textAlign: "center", padding: "50px" }}>
          <p>Loading boards...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <div style={{ textAlign: "center", padding: "50px" }}>
          <p style={{ color: "red" }}>{error}</p>
          <button onClick={fetchBoards}>Try Again</button>
        </div>
      </div>
    );
  }

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
