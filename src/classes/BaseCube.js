export class BaseCube {
    constructor(x, y, value) {
        this.x = x
        this.y = y
        this.value = value
    }

    app = document.querySelector('#app');

    render() {
        this.cube = document.createElement('div');
        this.cube.classList.add('cube');

        this.app.append(this.cube);
        this.changeCube();
    }

    changeCube() {
        this.cube.classList = `cube cube-${this.x}-${this.y}`
        this.cube.style.background = this.tookColor();
        this.cube.innerHTML = this.value;
    }

    tookColor() {
        const colors = {
            2: '#fafafa',
            4: '#faf',
            8: '#fdf',
            16: '#A648A6',
            32: '#7149A6',
            64: '#FFE6ED',
            128: '#F1FFE6',
            256: '#72A648',
            512: '#FCFFEC'
        };

        return colors[this.value];
    }

    destroy() {
        this.cube.remove();
    }

    set score(value) {
        this.value = value;
        this.changeCube();
    }

    set coords(coords) {
        this.x = coords[0];
        this.y = coords[1];
        this.changeCube();
    }

    get coords() {
        return {x: this.x, y: this.y};
    }

    get score() {
        return this.value;
    }
}