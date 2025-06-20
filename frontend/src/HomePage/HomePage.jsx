import React, { useEffect, useState } from 'react';
import BoardList from './BoardList';
import CreateBoard from './CreateBoard';

export default function HomePage() {
  const [boards, setBoards] = useState([]);

  // Fetch boards from backend
  useEffect(() => {
    fetch('http://localhost:4000/boards')
      .then(res => res.json())
      .then(data => setBoards(data))
      .catch(console.error);
  }, []);
  // refresh list after creating a new board
  const addBoard = (newBoard) => {
    setBoards(prev => [newBoard, ...prev]);
  };

  return (
    <div>
      <h1>Kudos Boards</h1>
      <CreateBoard onBoardCreated={addBoard} />
      <BoardList boards={boards} />
    </div>
  );
}
