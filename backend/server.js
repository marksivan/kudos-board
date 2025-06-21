require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const axios = require("axios");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// GET /boards - list all boards
app.get("/boards", async (req, res) => {
  const boards = await prisma.board.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(boards);
});

// POST /boards - create new board
app.post("/boards", async (req, res) => {
  try {
    const { title, category, author } = req.body;

    // Validate required fields
    if (!title || !category) {
      return res.status(400).json({
        error: "Title and category are required",
      });
    }

    const boardData = {
      title: title.trim(),
      category: category.trim(),
    };

    // Add author if provided
    if (author && author.trim()) {
      boardData.author = author.trim();
    }

    const board = await prisma.board.create({ data: boardData });
    res.json(board);
  } catch (error) {
    console.error("Error creating board:", error);
    res.status(500).json({ error: "Failed to create board" });
  }
});

// GET /boards/:id/cards - get all cards under board
app.get("/boards/:id/cards", async (req, res) => {
  const boardId = parseInt(req.params.id);
  const cards = await prisma.card.findMany({
    where: { boardId },
    orderBy: { createdAt: "desc" },
  });
  res.json(cards);
});

// POST /boards/:id/cards - create card under board
app.post("/boards/:id/cards", async (req, res) => {
  const boardId = parseInt(req.params.id);
  const { message, gifUrl } = req.body;
  const card = await prisma.card.create({
    data: { message, gifUrl, boardId },
  });
  res.json(card);
});

// PUT /boards/:id/cards/:cardId - update a card
app.put("/boards/:id/cards/:cardId", async (req, res) => {
  const cardId = parseInt(req.params.cardId);
  const { message, gifUrl } = req.body;
  const updatedCard = await prisma.card.update({
    where: { id: cardId },
    data: { message, gifUrl },
  });
  res.json(updatedCard);
});

// DELETE /boards/:id/cards/:cardId - delete a card
app.delete("/boards/:id/cards/:cardId", async (req, res) => {
  const cardId = parseInt(req.params.cardId);
  await prisma.card.delete({ where: { id: cardId } });
  res.json({ message: "Card deleted" });
});

// DELETE /boards/:id - delete a board and all its cards
app.delete("/boards/:id", async (req, res) => {
  const boardId = parseInt(req.params.id);
  await prisma.card.deleteMany({ where: { boardId } });
  await prisma.board.delete({ where: { id: boardId } });
  res.json({ message: "Board deleted" });
});

// Giphy API proxy: GET /giphy?q=searchTerm
app.get("/giphy", async (req, res) => {
  const q = req.query.q || "kudos";
  try {
    console.log("Giphy API Key:", process.env.GIPHY_KEY ? "Present" : "Missing");
    console.log("Search query:", q);

    const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
      params: {
        api_key: process.env.GIPHY_KEY,
        q,
        limit: 10,
      },
    });

    console.log("Giphy API response status:", response.status);
    res.json(response.data);
  } catch (err) {
    console.error("Giphy API error:", err.response?.data || err.message);
    console.error("Error status:", err.response?.status);
    res.status(500).json({
      error: "Failed to fetch GIFs",
      details: err.response?.data || err.message
    });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
