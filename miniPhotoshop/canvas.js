document.addEventListener('DOMContentLoaded', appStart)

var imageLoader
let canvas
let ctx
let brushsize
let brushout
let brushcolor
let brushCircleClass
let brushSquareClass
let isMouseDown
let currentBrushSize
let currentBrushColor
let currentBrushShape
let linesArray

function appStart(){
    const ps = new Photoshop('canvas');

    imageLoader = document.getElementById('imageLoader')
        imageLoader.addEventListener('change', handleImage, false)
    
    canvas = document.querySelector('#canvas')
    brushCircleClass = document.querySelector('.circle-brush-btn')
    brushSquareClass = document.querySelector('.square-brush-btn')
    brushout = document.querySelector('#brushsizeout')
    brushsize = document.querySelector('#sizeBrush')
    brushcolor = document.querySelector('#brushcolor')
    isMouseDown = false;
    currentBrushShape = 'round'
    document.querySelector('#circleBrush')
        .addEventListener('click', () => {
            ps.setBrushShape('round')
            currentBrushShape = 'round'
        }) 

    document.querySelector('#squareBrush')
        .addEventListener('click', () => {
            ps.setBrushShape('square')
            currentBrushShape = 'square'
        })
    document
        .querySelector('#darken')
        .addEventListener('click',() => darkenImage())
    brushsize.addEventListener('mouseup',function(){
        brushout.innerHTML = brushsize.value
        ps.setBrushSize(brushsize.value)
        
    })
    
    brushcolor.addEventListener('change',function(){
        ps.setBrushColor(brushcolor.value)
        brushCircleClass.style.background = brushcolor.value
        brushSquareClass.style.background = brushcolor.value
    })
    canvas.addEventListener('mousedown', function(){mousedown(canvas,event)})
    canvas.addEventListener('mousemove',function(){mousemove(canvas,event)})
    canvas.addEventListener('mouseup',mouseup)
    brushsize.value = 15
    brushout.innerHTML = brushsize.value
    brushcolor.value = 'yellow';
    brushCircleClass.style.background = brushcolor.value
    brushSquareClass.style.background = brushcolor.value
    ctx = canvas.getContext('2d')
}
function handleImage(e){
    var reader = new FileReader()
    reader.onload = function(event){
        var image = new Image()
        image.onload = function(){
            canvas.width = 1200
            canvas.height = 900
            ctx.drawImage(image,0,0)
        }
        image.src = event.target.result
    }
    reader.readAsDataURL(e.target.files[0])
    
}
function darkenImage(amount = 80){
    const canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height)


    for(let i = 0; i<canvasData.data.length; i++){
        canvasData.data[i] -= amount
    }
    
    ctx.putImageData(canvasData,0,0)
}
function getMousePos(canvas,e){
    
    var rect = canvas.getBoundingClientRect()
    scaleX = canvas.width / rect.width,   
      scaleY = canvas.height / rect.height;  
    return{
        x: (e.clientX- rect.left)*scaleX,
        y: (e.clientY - rect.top)*scaleY

    }
}
function mousedown(canvas,e){
    let mousePos = getMousePos(canvas,e)
    isMouseDown = true
    let currentPos = getMousePos(canvas, e)
    ctx.moveTo(currentPos.x,currentPos.y)
    ctx.beginPath()
    ctx.lineWidth = brushsize.value
    ctx.lineCap = currentBrushShape
    ctx.strokeStyle = brushcolor.value
}
function mousemove(canvas,e){
    if(isMouseDown){
        let currentPos = getMousePos(canvas, e)
        ctx.lineTo(currentPos.x,currentPos.y)
        ctx.stroke();
    }
}

function mouseup(){
    isMouseDown=false

}