# React-Game
## Star hunt

This is a Three.js game with crappy UI and silly logic. But it works

- Kill all monsters
- Avoid being eaten
## Installation

- Clone git@github.com:bsattiva/react-game.git
- In terminal window: npm install react-scripts (for Mac: yarn add react-scripts) 
- npm install three react-three-fiber (for Mac: yarn add react-three-fiber)
- npm install use-sound (for Mac: yarn add use-sound)

## The game

- to start the game run "npm start"

## Rules

- Press button in the center of the screen to start the game
- find the monster between the blocks and shoot it down 
- use arrow keys to navigate through the location
- use 't' key (en) to shoot
- all blocks but one are fake. The real one blows you up if you hit it
- you need to kill 5 monsters to win
- a new monster enters the game 10 seconds after the previous was destroyed
- moster can ran away - find and kill it
- if a monster touches you - it's over for you

## Issues

- bomb may set off even when you run near it in the isle
- In some cases you may win after the first moster
- In some cases monster can not appear
- You can enter the game by walking around the big button. But no fun then
- I've missed the requirement about the empty 'main' branch. Noticed too late - my bad

