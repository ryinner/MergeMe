import { BaseCube } from "./BaseCube.js";
import { random, duoRandom, sort } from "../helpers/baseHelper.js";
export class Game {
    GameBoard;

    app = document.querySelector('#app');

    newCube(count) {
        let i = 0;
        while (i < count) {
            const x = random(1, 5)
            const y = random(1, 5)

            if (this.GameBoard[y-1][x-1] == 0) {
                this.GameBoard[y-1][x-1] = new BaseCube(x, y, duoRandom(2, 4));
                this.GameBoard[y-1][x-1].render()
                i++
            }
        }
    }

    render() {
        const style = document.createElement('style');
        let classes = '';

        this.GameBoard = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ];

        for (let x = 0; x < this.GameBoard.length; x++) {
            for (let y = 0; y < this.GameBoard[x].length; y++) {
                classes += `.cube-${x + 1}-${y + 1}{grid-area: ${y + 1}/${x + 1}; transition: all 0.5s ease-out;}`;
                if ((this.GameBoard[x][y] instanceof BaseCube)) {
                    this.GameBoard[x][y].render();
                }
            }
        }

        style.innerHTML = classes
        document.querySelector('head').append(style)

        this.newCube(2)
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
            if (calcY > 0) {
                this.transformPosition('top');
            } else {
                this.transformPosition('bottom');
            }
        }
    }

    transformPosition(side) {
        switch (side) {
            case 'top':
                console.log('top');
                this.helpTransform(false, false)
                break;

            case 'bottom':
                console.log('bottom');
                this.helpTransform(false, true)
                break

            case 'right':
                console.log('right');
                this.helpTransform(true, true)
                break;

            case 'left':
                console.log('left');
                this.helpTransform(true, false)
                break;
        }
    }

    helpTransform(isLeftRight, isMinus) {
        let movement = 0;
        if (isLeftRight === false && isMinus === false) {
            for (let y = 0; y < this.GameBoard.length; y++) {
                let coords = []
                for (let x = 0; x < this.GameBoard[y].length; x++) {
                    if (!(this.GameBoard[x][y] instanceof BaseCube)) {
                        coords.push(x);
                    } else if (coords.length !== 0) {
                        sort(coords, isMinus)


                        this.GameBoard[x][y].coords = [this.GameBoard[x][y].coords.x, (coords[0]) + 1]
                        const newCubePos = this.GameBoard[x][y]

                        this.GameBoard[(coords[0])][this.GameBoard[x][y].coords.x - 1] = newCubePos
                        this.GameBoard[x][y] = 0

                        coords.splice(0, 1, x);
                        movement++;
                    }
                }
            }
        } else if (isLeftRight === false && isMinus === true) {
            for (let y = this.GameBoard.length - 1; y >= 0; y--) {
                let coords = []
                for (let x = this.GameBoard[y].length - 1; x >= 0; x--) {
                    if (!(this.GameBoard[x][y] instanceof BaseCube)) {
                        coords.push(x);
                    } else if (coords.length !== 0) {
                        sort(coords, isMinus)

                        this.GameBoard[x][y].coords = [this.GameBoard[x][y].coords.x, (coords[0]) + 1]
                        const newCubePos = this.GameBoard[x][y]

                        this.GameBoard[(coords[0])][this.GameBoard[x][y].coords.x - 1] = newCubePos
                        this.GameBoard[x][y] = 0

                        coords.splice(0, 1, x);
                        movement++;
                    }
                }
            }
        } else if (isLeftRight === true && isMinus === false) {
            for (let x = 0; x < this.GameBoard.length; x++) {
                let coords = []
                for (let y = 0; y < this.GameBoard[x].length; y++) {
                    if (!(this.GameBoard[x][y] instanceof BaseCube)) {
                        coords.push(y);
                    } else if (coords.length !== 0) {
                        sort(coords, isMinus)

                        this.GameBoard[x][y].coords = [coords[0] + 1, this.GameBoard[x][y].coords.y]
                        const newCubePos = this.GameBoard[x][y]

                        this.GameBoard[this.GameBoard[x][y].coords.y - 1][(coords[0])] = newCubePos
                        this.GameBoard[x][y] = 0

                        coords.splice(0, 1, y);

                        this.tryMerge(newCubePos)
                        movement++;
                    } else {
                        if (this.tryMerge(this.GameBoard[x][y])) {
                            coords.push(y);
                            movement++;
                        }
                    }
                }
            }
        } else if (isLeftRight === true && isMinus === true) {
            for (let x = this.GameBoard.length-1; x >= 0; x--) {
                let coords = []
                for (let y = this.GameBoard.length-1; y >= 0; y--) {
                    if (!(this.GameBoard[x][y] instanceof BaseCube)) {
                        coords.push(y);
                    } else if (coords.length !== 0) {
                        sort(coords, isMinus)

                        this.GameBoard[x][y].coords = [coords[0] + 1, this.GameBoard[x][y].coords.y]
                        const newCubePos = this.GameBoard[x][y]

                        this.GameBoard[this.GameBoard[x][y].coords.y - 1][(coords[0])] = newCubePos
                        this.GameBoard[x][y] = 0

                        coords.splice(0, 1, y);
                        movement++;
                    }
                }
            }
        }

        if (movement > 0) {
            this.newCube(1)
        }
    }

    tryMerge(cubePos) {
        let start = (cubePos.coords.x)-1
        while (start > 0) {
            if ( start > 0) {
                let xMergePosition = cubePos.coords.x-2;
                let yMergePosition = cubePos.coords.y-1;
    
                if (this.GameBoard[yMergePosition][xMergePosition] instanceof BaseCube) {
                    if (this.GameBoard[yMergePosition][xMergePosition].score == cubePos.score) {
                        this.GameBoard[yMergePosition][xMergePosition].score += cubePos.score;
                        this.destroyCube(cubePos.coords.y-1, cubePos.coords.x-1)
                        return true;
                    }
                }
            }
            start--;
        }
    }

    destroyCube(x, y) {
        this.GameBoard[x][y].destroy();
        this.GameBoard[x][y] = 0;
    }
}