import User from "../models/user.model.js";
import Pin from "../models/pin.model.js";
import Board from "../models/board.model.js";
import Comment from "../models/comment.model.js";
import bcrypt from "bcryptjs";
import connectDB from "./connectDB.js";

connectDB();

const names = [
  { displayName: "John Doe", username: "johndoe" },
  { displayName: "Emily Carter", username: "emily.carter" },
  { displayName: "Carlos Mendes", username: "carlos.mendes" },
  { displayName: "Sofia Oliveira", username: "sofia.oliveira" },
  { displayName: "Daniel Thompson", username: "daniel.thompson" },
  { displayName: "Aisha Khan", username: "aisha.khan" },
  { displayName: "Liam Robinson", username: "liam.robinson" },
  { displayName: "Hiroshi Tanaka", username: "hiroshi.tanaka" },
  { displayName: "Marie Dubois", username: "marie.dubois" },
  { displayName: "Nathan Scott", username: "nathan.scott" },
];

const generatePicsumId = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const seedDB = async () => {
  await User.deleteMany({});
  await Pin.deleteMany({});
  await Board.deleteMany({});
  await Comment.deleteMany({});

  const users = [];
  for (const { displayName, username } of names) {
    const hashedPassword = await bcrypt.hash("password123", 10);
    const user = new User({
      displayName,
      username,
      email: `${username.replace(".", "_")}@example.com`,
      hashedPassword,
      img: `https://api.dicebear.com/7.x/adventurer/svg?seed=${username}`,
    });
    users.push(await user.save());
  }

  const boards = [];
  for (const user of users) {
    for (let i = 1; i <= 5; i++) {
      const board = new Board({
        title: `${user.displayName.split(" ")[0]}'s Collection ${i}`,
        user: user._id,
      });
      boards.push(await board.save());
    }
  }

  const pins = [];
  for (const user of users) {
    const userBoards = boards.filter(
      (board) => board.user.toString() === user._id.toString()
    );
    for (let i = 1; i <= 7; i++) {
      const isVertical = Math.random() < 0.5;
      const pin = new Pin({
        media: `https://picsum.photos/id/${generatePicsumId(101, 200)}/${isVertical ? "800/1200" : "800/600"}`,
        width: 800,
        height: isVertical ? 1200 : 600,
        title: `Aesthetic Inspiration #${i}`,
        description: `A beautiful image for inspiration shared by ${user.displayName}.`,
        link: `https://example.com/pin-${user.username}-${i}`,
        board: userBoards[i % userBoards.length]._id,
        tags: [`inspiration`, `design`, user.username],
        user: user._id,
      });
      pins.push(await pin.save());
    }
  }

  for (const user of users) {
    for (let i = 1; i <= 5; i++) {
      const randomPin = pins[Math.floor(Math.random() * pins.length)];
      const comment = new Comment({
        description: `${user.displayName.split(" ")[0]}: This is amazing! 🎨`,
        pin: randomPin._id,
        user: user._id,
      });
      await comment.save();
    }
  }

  console.log("Database seeded successfully with varied Picsum images!");
  process.exit(0);
};

seedDB().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});
