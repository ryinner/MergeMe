export class BaseCube {
    constructor(baseEl) {
        this.app = baseEl
    }

    render() {
        this.cube = document.createElement('div')
        this.cube.classList.add('cube')
        this.cube.style.background = this.randomColor()

        this.app.append(this.cube)

        this.swipe()
    }

    randomColor() {
        const colors = [
            '#fff',
            '#000',
        ]

        return colors[Math.floor(Math.random() * colors.length)]
    }

    swipe() {
        let touch = {}
        this.cube.addEventListener('touchstart', (event) => {
            touch = { 
                x: event.changedTouches[0].clientX,
                y: event.changedTouches[0].clientY,
            }
        })

        this.cube.addEventListener('touchmove', (event) => {
            let touchMove = { 
                x: event.changedTouches[0].clientX,
                y: event.changedTouches[0].clientY,
            }

            const calcX = touch.x - touchMove.x
            const calcY = touch.y - touchMove.y

            this.calculateChangeOfPosition(calcX, calcY)
        })
    }

    calculateChangeOfPosition(calcX, calcY) {
        if (Math.abs(calcX) > Math.abs(calcY)) {
            // r-l
            if (calcX > 0) {
                console.log('r');
            } else {
                console.log('l');
            }
        } else {
            // t-b
            if(calcY > 0) {
                console.log('t');
            } else {
                console.log('b');
            }
        }
    }

    transform() {
        
    }
}