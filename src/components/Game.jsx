// Import all the React hooks we need
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";

// Import child components and utilities
import Board from "./Board"; // the 3x3 board grid
import { calculateWinner } from "../helpers"; // helper function that checks for a winner
import { useScore } from "../context/ScoreContext"; // custom context hook for player scores
import "../index.css"; // global styles
import { useTheme } from "../context/ThemeContext"; // custom context hook for dark/light mode

// 🎮 Main Game component
const Game = () => {

  // 🔢 GAME STATE


  // The board is represented by an array of 9 cells (null, "X", or "O")
  const [board, setBoard] = useState(Array(9).fill(null));

  // Boolean to track which player's turn it is (true = X, false = O)
  const [xIsNext, setXIsNext] = useState(true);

  // Track how many seconds have passed since the start of the round
  const [seconds, setSeconds] = useState(0);

  // Prevent multiple score updates for the same win
  const [winRecorded, setWinRecorded] = useState(false);

  // A ref to store the timer interval so we can start/stop it easily
  const intervalRef = useRef(null);

  // Access dark mode and toggle function from ThemeContext
  const { darkMode, toggleTheme } = useTheme();

  // Access scores and actions from ScoreContext
  const { scores, addWin, resetScores } = useScore();

  // ===============================
  // 🧠 GAME LOGIC
  // ===============================

  // Memoize the winner calculation to avoid recalculating on every render
  const winner = useMemo(() => calculateWinner(board), [board]);

  // Check if the board is full but there’s no winner (for draw condition)
  const isDraw = !winner && board.every((cell) => cell !== null);

  // ===============================
  // ⏱️ TIMER MANAGEMENT
  // ===============================

  // Start the timer when the component mounts
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // Cleanup when component unmounts (important to avoid memory leaks)
    return () => clearInterval(intervalRef.current);
  }, []);

  // ===============================
  // 🏁 END GAME LOGIC (auto new round)
  // ===============================

  useEffect(() => {
    // Trigger when a game ends (winner or draw)
    if ((winner || isDraw) && !winRecorded) {
      clearInterval(intervalRef.current); // stop the timer

      if (winner) addWin(winner); // update the score if someone won
      setWinRecorded(true); // mark that we recorded the win (to prevent duplicates)

      // After 2 seconds, automatically start a new round
      const timeout = setTimeout(() => {
        resetGame();
      }, 2000);

      // Cleanup timeout if component re-renders
      return () => clearTimeout(timeout);
    }
  }, [winner, isDraw, addWin, winRecorded]);

  // ===============================
  // 🔁 RESET GAME FUNCTION
  // ===============================

  const resetGame = () => {
    setBoard(Array(9).fill(null)); // clear the board
    setXIsNext(true);              // reset player turn
    setSeconds(0);                 // reset timer
    setWinRecorded(false);         // reset win flag

    // restart the timer
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  // ===============================
  // 🎯 HANDLE CLICK ON A SQUARE
  // ===============================

  // useCallback prevents unnecessary re-renders of child components
  const handleClick = useCallback(
    (i) => {
      // Ignore click if square is already filled or game ended
      if (board[i] || winner || isDraw) return;

      // Copy the current board and update the clicked square
      const newBoard = [...board];
      newBoard[i] = xIsNext ? "X" : "O";

      // Update state
      setBoard(newBoard);
      setXIsNext(!xIsNext); // switch turns
    },
    [board, xIsNext, winner, isDraw]
  );

  // ===============================
  // 🖥️ RENDER UI
  // ===============================

  return (
    <div className="game-container">
      <h1 className="title">Tic Tac Toe</h1>

      {/* Toggle dark/light mode */}
      <div className="theme-toggle">
        <button className="theme-btn" onClick={toggleTheme}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Info panel: timer, status, and scoreboard */}
      <div className="info-panel">
        <p className="timer">⏱️ Time: {seconds}s</p>

        {/* Dynamic game status message */}
        <h2 className="status">
          {winner
            ? `🏆 Winner: ${winner}`
            : isDraw
            ? "🤝 Draw!"
            : `Next Player: ${xIsNext ? "X" : "O"}`}
        </h2>

        {/* Player scores and control buttons */}
        <div className="scoreboard">
          <p>
            <span className="x-score">X: {scores.X}</span> |{" "}
            <span className="o-score">O: {scores.O}</span>
          </p>

          <div className="buttons">
            <button className="reset-btn" onClick={resetScores}>
              Reset Score
            </button>
            <button className="restart-btn" onClick={resetGame}>
              Restart Game
            </button>
          </div>
        </div>
      </div>

      {/* Render the 3x3 game board */}
      <Board squares={board} onClick={handleClick} />
    </div>
  );
};

// Export main Game component
export default Game;
