export class BaseCube {
    constructor(baseEl) {
        this.app = baseEl
    }

    render() {
        let cube = document.createElement('div')
        cube.classList.add('cube')

        this.app.append(cube)
    }
}