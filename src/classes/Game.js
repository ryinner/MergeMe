import { BaseCube } from "./BaseCube.js";
import { random, duoRandom } from "../helpers/baseHelper.js";
export class Game {
    GameBoard = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ];

    app = document.querySelector('#app');

    render () {
        for (let x = 0; x < this.GameBoard.length; x++) {
            for(let y = 0; y < this.GameBoard[x].length; y++) {
                this.GameBoard[x][y] = new BaseCube(x+1, y+1);
                // this.GameBoard[x][y].render();
            }
        }

        this.GameBoard[random(0, 4)][random(0, 4)].score = duoRandom(2,4) ;
    }

    swipe() {
        let touch = {};
        app.addEventListener('touchstart', (event) => {
            touch = { 
                x: event.changedTouches[0].clientX,
                y: event.changedTouches[0].clientY,
            };
        });
    
        app.addEventListener('touchmove', (event) => {
            let touchMove = { 
                x: event.changedTouches[0].clientX,
                y: event.changedTouches[0].clientY,
            };
    
            const calcX = touch.x - touchMove.x;
            const calcY = touch.y - touchMove.y;
    
            this.calculateChangeOfPosition(calcX, calcY);
        })
    }
    
    calculateChangeOfPosition(calcX, calcY) {
        if (Math.abs(calcX) > Math.abs(calcY)) {
            // r-l
            if (calcX > 0) {
                this.transformPosition('r');
            } else {
                this.transformPosition('l');
            }
        } else {
            // t-b
            if(calcY > 0) {
                this.transformPosition('t');
            } else {
                this.transformPosition('b');
            }
        }
    }
    
    transformPosition(side) {
        switch (side) {
            case 't':
                
                break;
            
            case 'b':
                break
            
            case 'r':
    
                break;
            default:

                break;
        }
    }
}