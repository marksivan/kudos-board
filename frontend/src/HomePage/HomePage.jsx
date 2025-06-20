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
  const [isSearchActive, setIsSearchActive] = useState(false);

  // refresh list after creating a new board
  const addBoard = (newBoard) => {
    setBoards((prev) => [newBoard, ...prev]);
    // If search is not active, also update filtered boards
    if (!isSearchActive) {
      setFilteredBoards((prev) => [newBoard, ...prev]);
    }
  };

  // remove board from state after deletion
  const deleteBoard = (boardId) => {
    setBoards((prev) => prev.filter((board) => board.id !== boardId));
    setFilteredBoards((prev) => prev.filter((board) => board.id !== boardId));
  };

  // handle search functionality
  const handleSearch = (searchQuery) => {
    if (searchQuery.trim() === "") {
      setFilteredBoards(boards);
      setIsSearchActive(false);
    } else {
      const filtered = boards.filter((board) =>
        board.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBoards(filtered);
      setIsSearchActive(true);
    }
  };

  // handle clear search
  const handleClearSearch = () => {
    setFilteredBoards(boards);
    setIsSearchActive(false);
  };

  return (
    <div>
      <Header />
      <Search onSearch={handleSearch} onClear={handleClearSearch} />
      <Categories />
      <CreateBoard onBoardCreated={addBoard} />
      <BoardList boards={filteredBoards} onDeleteBoard={deleteBoard} />
      <Footer />
    </div>
  );
}
