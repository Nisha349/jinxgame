// src/components/GamesPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";

const GamesPage = () => {
  const navigate = useNavigate();

  const goToRPS = () => {
    navigate('/rps');
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "2rem", textAlign: "center", color: "white" }}>
        <h2>🎮 Game Zone</h2>
        <div 
          onClick={goToRPS}
          style={{
            margin: "2rem auto",
            cursor: "pointer",
            background: "#1e1e1e",
            borderRadius: "16px",
            padding: "2rem",
            maxWidth: "300px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            transition: "transform 0.2s ease-in-out"
          }}
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
      </div>
    </>
  );
};

export default GamesPage;
