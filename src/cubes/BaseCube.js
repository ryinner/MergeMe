export class BaseCube {
    constructor(baseEl) {
        this.app = baseEl
    }

    render() {
        let cube = document.createElement('div')
        cube.classList.add('cube')
        cube.style.background = this.randomColor()

        this.app.append(cube)
    }

    randomColor() {
        const colors = [
            '#fff',
            '#000',
        ]

        return colors[Math.floor(Math.random() * colors.length)]
    }
}