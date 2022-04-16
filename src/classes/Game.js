import { BaseCube } from "./BaseCube.js";
import { random, duoRandom, sort } from "../helpers/baseHelper.js";
export class Game {
    GameBoard;

    app = document.querySelector('#app');

    baseScore = 0;
    
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

    updateScore() {
        const scoreDiv = document.getElementById('score');
        scoreDiv.innerHTML = this.baseScore;
    }

    init() {
        this.render();
        this.createClasses();
        this.swipe();
    }

    render() {
        this.baseScore = 0;

        this.GameBoard = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ];

        app.innerHTML = '';
        this.updateScore();
        this.newCube(2);
    }

    createClasses() {
        const style = document.createElement('style');
        let classes = '';

        for (let x = 0; x < this.GameBoard.length; x++) {
            for (let y = 0; y < this.GameBoard[x].length; y++) {
                classes += `.cube-${x + 1}-${y + 1}{grid-area: ${y + 1}/${x + 1}; transition: all 0.5s ease-out;}`;
            }
        }

        style.innerHTML = classes
        document.querySelector('head').append(style)
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

        app.addEventListener('touchstart', (event) => {
            touch = {
                x: event.changedTouches[0].clientX,
                y: event.changedTouches[0].clientY,
            };
        });

        app.addEventListener('touchend', (event) => {
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
                this.helpTransform('top')
                break;

            case 'bottom':
                this.helpTransform('bottom')
                break

            case 'right':
                this.helpTransform('right')
                break;

            case 'left':
                this.helpTransform('left')
                break;
        }
    }

    helpTransform(code) {
        let movement = 0;
        switch (code) {
            case 'top':
                for (let y = 0; y < this.GameBoard.length; y++) {
                    let coords = []
                    for (let x = 0; x < this.GameBoard[y].length; x++) {
                        if (!(this.GameBoard[x][y] instanceof BaseCube)) {
                            coords.push(x);
                        } else if (coords.length !== 0) {
                            sort(coords, false);
    
    
                            this.GameBoard[x][y].coords = [this.GameBoard[x][y].coords.x, (coords[0]) + 1];
                            const newCubePos = this.GameBoard[x][y];
    
                            this.GameBoard[(coords[0])][this.GameBoard[x][y].coords.x - 1] = newCubePos;
                            this.GameBoard[x][y] = 0;
                            
                            coords.splice(0, 1, x);

                            this.tryMerge(newCubePos, code);
                            movement++;
                        } else {
                            if (this.tryMerge(this.GameBoard[x][y], code)) {
                                coords.push(x);
                                movement++;
                            }
                        }
                    }
                }
                break;
            case 'bottom': 
                for (let y = this.GameBoard.length - 1; y >= 0; y--) {
                    let coords = []
                    for (let x = this.GameBoard[y].length - 1; x >= 0; x--) {
                        if (!(this.GameBoard[x][y] instanceof BaseCube)) {
                            coords.push(x);
                        } else if (coords.length !== 0) {
                            sort(coords, true);

                            this.GameBoard[x][y].coords = [this.GameBoard[x][y].coords.x, (coords[0]) + 1];
                            const newCubePos = this.GameBoard[x][y];

                            this.GameBoard[(coords[0])][this.GameBoard[x][y].coords.x - 1] = newCubePos;
                            this.GameBoard[x][y] = 0;

                            coords.splice(0, 1, x);

                            this.tryMerge(newCubePos, code);
                            movement++;
                        } else {
                            if (this.tryMerge(this.GameBoard[x][y], code)) {
                                coords.push(x);
                                movement++;
                            }
                        }
                    }
                }
                break;
            case 'right':
                for (let x = this.GameBoard.length-1; x >= 0; x--) {
                    let coords = []
                    for (let y = this.GameBoard.length-1; y >= 0; y--) {
                        if (!(this.GameBoard[x][y] instanceof BaseCube)) {
                            coords.push(y);
                        } else if (coords.length !== 0) {
                            sort(coords, true);
    
                            this.GameBoard[x][y].coords = [coords[0] + 1, this.GameBoard[x][y].coords.y];
                            const newCubePos = this.GameBoard[x][y];
    
                            this.GameBoard[this.GameBoard[x][y].coords.y - 1][(coords[0])] = newCubePos;
                            this.GameBoard[x][y] = 0;
    
                            coords.splice(0, 1, y);;

                            this.tryMerge(newCubePos, code);
                            movement++;
                        } else {
                            if (this.tryMerge(this.GameBoard[x][y], code)) {
                                coords.push(y);
                                movement++;
                            }
                        }
                    }
                }
                break;
            case 'left':
                for (let x = 0; x < this.GameBoard.length; x++) {
                    let coords = []
                    for (let y = 0; y < this.GameBoard[x].length; y++) {
                        if (!(this.GameBoard[x][y] instanceof BaseCube)) {
                            coords.push(y);
                        } else if (coords.length !== 0) {
                            sort(coords, false);
    
                            this.GameBoard[x][y].coords = [coords[0] + 1, this.GameBoard[x][y].coords.y];
                            const newCubePos = this.GameBoard[x][y];
    
                            this.GameBoard[this.GameBoard[x][y].coords.y - 1][(coords[0])] = newCubePos;
                            this.GameBoard[x][y] = 0;
    
                            coords.splice(0, 1, y);
    
                            this.tryMerge(newCubePos, code);
                            movement++;
                        } else {
                            if (this.tryMerge(this.GameBoard[x][y], code)) {
                                coords.push(y);
                                movement++;
                            }
                        }
                    }
                }
                break;
        }

        if (movement > 0) {
            this.newCube(1)
        }
    }

    tryMerge(cubePos, code) {
        let start;

        switch (code) {
            case 'top':
                start = (cubePos.coords.y)-1;

                while (start > 0) {
                        let xMergePosition = cubePos.coords.x-1;
                        let yMergePosition = cubePos.coords.y-2;
                        
                        if (this.GameBoard[yMergePosition][xMergePosition] instanceof BaseCube) {
                            if (this.GameBoard[yMergePosition][xMergePosition].score == cubePos.score) {
                                this.GameBoard[yMergePosition][xMergePosition].score += cubePos.score;
                                this.destroyCube(cubePos.coords.y-1, cubePos.coords.x-1)
                                this.baseScore += this.GameBoard[yMergePosition][xMergePosition].score
                                this.updateScore();
                                return true;
                            }
                        }
                    start--;
                }
                break;
            
            case 'bottom':
                start = (cubePos.coords.y)-1;
                while (start < this.GameBoard.length) {
                    
                        let xMergePosition = cubePos.coords.x-1;
                        let yMergePosition = cubePos.coords.y;
                        if (yMergePosition < this.GameBoard.length) {
                            if (this.GameBoard[yMergePosition][xMergePosition] instanceof BaseCube) {
                                if (this.GameBoard[yMergePosition][xMergePosition].score == cubePos.score) {
                                    this.GameBoard[yMergePosition][xMergePosition].score += cubePos.score;
                                    this.destroyCube(cubePos.coords.y-1, cubePos.coords.x-1)
                                    this.baseScore += this.GameBoard[yMergePosition][xMergePosition].score
                                    this.updateScore();
                                    return true;
                                }
                            }
                        }
                    start++;
                }
                break;

            case 'left':
                start = (cubePos.coords.x)-1;
                while (start > 0) {
                        let xMergePosition = cubePos.coords.x-2;
                        let yMergePosition = cubePos.coords.y-1;
            
                        if (this.GameBoard[yMergePosition][xMergePosition] instanceof BaseCube) {
                            if (this.GameBoard[yMergePosition][xMergePosition].score == cubePos.score) {
                                this.GameBoard[yMergePosition][xMergePosition].score += cubePos.score;
                                this.destroyCube(cubePos.coords.y-1, cubePos.coords.x-1)
                                this.baseScore += this.GameBoard[yMergePosition][xMergePosition].score
                                this.updateScore();
                                return true;
                            }
                        }
                    start--;
                }
                break;

            case 'right':
                start = (cubePos.coords.x)-1;
                while (start < this.GameBoard.length) {
                    
                        let xMergePosition = cubePos.coords.x;
                        let yMergePosition = cubePos.coords.y-1;
                        if (xMergePosition < this.GameBoard.length) {
                            if (this.GameBoard[yMergePosition][xMergePosition] instanceof BaseCube) {
                                if (this.GameBoard[yMergePosition][xMergePosition].score == cubePos.score) {
                                    this.GameBoard[yMergePosition][xMergePosition].score += cubePos.score;
                                    this.destroyCube(cubePos.coords.y-1, cubePos.coords.x-1)
                                    this.baseScore += this.GameBoard[yMergePosition][xMergePosition].score
                                    this.updateScore();
                                    return true;
                                }
                            }
                        }
                    start++;
                }
                break;
        }
    }

    destroyCube(x, y) {
        this.GameBoard[x][y].destroy();
        this.GameBoard[x][y] = 0;
    }
}