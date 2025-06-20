import React from "react";
import { useNavigate } from "react-router-dom";
import Board from "./Board";
import "./BoardList.css";

export default function BoardList({ boards, onDeleteBoard }) {
  const navigate = useNavigate();

  const handleViewBoard = (boardId) => {
    navigate(`/boards/${boardId}`);
  };

  const handleDeleteBoard = (boardId) => {
    if (window.confirm("Are you sure you want to delete this board?")) {
      // Call the parent component's delete handler to update the state
      if (onDeleteBoard) {
        onDeleteBoard(boardId);
      }
    }
  };

  return (
    <div className="board-list">
      {boards.map((board) => (
        <Board
          key={board.id}
          board={board}
          onViewBoard={() => handleViewBoard(board.id)}
          onDeleteBoard={() => handleDeleteBoard(board.id)}
        />
      ))}
    </div>
  );
}
