import React, { useState, useEffect } from "react";
import { giphyAPI } from "../services/api";
import "./CreateCard.css";

export default function CreateCard({ onCardCreated }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [gifSearch, setGifSearch] = useState("");
  const [gifResults, setGifResults] = useState([]);
  const [selectedGif, setSelectedGif] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Search GIFs using backend API
  useEffect(() => {
    if (!gifSearch.trim()) {
      setGifResults([]);
      return;
    }

    setIsSearching(true);
    const timeout = setTimeout(async () => {
      try {
        const data = await giphyAPI.search(gifSearch);
        setGifResults(data.data || []);
      } catch (error) {
        console.error("Error fetching GIFs:", error);
        setGifResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [gifSearch]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMessage("");
    setGifSearch("");
    setGifResults([]);
    setSelectedGif(null);
    setErrors({});
    setIsSubmitting(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const cardData = {
        message: message.trim(),
        gifUrl: selectedGif.images.fixed_height.url,
      };

      await onCardCreated(cardData);
      closeModal();
    } catch (error) {
      console.error("Error creating card:", error);
      setErrors({ submit: "Failed to create card. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
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
                <label htmlFor="gifSearch">Search GIFs *</label>
                <input
                  type="text"
                  id="gifSearch"
                  value={gifSearch}
                  onChange={(e) => setGifSearch(e.target.value)}
                  placeholder="Search for a GIF..."
                  disabled={isSubmitting}
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

              {errors.submit && (
                <div className="form-group">
                  <span className="error-message">{errors.submit}</span>
                </div>
              )}

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeModal}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add Card"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
