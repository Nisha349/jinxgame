import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar'; // ✅ Import Navbar
import './RPSGame.css'; // CSS for styling

const choices = ['rock', 'paper', 'scissors'];

const RPSGame = () => {
  const [userChoice, setUserChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/scores')
      .then(res => setHistory(res.data))
      .catch(err => console.error("Error loading scores:", err));
  }, []);

  const getResult = (user, comp) => {
    if (user === comp) return "It's a tie!";
    if (
      (user === "rock" && comp === "scissors") ||
      (user === "paper" && comp === "rock") ||
      (user === "scissors" && comp === "paper")
    ) return "You win!";
    return "You lose!";
  };

  const play = async (choice) => {
    const comp = choices[Math.floor(Math.random() * choices.length)];
    const res = getResult(choice, comp);

    setUserChoice(choice);
    setComputerChoice(comp);
    setResult(res);

    const newEntry = {
      user: choice,
      computer: comp,
      result: res,
      time: new Date().toLocaleString()
    };

    // try {
    //   await axios.post('http://localhost:3000/scores', newEntry);
    //   setHistory(prev => [...prev, newEntry]);
    // } catch (err) {
    //   console.error("Error saving score:", err);
    //   alert("Failed to save game result.");
    // }
  };

  // const clearHistory = async () => {
  //   try {
  //     await axios.delete('http://localhost:3000/scores');
  //     setHistory([]);
  //   } catch (err) {
  //     console.error("Error deleting history:", err);
  //     alert("Failed to delete history.");
  //   }
  // };

  return (
    <>
      <Navbar /> {/* ✅ Add Navbar here */}
      <div className="rps-container">
        <h2>Rock, Paper, Scissors Game</h2>

        <div className="rps-buttons">
          {choices.map((c) => (
            <button key={c} onClick={() => play(c)}>{c}</button>
          ))}
        </div>

        <div style={{ marginTop: '20px' }}>
          <p>Your choice: <strong>{userChoice}</strong></p>
          <p>Computer's choice: <strong>{computerChoice}</strong></p>
          <div className="rps-result">{result}</div>
        </div>

        {/* <div className="rps-history" style={{ marginTop: '30px' }}>
          <h4>Game History</h4>
          {history.length > 0 ? (
            <>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {history.map((entry, idx) => (
                  <li key={idx}>
                    [{entry.time}] You: {entry.user}, Computer: {entry.computer} → <strong>{entry.result}</strong>
                  </li>
                ))}
              </ul>
              <button onClick={clearHistory} style={{ marginTop: '15px', padding: '8px 16px' }}>
                Clear History
              </button>
            </>
          ) : (
            <p>No game history yet.</p>
          )}
        </div> */}
      </div>
    </>
  );
};

export default RPSGame;
