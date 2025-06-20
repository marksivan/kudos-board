import React from 'react';
import { Link } from 'react-router-dom';

export default function BoardList({ boards }) {
  return (
    <ul>
      {boards.map(board => (
        <li key={board.id}>
          <Link to={`/boards/${board.id}`}>{board.title}</Link>
        </li>
      ))}
    </ul>
  );
}
