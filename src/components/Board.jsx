// Import React and the Square component (each cell of the board)
import React from 'react';
import Square from './Square';

// 🎨 Inline styling for the entire Tic Tac Toe board
const style = {
  border: '10px solid darkblue',     // thick blue border around the board
  borderRadius: '5px',               // slightly rounded corners
  width: '250px',                    // total board width
  height: '250px',                   // total board height
  margin: '0 auto',                  // center horizontally
  display: 'grid',                   // use CSS Grid layout
  gridTemplate: 'repeat(3, 1fr) / repeat(3, 1fr)', // 3x3 grid of equal squares
};

// 🧩 Functional component for the Board
// Receives two props:
//  - squares: an array of 9 values (X, O, or null)
//  - onClick: function called when a square is clicked
const Board = ({ squares, onClick }) => {
  return (
    <div style={style}>
      {/* Loop through each square and render a <Square> component */}
      {squares.map((square, i) => (

        <Square key={i} value={square} onClick={() => onClick(i)} />
      ))}
    </div>
  );
};

// Export the Board so it can be used in Game.jsx
export default Board;
