export class BaseCube {
    constructor(value) {
        this.value = value;
    }

    app = document.querySelector('#app');

    render() {
        this.cube = document.createElement('div');
        this.cube.classList.add('cube');

        if (this.value !== 0) {
            this.cube.style.background = this.tookColor();
            this.cube.innerHTML = this.value;
            this.swipe();
        }

        this.app.append(this.cube);
    }

    tookColor() {
        const colors = {
            2: '#fafafa',
            4: '#faf',
            8: '#fdf'
        };

        return colors[this.value];
    }

    swipe() {
        let touch = {};
        this.cube.addEventListener('touchstart', (event) => {
            touch = { 
                x: event.changedTouches[0].clientX,
                y: event.changedTouches[0].clientY,
            };
        });

        this.cube.addEventListener('touchmove', (event) => {
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
                this.cube.style.gridArea = ''
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