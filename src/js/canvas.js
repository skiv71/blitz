class Canvas {
    
    constructor(elementId, width, height, background) {
        this.elementId = elementId
        this.width = width
        this.height = height
        this.background = background
    }

    get context() {
        if (this._context)
            return this._context
        if (!this.elementId)
            throw new Error(`Error creating canvas instance, elementId is required!`)
        this._canvas = document.getElementById(this.elementId)
        this._context = this._canvas.getContext('2d')
        return this._context
    }

    draw() {
        var { background, context, width, height } = this
        context.fillStyle = background
        context.fillRect(0, 0, width, height)
        return this
    }

}

export default Canvas