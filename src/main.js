import { BaseCube } from "./cubes/BaseCube.js"

const APP = document.querySelector('#app')
const CANVAS = document.querySelector('#canvas')

const cube = new BaseCube(APP)
const cube2 = new BaseCube(CANVAS)
// 144 куба максимум
let i = 0
while (i < 144) {
    cube.render()
    i++
}
