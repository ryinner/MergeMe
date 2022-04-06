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

export function sort(array ,isMinus) {
    if (isMinus == true) {
        array.sort((a, b) => { return b-a })
    } else {
        array.sort((a, b) => { return a-b })
    }
}