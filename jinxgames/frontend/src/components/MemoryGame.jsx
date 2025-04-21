import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MemoryGame = () => {
  const [sequence, setSequence] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [round, setRound] = useState(1);
  const [showSequence, setShowSequence] = useState(true);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!gameOver) {
      generateSequence(round);
    }
  }, [round]);

  const generateSequence = (length) => {
    const newSeq = Array.from({ length }, () => Math.floor(Math.random() * 9) + 1);
    setSequence(newSeq);
    setShowSequence(true);
    setTimeout(() => setShowSequence(false), 2000 + length * 200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputArray = userInput.split('').map(Number);
    if (JSON.stringify(inputArray) === JSON.stringify(sequence)) {
      setMessage('✅ Correct!');
      setTimeout(() => {
        setRound(prev => prev + 1);
        setUserInput('');
        setMessage('');
      }, 1000);
    } else {
      setMessage('❌ Wrong! Game Over.');
      setGameOver(true);
      await saveScore(round - 1);
    }
  };

  const saveScore = async (score) => {
    try {
      await axios.post('http://localhost:5000/memory-scores', { score });
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  const restartGame = () => {
    setRound(1);
    setUserInput('');
    setMessage('');
    setGameOver(false);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🧠 Memory Game</h2>
      <p>Round: {round}</p>
      {showSequence ? (
        <h3>{sequence.join(' ')}</h3>
      ) : !gameOver ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter sequence"
          />
          <button type="submit">Submit</button>
        </form>
      ) : null}
      <p>{message}</p>
      {gameOver && <button onClick={restartGame}>Restart</button>}
    </div>
  );
};

export default MemoryGame;