import { BaseCube } from "./BaseCube.js";
import { random, duoRandom } from "../helpers/baseHelper.js";
export class Game {
    GameBoard = [
        [0, new BaseCube(2, 1, duoRandom(2,4)), 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, new BaseCube(5, 3, duoRandom(2,4))],
        [0, 0, 0, 0, new BaseCube(5, 4, duoRandom(2,4))],
        [0, 0, 0, 0, 0],
    ];
    app = document.querySelector('#app');

    createFirstCube() {
        const x = random(1, 5)
        const y = random(1, 5)
        this.GameBoard[x-1][y-1] = new BaseCube(x, y, duoRandom(2,4));
        this.GameBoard[x-1][y-1].render()
    }

    render () {
        const style = document.createElement('style')
        let classes = ''

        for (let x = 0; x < this.GameBoard.length; x++) {
            for(let y = 0; y < this.GameBoard[x].length; y++) {
                classes += `.cube-${x+1}-${y+1}{grid-area: ${y+1}/${x+1}; transition: all 0.5s ease-out;}`
                if ((this.GameBoard[x][y] instanceof BaseCube)) {
                    this.GameBoard[x][y].render()
                }
            }
        }

        style.innerHTML = classes
        document.querySelector('head').append(style)

        // this.createFirstCube();
        this.swipe()
    }

    swipe() {
        let touch = {};
        app.addEventListener('mousedown', (event) => {
            touch = { 
                x: event.clientX,
                y: event.clientY,
            };
        });
    
        app.addEventListener('mouseup', (event) => {
            let touchMove = { 
                x: event.clientX,
                y: event.clientY,
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
                this.transformPosition('left');
            } else {
                this.transformPosition('right');
            }
        } else if (Math.abs(calcY) > Math.abs(calcX)) {
            // t-b
            if(calcY > 0) {
                this.transformPosition('top');
            } else {
                this.transformPosition('bottom');
            }
        }
    }
    
    transformPosition(side) {
        switch (side) {
            case 'top':
                this.helpTransform(false, false)
                break;
            
            case 'bottom':
                break
            
            case 'right':
    
                break;
            case 'left':

                break;
        }
    }

    helpTransform(isLeftRight,isMinus) {
        for (let y = 0; y < this.GameBoard.length; y++) {
            let coords = []
            for (let x = 0; x < this.GameBoard[y].length; x++) {
                if (!(this.GameBoard[x][y] instanceof BaseCube)) {
                    coords.push(x);
                    continue
                } else if (this.GameBoard[x][y].coords.y !== 1) {
                    const newCubePos = this.GameBoard[x][y].coords = [this.GameBoard[x][y].coords.x, (coords[0])+1]
                    this.GameBoard[x][y] = 0
                    this.GameBoard[x][(coords[0])] = newCubePos

                    coords.splice(0, 1, y);
                    coords.sort((a, b) => { return a-b })
                }
            }
        }
    }
}