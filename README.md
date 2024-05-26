# Tic Tac Toe Game

Welcome to the Tic Tac Toe game! This browser-based game is built using HTML, CSS, and JavaScript. Users can enjoy a classic game of Tic Tac Toe with a modern twist, thanks to several advanced JavaScript concepts like factory functions, module patterns, IIFE (Immediately Invoked Function Expressions), and data encapsulation.

## Table of Contents

- [Features](#features)
- [How to Play](#how-to-play)
- [Code Overview](#code-overview)
- [Live Preview](#live-preview)

## Features

- **Start Screen**: Users can enter their names and hit the play button to start the game.
- **Dynamic Turn Indicator**: An info box at the top of the game board displays whose turn it is.
- **Winner Screen**: At the end of the game, a winner screen displays the winner's name and provides two buttons:
  - Play Again
  - Home Screen
- **Advanced JavaScript Concepts**: Utilizes factory functions, module patterns, IIFE, and data encapsulation to manage game logic efficiently.

## How to Play

1. **Start the Game**:
   - Open the game in your browser.
   - Enter your name and your opponent's name in the provided fields.
   - Click the "Play" button to begin.

2. **Gameplay**:
   - The game board will display with a 3x3 grid.
   - Players take turns clicking on an empty cell to place their mark (X or O).
   - The info box at the top will indicate whose turn it is.

3. **Winning the Game**:
   - The first player to get three of their marks in a row (horizontally, vertically, or diagonally) wins.
   - When a player wins, the winner screen will display the winner's name.

4. **After the Game**:
   - On the winner screen, you can choose to play again by clicking the "Play Again" button.
   - Alternatively, return to the start screen by clicking the "Home Screen" button.

## Code Overview

### HTML
The HTML file sets up the structure of the game, including the start screen, game board, and winner screen.

### CSS
The CSS file styles the game elements, providing a clean and modern look.

### JavaScript
The JavaScript file contains the game logic, implemented using advanced concepts:

- **Factory Functions**: Used to create player objects.
- **Module Pattern**: Organizes the game logic into self-contained modules.
- **IIFE (Immediately Invoked Function Expressions)**: Ensures that modules are executed as soon as they are defined, keeping the global scope clean.
- **Data Encapsulation**: Protects the game state and logic from outside interference, promoting a modular and maintainable codebase.

## Live Preview
Visit site live [here](https://suwillwd.github.io/tic-tac-toe-game/).
