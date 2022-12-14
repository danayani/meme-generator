
var gElCanvas
var gCtx

function initMeme() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    console.log(gCtx);
    resizeCanvas()

    //go togther, first bc img and then the other elements
    drawImg('img/1.jpg')
    renderMeme()
}

function renderMeme(){
    
   drawText('hi',100,100) 
}

function drawImg(srcImg) {
    const elImg = new Image() // Create a new html img element
    elImg.src = srcImg// Send a network req to get that image, define the img src
    
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        renderMeme()
    }

}
function drawText(text, x = 5, y = 5) {
    console.log(text)
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'white'
    gCtx.fillStyle = 'white'
    gCtx.font = "40px arial";
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth - 10
}