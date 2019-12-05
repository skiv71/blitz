class Canvas {
    
    constructor(elementId, width, height, background) {
        this.elementId = elementId
        this.width = width
        this.height = height
        this.background = background
        this.tilesets = new Map()
    }

    get context() {
        if (this._context)
            return this._context
        if (!this.elementId)
            throw new Error(`Error creating canvas instance, elementId is required!`)
        var canvas = document.getElementById(this.elementId)
        canvas.width = this.width
        canvas.height = this.height
        this._context = canvas.getContext('2d')
        this._canvas = canvas
        return this.context
    }

    blocks(list) {
        console.log('buildings...')
        console.log(list)
    }

    draw() {
        console.log('draw')
        var { background, context, width, height } = this
        context.fillStyle = background
        context.fillRect(0, 0, width, height)
        return this
    }

    coords(tile, coords, offset = [0, 0]) {
        var [x, y] = coords
        var [ox, oy] = offset
//        console.log
        var { width, height } = this
        var dx = x + ox
        var dy = height - y - tile.height - oy
        return { dx, dy }
    }

    render(tilesetName, tileName, list, offset) {
        console.log(coords)
        var { context, tilesets } = this
        var tileset = tilesets.get(tilesetName)
        var tile = tileset.tile(tileName)
        //var list = Array.isArray(coords) ? coords.slice() : [coords]
        for (var coords of list) {
            var { dx, dy } = this.coords(tile, coords, offset)
            console.log({ dx, dy })
            context
                .drawImage(tileset.image, tile.x, tile.y, tile.width, tile.height, dx, dy, tile.width, tile.height)
    
        }
    }

    tileset(name, tileset) {
        this.tilesets.set(name, tileset)
        return this
    }

}

export default Canvas