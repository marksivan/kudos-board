import React, { useState } from 'react';
import './CreateBoard.css';

export default function CreateBoard({ onBoardCreated }) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const res = await fetch('http://localhost:4000/boards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      const newBoard = await res.json();
      onBoardCreated(newBoard);
      setTitle('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='create-board'>
      <button onSubmit={handleSubmit}  type="submit">Create Board</button>
    </div>

  );
}
