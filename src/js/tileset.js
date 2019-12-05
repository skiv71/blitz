class Tileset {

    constructor() {
        this.tiles = new Map()
    }

    _init() {
        var image = new Image()
        image.src = this.src
        this.image = image
    }

    image(src) {
        console.log('image', src)
        return new Promise((resolve, reject) => {
            var image = new Image()
            image.src = src
            image.onload = () => {
                resolve(this)
                this.image = image
            }
            image.onerror = (e) => {
                reject(e)
            }
        })
    }

    define(name, x, y, width, height) {
        this.tiles.set(name, { x, y, width, height })
        return this
    }

    tile(name) {
        return this.tiles.get(name)
    }

}

export default Tileset