import React, { useState, useEffect } from 'react';

export default function CreateCard({ boardId, onCardCreated }) {
  const [message, setMessage] = useState('');
  const [gifSearch, setGifSearch] = useState('');
  const [gifResults, setGifResults] = useState([]);
  const [selectedGif, setSelectedGif] = useState(null);

  // Search Giphy API via backend proxy
  useEffect(() => {
    if (!gifSearch) {
      setGifResults([]);
      return;
    }
    const timeout = setTimeout(() => {
      fetch(`http://localhost:4000/giphy?q=${gifSearch}`)
        .then(res => res.json())
        .then(data => setGifResults(data.data))
        .catch(console.error);
    }, 500);
    return () => clearTimeout(timeout);
  }, [gifSearch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    const gifUrl = selectedGif ? selectedGif.images.fixed_height.url : null;

    try {
      const res = await fetch(`http://localhost:4000/boards/${boardId}/cards`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, gifUrl }),
      });
      const newCard = await res.json();
      onCardCreated(newCard);
      setMessage('');
      setSelectedGif(null);
      setGifSearch('');
      setGifResults([]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your kudos message"
      />
      <input
        type="text"
        placeholder="Search GIFs"
        value={gifSearch}
        onChange={e => setGifSearch(e.target.value)}
      />
      <div style={{ display: 'flex', overflowX: 'auto' }}>
        {gifResults.map(gif => (
          <img
            key={gif.id}
            src={gif.images.fixed_height_small.url}
            alt={gif.title}
            style={{ cursor: 'pointer', border: selectedGif?.id === gif.id ? '2px solid blue' : 'none' }}
            onClick={() => setSelectedGif(gif)}
          />
        ))}
      </div>
      <button type="submit">Add Card</button>
    </form>
  );
}
