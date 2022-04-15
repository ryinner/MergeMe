import { Game } from "./classes/Game.js";

const game = new Game;

game.init();

document.querySelector('#newGame').addEventListener('click', () => {
    game.render();
})