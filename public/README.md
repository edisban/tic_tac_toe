This project is a fully functional Tic Tac Toe game built with React.
It includes multiple React concepts such as state management with useState, side effects with useEffect, performance optimizations using useMemo and useCallback, and context-based global state management for scores and theme.
A ScoreContext tracks and updates the score of each player globally, while a ThemeContext provides a Dark/Light Mode toggle, storing the user’s preference in localStorage and applying global CSS styles dynamically.
The game automatically resets after a win or draw, includes a live timer, and has buttons for manual restart and resetting scores.
All components (Game, Board, Square, helpers) are modular and well-commented, making the code easy to read and extend — for example, adding features like AI opponent or move history in the future.
The app was styled with CSS for a clean, modern “game” look and runs with Vite + React for fast development and live updates.