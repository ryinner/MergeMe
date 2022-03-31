import { BaseCube } from "./cubes/BaseCube.js"

const APP = document.querySelector('#app')

const cube = new BaseCube(APP)

// 144 куба максимум
let i = 0
while (i < 144) {
    cube.render()
    i++
}
