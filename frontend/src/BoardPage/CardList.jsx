import React from 'react';

export default function CardList({ cards }) {
  return (
    <ul>
      {cards.map(card => (
        <li key={card.id} style={{ marginBottom: '1rem' }}>
          <p>{card.message}</p>
          {card.gifUrl && <img src={card.gifUrl} alt="kudos gif" />}
        </li>
      ))}
    </ul>
  );
}
