const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Kudos Board Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.get('/boards', async (req, res) => {
  const boards = await prisma.board.findMany({
    include: { cards: true },
  });
  res.json(boards);
});
