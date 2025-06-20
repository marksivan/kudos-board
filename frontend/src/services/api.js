const API_BASE_URL = "http://localhost:4000";

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

// Board API functions
export const boardAPI = {
  // Get all boards
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/boards`);
    return handleResponse(response);
  },

  // Create a new board
  create: async (boardData) => {
    const response = await fetch(`${API_BASE_URL}/boards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(boardData),
    });
    return handleResponse(response);
  },

  // Delete a board
  delete: async (boardId) => {
    const response = await fetch(`${API_BASE_URL}/boards/${boardId}`, {
      method: "DELETE",
    });
    return handleResponse(response);
  },
};

// Card API functions
export const cardAPI = {
  // Get all cards for a board
  getByBoardId: async (boardId) => {
    const response = await fetch(`${API_BASE_URL}/boards/${boardId}/cards`);
    return handleResponse(response);
  },

  // Create a new card
  create: async (boardId, cardData) => {
    const response = await fetch(`${API_BASE_URL}/boards/${boardId}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardData),
    });
    return handleResponse(response);
  },

  // Update a card
  update: async (boardId, cardId, cardData) => {
    const response = await fetch(
      `${API_BASE_URL}/boards/${boardId}/cards/${cardId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardData),
      }
    );
    return handleResponse(response);
  },

  // Delete a card
  delete: async (boardId, cardId) => {
    const response = await fetch(
      `${API_BASE_URL}/boards/${boardId}/cards/${cardId}`,
      {
        method: "DELETE",
      }
    );
    return handleResponse(response);
  },
};

// Giphy API function
export const giphyAPI = {
  search: async (query = "kudos") => {
    const response = await fetch(
      `${API_BASE_URL}/giphy?q=${encodeURIComponent(query)}`
    );
    return handleResponse(response);
  },
};
