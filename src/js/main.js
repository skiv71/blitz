import { random } from '@skivy71/utils'
import Canvas from './canvas'
import Tileset from './tileset'
import tilesheet from '../img/tilesheet.png'

async function main() {
    try {
        var tileset = new Tileset()
        
        await tileset.image(tilesheet)
        tileset.define('brick', 0, 0, 32, 32)
        
        var canvas = new Canvas('canvas', 800, 600, 'black')
        
        canvas.tileset('main', tileset)
        
        canvas.draw()
        
        canvas.render('main', 'brick', [
            [0, 0],
            [0, 32],
            [0, 64],
            [0, 96]
        ], [10, 10])
        
    } catch(e) {
        console.log(e)
    }    
}

main()

//canvas.blocks(Array(10).fill(0).map(i => random.number(1, 12)))

//canvas.draw()