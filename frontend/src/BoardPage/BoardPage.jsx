import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardList from './CardList';
import CreateCard from './CreateCard';

export default function BoardPage() {
  const { id } = useParams();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/boards/${id}/cards`)
      .then(res => res.json())
      .then(data => setCards(data))
      .catch(console.error);
  }, [id]);

  const addCard = (newCard) => {
    setCards(prev => [newCard, ...prev]);
  };

  return (
    <div>
      <h2>Cards for Board #{id}</h2>
      <CreateCard boardId={id} onCardCreated={addCard} />
      <CardList cards={cards} />
    </div>
  );
}
