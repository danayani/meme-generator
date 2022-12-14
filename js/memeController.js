
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

function renderMeme() {
    var currMeme = getMeme()
    console.log(currMeme.lines[0].txt)

    drawText(currMeme.lines[0])
}

function drawImg(srcImg) {
    const elImg = new Image() // Create a new html img element
    elImg.src = srcImg// Send a network req to get that image, define the img src

    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        renderMeme()
    }

}
function drawText(currMeme) {
    var { txt, size, align, color, x, y } = currMeme
    console.log(txt)
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'white'
    gCtx.fillStyle = 'color'
    gCtx.font = `${size}px arial`
    gCtx.textAlign = align
    gCtx.textBaseline = 'middle'

    gCtx.fillText(txt, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(txt, x, y) // Draws (strokes) a given text at the given (x, y) position.
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth - 10
}