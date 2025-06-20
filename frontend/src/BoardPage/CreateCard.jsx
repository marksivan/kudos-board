import React, { useState, useEffect } from "react";
import "./CreateCard.css";

const GIPHY_API_KEY = "OOfQ2ZSuvy5djAbsgWolwhB6Zxf9nN6k";

export default function CreateCard({ boardId, onCardCreated }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState("");
  const [gifSearch, setGifSearch] = useState("");
  const [gifResults, setGifResults] = useState([]);
  const [selectedGif, setSelectedGif] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSearching, setIsSearching] = useState(false);

  // Search Giphy API directly
  useEffect(() => {
    if (!gifSearch.trim()) {
      setGifResults([]);
      return;
    }

    setIsSearching(true);
    const timeout = setTimeout(() => {
      fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(
          gifSearch
        )}&limit=12&rating=g`
      )
        .then((res) => res.json())
        .then((data) => {
          setGifResults(data.data || []);
          setIsSearching(false);
        })
        .catch((error) => {
          console.error("Error fetching GIFs:", error);
          setGifResults([]);
          setIsSearching(false);
        });
    }, 500);

    return () => clearTimeout(timeout);
  }, [gifSearch]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMessage("");
    setAuthor("");
    setGifSearch("");
    setGifResults([]);
    setSelectedGif(null);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (!message.trim()) {
      newErrors.message = "Message is required";
    }

    if (!selectedGif) {
      newErrors.gif = "Please select a GIF";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Generate a new ID (using timestamp + random number for uniqueness)
    const newId = Date.now() + Math.floor(Math.random() * 1000);

    const newCard = {
      id: newId,
      boardId: boardId,
      message: message.trim(),
      gifUrl: selectedGif.images.fixed_height.url,
      upvotes: 0,
      author: author.trim() || "Anonymous",
    };

    onCardCreated(newCard);
    closeModal();
  };

  return (
    <div className="create-card">
      <button className="create-card-btn" onClick={openModal}>
        Add New Card
      </button>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Card</h2>
              <button className="close-btn" onClick={closeModal}>
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="create-card-form">
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={errors.message ? "error" : ""}
                  placeholder="Write your kudos message..."
                  rows="4"
                />
                {errors.message && (
                  <span className="error-message">{errors.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Enter your name (optional)"
                />
              </div>

              <div className="form-group">
                <label htmlFor="gifSearch">Search GIFs *</label>
                <input
                  type="text"
                  id="gifSearch"
                  value={gifSearch}
                  onChange={(e) => setGifSearch(e.target.value)}
                  placeholder="Search for a GIF..."
                />
                {errors.gif && (
                  <span className="error-message">{errors.gif}</span>
                )}
              </div>

              {isSearching && (
                <div className="loading">Searching for GIFs...</div>
              )}

              {gifResults.length > 0 && (
                <div className="gif-results">
                  <label>Select a GIF:</label>
                  <div className="gif-grid">
                    {gifResults.map((gif) => (
                      <img
                        key={gif.id}
                        src={gif.images.fixed_height_small.url}
                        alt={gif.title}
                        className={`gif-option ${
                          selectedGif?.id === gif.id ? "selected" : ""
                        }`}
                        onClick={() => setSelectedGif(gif)}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Add Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
