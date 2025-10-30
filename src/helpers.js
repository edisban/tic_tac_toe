// 🧩 Function to calculate the winner in a Tic Tac Toe board
export function calculateWinner(squares) {
  // All possible winning line combinations in a 3x3 grid
  // Each subarray contains the indices of the squares that form a winning line
  const lines = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal from top-left to bottom-right
    [2, 4, 6]  // diagonal from top-right to bottom-left
  ];

  // Loop through all the possible winning combinations
  for (let i = 0; i < lines.length; i++) {
    // Destructure the current line's indices
    const [a, b, c] = lines[i];

    // Check if these three cells have the same non-null value (X or O)
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // If they match, return the symbol of the winner ("X" or "O")
      return squares[a];
    }
  }

  // If no winner is found, return null
  return null;
}

// 🧪 Example usage (for testing purposes)
const squares = [
  null, null, null,
  'X', 'X', 'O',
  null, null, null
];

// This console log helps verify the function works correctly
console.log(calculateWinner(squares));