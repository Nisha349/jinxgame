import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import sequelize from "./config/db.js";
import routes from "./routes/allRoutes.js";
import "./models/user/user.js";

const app = express();
const PORT = 3000;
const SCORE_FILE = './scores.json';

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Routes for users (Sequelize)
app.use('/api/user', routes);

// Ensure scores.json exists
if (!fs.existsSync(SCORE_FILE)) {
  fs.writeFileSync(SCORE_FILE, '[]');
}

// GET: Fetch all scores
app.get('/scores', (req, res) => {
  try {
    const data = fs.readFileSync(SCORE_FILE);
    res.json(JSON.parse(data));
  } catch (err) {
    console.error("Failed to read scores:", err);
    res.status(500).json({ error: 'Failed to read scores.' });
  }
});

// POST: Save a new game result
app.post('/scores', (req, res) => {
  try {
    const newScore = req.body;
    const data = fs.readFileSync(SCORE_FILE);
    const scores = JSON.parse(data);
    scores.push(newScore);
    fs.writeFileSync(SCORE_FILE, JSON.stringify(scores, null, 2));
    res.status(201).json({ message: 'Score saved successfully!' });
  } catch (err) {
    console.error("Failed to save score:", err);
    res.status(500).json({ error: 'Failed to save score.' });
  }
});

// DELETE: Clear all game history
app.delete('/scores', (req, res) => {
  try {
    fs.writeFileSync(SCORE_FILE, '[]');
    res.status(200).json({ message: 'All scores cleared' });
  } catch (err) {
    console.error("Failed to clear scores:", err);
    res.status(500).json({ error: 'Failed to delete scores.' });
  }
});

// Start server after DB sync
sequelize.sync({ logging: console.log })
  .then(() => {
    console.log("Database Connected Successfully!!");
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database connection error: " + err);
  });
