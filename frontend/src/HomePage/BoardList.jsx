import React from "react";
import { useNavigate } from "react-router-dom";
import Board from "./Board";
import "./BoardList.css";

export default function BoardList({ boards, onDeleteBoard }) {
  const navigate = useNavigate();

  const handleViewBoard = (boardId) => {
    navigate(`/boards/${boardId}`);
  };

  const handleDeleteBoard = async (boardId) => {
    if (window.confirm("Are you sure you want to delete this board?")) {
      try {
        const response = await fetch(
          `http://localhost:4000/boards/${boardId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          // Call the parent component's delete handler to update the state
          if (onDeleteBoard) {
            onDeleteBoard(boardId);
          }
        } else {
          console.error("Failed to delete board");
        }
      } catch (error) {
        console.error("Error deleting board:", error);
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
