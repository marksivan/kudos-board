import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardList from "./CardList";
import CreateCard from "./CreateCard";
import { boards, cards as cardsData } from "../data/data.js";
import "./BoardPage.css";

export default function BoardPage() {
  const { id } = useParams();
  const [cards, setCards] = useState([]);
  const [board, setBoard] = useState(null);

  useEffect(() => {
    // Find the current board
    const currentBoard = boards.find((b) => b.id === parseInt(id));
    setBoard(currentBoard);

    // Filter cards for this board
    const boardCards = cardsData.filter(
      (card) => card.boardId === parseInt(id)
    );
    setCards(boardCards);
  }, [id]);

  const addCard = (newCard) => {
    setCards((prev) => [newCard, ...prev]);
  };

  const deleteCard = (cardId) => {
    setCards((prev) => prev.filter((card) => card.id !== cardId));
  };

  const upvoteCard = (cardId) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === cardId ? { ...card, upvotes: card.upvotes + 1 } : card
      )
    );
  };

  if (!board) {
    return <div>Board not found</div>;
  }

  return (
    <div className="board-page">
      <div className="board-header">
        <h1>{board.title}</h1>
        <p className="board-category">Category: {board.category}</p>
      </div>

      <CreateCard boardId={parseInt(id)} onCardCreated={addCard} />
      <CardList
        cards={cards}
        onDeleteCard={deleteCard}
        onUpvoteCard={upvoteCard}
      />
    </div>
  );
}
