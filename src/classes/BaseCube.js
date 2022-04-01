export class BaseCube {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.value = 0
    }

    app = document.querySelector('#app');

    render() {
        this.cube = document.createElement('div');
        this.cube.classList.add('cube');

        this.app.append(this.cube);
    }

    changeCube() {
        this.cube.style.gridArea = this.x + ' / ' + this.y
        this.cube.style.background = this.tookColor();
        this.cube.innerHTML = this.value;
    }

    tookColor() {
        const colors = {
            2: '#fafafa',
            4: '#faf',
            8: '#fdf'
        };

        return colors[this.value];
    }

    set score(value) {
        this.value = value;
        this.render();
        this.changeCube();
    }

    get score() {
        return this.value;
    }
}