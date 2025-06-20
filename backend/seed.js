const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Mock data adapted for our database schema
const mockBoards = [
  {
    title: "Grateful for Small Wins",
    category: "thank you",
    author: "Alex Johnson",
    image: "https://picsum.photos/200/300?random=225",
  },
  {
    title: "Daily Motivation",
    category: "inspiration",
    author: "Maria Garcia",
    image: "https://picsum.photos/200/300?random=220",
  },
  {
    title: "Team Celebration 🎉",
    category: "celebration",
    author: "Team Lead",
    image: "https://picsum.photos/200/300?random=231",
  },
  {
    title: "Shoutout to Sarah",
    category: "thank you",
    author: "Mike Chen",
    image: "https://picsum.photos/200/300?random=235",
  },
  {
    title: "Words to Live By",
    category: "inspiration",
    image: "https://picsum.photos/200/300?random=237",
  },
  {
    title: "End-of-Project Bash",
    category: "celebration",
    author: "Project Manager",
    image: "https://picsum.photos/200/300?random=237",
  },
  {
    title: "Weekly Inspiration",
    category: "inspiration",
    author: "HR Team",
    image: "https://picsum.photos/200/300?random=220",
  },
  {
    title: "Project Success Party",
    category: "celebration",
    image: "https://picsum.photos/200/300?random=231",
  },
];

const mockCards = [
  {
    boardId: 1,
    message:
      "Thank you for always being so helpful and patient with everyone on the team!",
    gifUrl: "https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif",
  },
  {
    boardId: 1,
    message:
      "Your positive attitude makes every day better. Grateful to work with you!",
    gifUrl: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
  },
  {
    boardId: 2,
    message: "You inspire me to push through challenges and never give up!",
    gifUrl: "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif",
  },
  {
    boardId: 2,
    message: "Your dedication and hard work motivate the entire team.",
    gifUrl: "https://media.giphy.com/media/3o7abAHdYvZdBNnGZq/giphy.gif",
  },
  {
    boardId: 3,
    message: "Congratulations on the successful project launch! 🎉",
    gifUrl: "https://media.giphy.com/media/l0MYu38R0PPhIXe36/giphy.gif",
  },
  {
    boardId: 3,
    message: "Amazing teamwork everyone! Let's celebrate this win!",
    gifUrl: "https://media.giphy.com/media/3o6Zt6KHxJTbXCnSvu/giphy.gif",
  },
  {
    boardId: 4,
    message: "Sarah, your leadership on this project was incredible!",
    gifUrl: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
  },
  {
    boardId: 5,
    message: "Every challenge is an opportunity to grow stronger!",
    gifUrl: "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif",
  },
  {
    boardId: 6,
    message: "What an amazing project completion! Time to celebrate! 🎊",
    gifUrl: "https://media.giphy.com/media/l0MYu38R0PPhIXe36/giphy.gif",
  },
];

async function seed() {
  try {
    console.log("🌱 Starting database seed...");

    // Clear existing data
    await prisma.card.deleteMany();
    await prisma.board.deleteMany();
    console.log("🧹 Cleared existing data");

    // Create boards and store their actual IDs
    console.log("📋 Creating boards...");
    const createdBoards = [];
    for (const boardData of mockBoards) {
      const board = await prisma.board.create({
        data: boardData,
      });
      createdBoards.push(board);
    }

    // Create cards using the actual board IDs
    console.log("🎴 Creating cards...");
    for (const cardData of mockCards) {
      // Map the original boardId to the actual created board ID
      const actualBoardId = createdBoards[cardData.boardId - 1]?.id;

      if (actualBoardId) {
        await prisma.card.create({
          data: {
            message: cardData.message,
            gifUrl: cardData.gifUrl,
            boardId: actualBoardId,
          },
        });
      }
    }

    console.log("✅ Database seeded successfully!");
    console.log(
      `📊 Created ${createdBoards.length} boards and ${mockCards.length} cards`
    );
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
