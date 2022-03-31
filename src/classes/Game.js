import { BaseCube } from "./BaseCube.js";
export class Game {
    GameBoard = [
        [0, 2, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 2, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ];

    render () {
        for (let x = 0; x < this.GameBoard.length; x++) {
            for(let y = 0; y < this.GameBoard[x].length; y++) {
                console.log(this.GameBoard[x][y]);;
                const cube = new BaseCube(this.GameBoard[x][y]);
                cube.render();
            }
        }
    }
}