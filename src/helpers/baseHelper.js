export function random(min, max) {
    return Math.floor(Math.random() * (max+1-min) + min)
}

export function duoRandom(min, max) {
    let rand = random(min, max)
    if (rand % 2 === 1) {
        rand--;
    }

    return rand
}