import "./Board.css";

function Board({ board, onViewBoard, onDeleteBoard }) {
  return (
    <div className="board">
      <div className="board-image">
        <img src="https://picsum.photos/200/300?random=217" alt={board.title} />
      </div>

      <div className="board-message">
        <h3>{board.title}</h3>
        <p>{board.description || "No description available"}</p>
      </div>

      <div className="board-category">
        <p>{board.category || "General"}</p>
      </div>

      <div className="board-operations">
        <button className="view-board" onClick={onViewBoard}>
          View Board
        </button>
        <button className="delete-board" onClick={onDeleteBoard}>
          Delete board
        </button>
      </div>
    </div>
  );
}

export default Board;
