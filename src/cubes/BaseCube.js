export class BaseCube {
    constructor(baseEl) {
        this.app = baseEl
    }

    render() {
        this.cube = document.createElement('div')
        this.cube.classList.add('cube')
        this.cube.style.background = this.randomColor()

        this.app.append(this.cube)
    }

    randomColor() {
        const colors = [
            '#fff',
            '#000',
        ]

        return colors[Math.floor(Math.random() * colors.length)]
    }

    // swipe() {
    //     this.cube.addEventListener('mousemove', (event) => {
    //         console.log(event.movementX)
    //         console.log(event.movementY)
    //     })
    // }
}