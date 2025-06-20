import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CardList from "./CardList";
import CreateCard from "./CreateCard";
import { boardAPI, cardAPI } from "../services/api";
import "./BoardPage.css";

export default function BoardPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBoardData();
  }, [id]);

  const fetchBoardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all boards to find the current one
      const boards = await boardAPI.getAll();
      const currentBoard = boards.find((b) => b.id === parseInt(id));

      if (!currentBoard) {
        setError("Board not found");
        return;
      }

      setBoard(currentBoard);

      // Fetch cards for this board
      const boardCards = await cardAPI.getByBoardId(parseInt(id));
      setCards(boardCards);
    } catch (err) {
      setError("Failed to load board data. Please try again.");
      console.error("Error fetching board data:", err);
    } finally {
      setLoading(false);
    }
  };

  const addCard = async (cardData) => {
    try {
      const newCard = await cardAPI.create(parseInt(id), cardData);
      setCards((prev) => [newCard, ...prev]);
    } catch (err) {
      setError("Failed to create card. Please try again.");
      console.error("Error creating card:", err);
    }
  };

  const deleteCard = async (cardId) => {
    try {
      await cardAPI.delete(parseInt(id), cardId);
      setCards((prev) => prev.filter((card) => card.id !== cardId));
    } catch (err) {
      setError("Failed to delete card. Please try again.");
      console.error("Error deleting card:", err);
    }
  };

  const upvoteCard = (cardId) => {
    // Note: Upvotes are not implemented in the backend yet
    // This is just for UI functionality
    setCards((prev) =>
      prev.map((card) =>
        card.id === cardId
          ? { ...card, upvotes: (card.upvotes || 0) + 1 }
          : card
      )
    );
  };

  if (loading) {
    return (
      <div className="board-page">
        <div style={{ textAlign: "center", padding: "50px" }}>
          <p>Loading board...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="board-page">
        <div style={{ textAlign: "center", padding: "50px" }}>
          <p style={{ color: "red" }}>{error}</p>
          <button onClick={fetchBoardData}>Try Again</button>
          <button onClick={() => navigate("/")} style={{ marginLeft: "10px" }}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!board) {
    return (
      <div className="board-page">
        <div style={{ textAlign: "center", padding: "50px" }}>
          <p>Board not found</p>
          <button onClick={() => navigate("/")}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="board-page">
      <div className="board-header">
        <h1>{board.title}</h1>
        <button onClick={() => navigate("/")} className="back-button">
          ← Back to Boards
        </button>
      </div>

      <CreateCard onCardCreated={addCard} />
      <CardList
        cards={cards}
        onDeleteCard={deleteCard}
        onUpvoteCard={upvoteCard}
      />
    </div>
  );
}
