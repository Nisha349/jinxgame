import React from 'react';
import { useNavigate } from 'react-router-dom';

const GamesPage = () => {
  const navigate = useNavigate();

  const goToRPS = () => navigate('/rps');
  const goToMemory = () => navigate('/memory');
  const goToHangman = () => navigate('/hangman');
  const goToFlappyBird = () => navigate('/flappybird');  // Navigate to Flappy Bird game
  const goToLeaderboard = () => navigate('/leaderboard');

  const gameCardStyle = {
    margin: "2rem",
    cursor: "pointer",
    background: "#1e1e1e",
    borderRadius: "16px",
    padding: "1.5rem",
    width: "300px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    transition: "transform 0.2s ease-in-out"
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center", color: "white" }}>
      <h2>🎮 Game Zone</h2>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>

        {/* Rock Paper Scissors Card */}
        <div 
          onClick={goToRPS}
          style={gameCardStyle}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          <img 
            src="https://www.shutterstock.com/shutterstock/photos/2187551809/display_1500/stock-vector-hands-playing-rock-paper-scissors-game-flat-design-style-vector-illustration-2187551809.jpg" 
            alt="RPS Game" 
            style={{ width: "100%", borderRadius: "12px" }} 
          />
          <h3 style={{ marginTop: "1rem", color: "#fff" }}>Rock Paper Scissors</h3>
          <p style={{ color: "#ccc" }}>Click to Play</p>
        </div>

        {/* Memory Game Card */}
        <div 
          onClick={goToMemory}
          style={gameCardStyle}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          <img 
            src="https://img.freepik.com/free-vector/flat-memory-game-illustration_23-2149267525.jpg" 
            alt="Memory Game" 
            style={{ width: "100%", borderRadius: "12px" }} 
          />
          <h3 style={{ marginTop: "1rem", color: "#fff" }}>Memory Game</h3>
          <p style={{ color: "#ccc" }}>Click to Play</p>
        </div>

        {/* Hangman Game Card */}
        <div 
          onClick={goToHangman}
          style={gameCardStyle}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          <img 
            src="https://img.freepik.com/free-vector/flat-design-hangman-game-illustration_23-2148592572.jpg" 
            alt="Hangman Game" 
            style={{ width: "100%", borderRadius: "12px" }} 
          />
          <h3 style={{ marginTop: "1rem", color: "#fff" }}>Hangman</h3>
          <p style={{ color: "#ccc" }}>Click to Play</p>
        </div>

        {/* Flappy Bird Game Card */}
        <div 
          onClick={goToFlappyBird}
          style={gameCardStyle}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          <img 
            src="https://www.shutterstock.com/shutterstock/photos/2187551809/display_1500/stock-vector-flappy-bird-game-illustration-2187551809.jpg" 
            alt="Flappy Bird Game" 
            style={{ width: "100%", borderRadius: "12px" }} 
          />
          <h3 style={{ marginTop: "1rem", color: "#fff" }}>Flappy Bird</h3>
          <p style={{ color: "#ccc" }}>Click to Play</p>
        </div>
        
      </div>
    </div>
  );
};

export default GamesPage;
