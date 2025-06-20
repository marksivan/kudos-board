import React from "react";
import "./CardList.css";

export default function CardList({ cards }) {
  return (
    <div className="card-list">
      {cards.map((card) => (
        <div key={card.id} className="card">
          <div className="card-content">
            <p className="card-message">{card.message}</p>
            {card.gifUrl && (
              <div className="card-image">
                <img src={card.gifUrl} alt="kudos gif" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
