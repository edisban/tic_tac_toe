// Import necessary React hooks and functions
import React, { createContext, useContext, useState } from "react";

// 1️⃣ Create a new Context object to share score data globally
// Any component wrapped in this context can access or modify the scores.
const ScoreContext = createContext();

// 2️⃣ Define the Context Provider component
// It will hold and manage the global score state for both players.
export const ScoreProvider = ({ children }) => {
  // Keep track of player scores (X and O)
  // The state is an object with two properties: { X: 0, O: 0 }
  const [scores, setScores] = useState({ X: 0, O: 0 });

  // 3️⃣ Function to increment the score for the winning player
  // It receives 'winner' ("X" or "O") and updates the corresponding score.
  const addWin = (winner) => {
    if (winner) {
      // Use functional update to ensure correct state update
      setScores((prev) => ({
        ...prev,                  // keep the other player’s score unchanged
        [winner]: prev[winner] + 1, // increment the winner’s score
      }));
    }
  };

  // 4️⃣ Function to reset both player scores to zero
  const resetScores = () => {
    setScores({ X: 0, O: 0 });
  };

  // 5️⃣ Provide the scores and the functions to the rest of the app
  // Any child component can read scores or call addWin / resetScores
  return (
    <ScoreContext.Provider value={{ scores, addWin, resetScores }}>
      {children}
    </ScoreContext.Provider>
  );
};

// 6️⃣ Custom hook to easily use the context in any component
// Instead of writing useContext(ScoreContext) manually every time
export const useScore = () => useContext(ScoreContext);
