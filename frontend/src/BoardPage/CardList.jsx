import React from "react";
import "./CardList.css";

export default function CardList({ cards, onDeleteCard, onUpvoteCard }) {
  const handleDelete = (cardId) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      onDeleteCard(cardId);
    }
  };

  return (
    <div className="card-list">
      {cards.map((card) => (
        <div key={card.id} className="card">
          <div className="card-content">
            <div className="card-header">
              <span className="card-author">By: {card.author}</span>
              <button
                className="delete-card-btn"
                onClick={() => handleDelete(card.id)}
                title="Delete card"
              >
                ×
              </button>
            </div>

            <p className="card-message">{card.message}</p>

            {card.gifUrl && (
              <div className="card-image">
                <img src={card.gifUrl} alt="kudos gif" />
              </div>
            )}

            <div className="card-footer">
              <div className="upvote-section">
                <button
                  className="upvote-btn"
                  onClick={() => onUpvoteCard(card.id)}
                  title="Upvote this card"
                >
                  👍
                </button>
                <span className="upvote-count">{card.upvotes} upvotes</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
