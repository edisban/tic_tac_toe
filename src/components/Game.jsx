import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Board from "./Board";
import { calculateWinner } from "../helpers";
import { useScore } from "../context/ScoreContext";
import "../index.css";
import { useTheme } from "../context/ThemeContext";

const Game = () => {
  // ===============================
  // 🔢 GAME STATE
  // ===============================
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [winRecorded, setWinRecorded] = useState(false);
  const intervalRef = useRef(null);

  const { darkMode, toggleTheme } = useTheme();
  const { scores, addWin, resetScores } = useScore();

  const winner = useMemo(() => calculateWinner(board), [board]);
  const isDraw = !winner && board.every((cell) => cell !== null);

  // ===============================
  // ⏱️ TIMER
  // ===============================
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  // ===============================
  // 🏁 GAME END LOGIC
  // ===============================
  useEffect(() => {
    if ((winner || isDraw) && !winRecorded) {
      clearInterval(intervalRef.current);
      if (winner) addWin(winner);
      setWinRecorded(true);

      const timeout = setTimeout(() => {
        resetGame();
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [winner, isDraw, addWin, winRecorded]);

  // ===============================
  // 🎯 PLAYER MOVE HANDLER
  // ===============================
  const handleClick = useCallback(
    (i) => {
      if (board[i] || winner || isDraw) return;
      const newBoard = [...board];
      newBoard[i] = xIsNext ? "X" : "O";
      setBoard(newBoard);
      setXIsNext(!xIsNext);
    },
    [board, xIsNext, winner, isDraw]
  );

  // ===============================
  // 🧠 SIMPLE AI (Random Opponent)
  // ===============================
  useEffect(() => {
    // If it's the AI's turn (O) and the game isn't over
    if (!xIsNext && !winner && !isDraw) {
      const emptySquares = board
        .map((val, i) => (val === null ? i : null))
        .filter((val) => val !== null);

      if (emptySquares.length === 0) return;

      const randomIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];

      // Delay AI move slightly for realism
      const timeout = setTimeout(() => {
        handleClick(randomIndex);
      }, 600);

      return () => clearTimeout(timeout);
    }
  }, [xIsNext, winner, isDraw, board, handleClick]);

  // ===============================
  // 🔁 RESET GAME FUNCTION
  // ===============================
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setSeconds(0);
    setWinRecorded(false);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  // ===============================
  // 🖥️ RENDER UI
  // ===============================
  return (
    <div className="game-container">
      <h1 className="title">Tic Tac Toe</h1>

      <div className="theme-toggle">
        <button className="theme-btn" onClick={toggleTheme}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div className="info-panel">
        <p className="timer">⏱️ Time: {seconds}s</p>

        <h2 className="status">
          {winner
            ? `🏆 Winner: ${winner}`
            : isDraw
            ? "🤝 Draw!"
            : `Next Player: ${xIsNext ? "X (You)" : "O (Computer)"}`}
        </h2>

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

      <Board squares={board} onClick={handleClick} />
    </div>
  );
};

export default Game;
