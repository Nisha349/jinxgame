import React, { useState, useEffect, useRef } from 'react';
import './FlappyBirdGame.css';

const FlappyBirdGame = () => {
  const [birdY, setBirdY] = useState(250);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [pipes, setPipes] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [pipeSpeed, setPipeSpeed] = useState(2); // 🌟 Initial slow speed

  const birdHeight = 20;
  const birdWidth = 20;
  const pipeWidth = 50;
  const pipeGap = 150;
  const gravity = 0.5;
  const jumpStrength = -10;
  const gameArea = useRef(null);

  const handleSpacebar = (e) => {
    if (e.code === 'Space') {
      if (!gameStarted) {
        startGame();
      } else if (!gameOver) {
        setBirdVelocity(jumpStrength);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleSpacebar);
    return () => {
      window.removeEventListener('keydown', handleSpacebar);
    };
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const animationId = requestAnimationFrame(updateGame);
      return () => cancelAnimationFrame(animationId);
    }
  }, [birdY, pipes, gameOver, gameStarted, pipeSpeed]);

  const startGame = () => {
    setBirdY(250);
    setBirdVelocity(0);
    setPipes(generatePipes());
    setScore(0);
    setPipeSpeed(2); // Reset to easy mode
    setGameOver(false);
    setGameStarted(true);
  };

  const endGame = () => {
    setGameOver(true);
    setGameStarted(false);
    setHighScore(prev => Math.max(prev, score));
  };

  const updateGame = () => {
    setBirdY(prevY => prevY + birdVelocity);
    setBirdVelocity(prev => prev + gravity);

    // 🌟 Update speed based on score
    setPipeSpeed(() => {
      if (score < 5) return 2; // easy
      else if (score < 10) return 3; // medium
      else if (score < 20) return 4; // hard
      else return 5; // max speed
    });

    setPipes(prevPipes => {
      let scored = false;
      const newPipes = prevPipes.map(pipe => {
        const movedPipe = { ...pipe, x: pipe.x - pipeSpeed };
        if (!pipe.passed && movedPipe.x + pipeWidth < 50) {
          pipe.passed = true;
          scored = true;
        }
        return movedPipe;
      });

      if (newPipes[0].x + pipeWidth < 0) {
        newPipes.shift();
        newPipes.push(generateNewPipe());
      }

      if (scored) setScore(prev => prev + 1);

      return newPipes;
    });

    if (birdY + birdHeight > 400 || birdY < 0) {
      endGame();
    }

    pipes.forEach(pipe => {
      if (
        pipe.x < 50 + birdWidth &&
        pipe.x + pipeWidth > 50 &&
        (birdY < pipe.y || birdY + birdHeight > pipe.y + pipeGap)
      ) {
        endGame();
      }
    });
  };

  const generatePipes = () => {
    return Array.from({ length: 3 }, (_, i) => generateNewPipe(i));
  };

  const generateNewPipe = (i = 0) => {
    const pipeHeight = Math.random() * (250 - 50) + 50;
    return {
      x: 600 + i * 250,
      y: pipeHeight,
      passed: false,
    };
  };

  return (
    <div
      className="flappy-bird-game"
      ref={gameArea}
      style={{
        position: 'relative',
        width: '100vw',
        height: '400px',
        overflow: 'hidden',
        background: '#70c5ce',
      }}
    >
      {/* Bird */}
      <div
        className="bird"
        style={{
          position: 'absolute',
          top: birdY,
          left: 50,
          width: birdWidth,
          height: birdHeight,
          backgroundColor: 'yellow',
          borderRadius: '50%',
        }}
      />

      {/* Pipes */}
      {pipes.map((pipe, index) => (
        <React.Fragment key={index}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: pipe.x,
              width: pipeWidth,
              height: pipe.y,
              backgroundColor: 'green',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: pipe.y + pipeGap,
              left: pipe.x,
              width: pipeWidth,
              height: 400 - (pipe.y + pipeGap),
              backgroundColor: 'green',
            }}
          />
        </React.Fragment>
      ))}

      {/* Game Over */}
      {gameOver && (
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '32px',
            fontWeight: 'bold',
            color: 'red',
          }}
        >
          Game Over
        </div>
      )}

      {/* Start Button */}
      {!gameStarted && (
        <button
          onClick={startGame}
          style={{
            position: 'absolute',
            top: '60%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '20px',
            padding: '10px 20px',
            background: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
          }}
        >
          Start Game
        </button>
      )}

      {/* Scores */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          color: 'white',
          fontSize: '18px',
        }}
      >
        Score: {score} <br />
        High Score: {highScore} <br />
        Speed: {pipeSpeed}px/frame
      </div>
    </div>
  );
};

export default FlappyBirdGame;
