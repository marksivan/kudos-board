const boards = [
  {
    id: 1,
    title: "Grateful for Small Wins",
    category: "thank you",
    image: "https://picsum.photos/200/300?random=225",
  },
  {
    id: 2,
    title: "Daily Motivation",
    category: "inspiration",
    image: "https://picsum.photos/200/300?random=220",
  },
  {
    id: 3,
    title: "Team Celebration 🎉",
    category: "celebration",
    image: "	https://picsum.photos/200/300?random=231",
  },
  {
    id: 4,
    title: "Shoutout to Sarah",
    category: "thank you",
    image: "https://picsum.photos/200/300?random=235",
  },
  {
    id: 5,
    title: "Words to Live By",
    category: "inspiration",
    image: "https://picsum.photos/200/300?random=237",
  },
  {
    id: 6,
    title: "End-of-Project Bash",
    category: "celebration",
    image: "https://picsum.photos/200/300?random=237",
  },
  {
    id: 7,
    title: "Daily Motivation",
    category: "inspiration",
    image: "https://picsum.photos/200/300?random=220",
  },
  {
    id: 8,
    title: "Team Celebration 🎉",
    category: "celebration",
    image: "	https://picsum.photos/200/300?random=231",
  },
];

const cards = [
  {
    id: 1,
    boardId: 1,
    message:
      "Thank you for always being so helpful and patient with everyone on the team!",
    gifUrl: "https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif",
    upvotes: 5,
    author: "Alex",
  },
  {
    id: 2,
    boardId: 1,
    message:
      "Your positive attitude makes every day better. Grateful to work with you!",
    gifUrl: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
    upvotes: 8,
    author: "Maria",
  },
  {
    id: 3,
    boardId: 2,
    message: "You inspire me to push through challenges and never give up!",
    gifUrl: "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif",
    upvotes: 12,
    author: "Jordan",
  },
  {
    id: 4,
    boardId: 2,
    message: "Your dedication and hard work motivate the entire team.",
    gifUrl: "https://media.giphy.com/media/3o7abAHdYvZdBNnGZq/giphy.gif",
    upvotes: 6,
    author: "Sam",
  },
  {
    id: 5,
    boardId: 3,
    message: "Congratulations on the successful project launch! 🎉",
    gifUrl: "https://media.giphy.com/media/l0MYu38R0PPhIXe36/giphy.gif",
    upvotes: 15,
    author: "Taylor",
  },
  {
    id: 6,
    boardId: 3,
    message: "Amazing teamwork everyone! Let's celebrate this win!",
    gifUrl: "https://media.giphy.com/media/3o6Zt6KHxJTbXCnSvu/giphy.gif",
    upvotes: 9,
    author: "Casey",
  },
];

export { boards, cards };
export default boards;
