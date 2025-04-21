import './App.css';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import GamesPage from './components/GamesPage';
import RPSGame from './components/RPSGame';
import MemoryGame from './components/MemoryGame';
import HangmanGame from './components/HangmanGame';
import FlappyBirdGame from './components/FlappyBirdGame';  // Import the Flappy Bird game

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/games" element={<GamesPage />} />
      <Route path="/rps" element={<RPSGame />} />
      <Route path="/memory" element={<MemoryGame />} />
      <Route path="/hangman" element={<HangmanGame />} />
      <Route path="/flappybird" element={<FlappyBirdGame />} />  {/* Add route for Flappy Bird game */}
    </Routes>
  );
}

export default App;
