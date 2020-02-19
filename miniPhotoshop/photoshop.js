class Photoshop{
    constructor(canvasId){
        this.brushShape = 'round'
        this.brushSize = '15px'
        this.brushColor = 'yellow'
        this.setCanvas(canvasId)
        
    }
    setBrushShape(shape){
        this.brushShape = shape
    }
    setBrushSize(size){
        this.brushSize = size
    }
    setBrushColor(color){
        this.brushColor = color
    }
    setCanvas(canvasId){
        this.canvasConfig = {
            top: 100,
            left: 0
        }
    }
}