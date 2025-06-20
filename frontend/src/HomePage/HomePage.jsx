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

  // refresh list after creating a new board
  const addBoard = (newBoard) => {
    setBoards((prev) => [newBoard, ...prev]);
  };

  // remove board from state after deletion
  const deleteBoard = (boardId) => {
    setBoards((prev) => prev.filter((board) => board.id !== boardId));
  };

  return (
    <div>
      <Header />
      <Search />
      <Categories />
      <CreateBoard onBoardCreated={addBoard} />
      <BoardList boards={boards} onDeleteBoard={deleteBoard} />
      <Footer />
    </div>
  );
}
