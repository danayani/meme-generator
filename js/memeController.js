'use strict'

var gElCanvas
var gCtx

function initMeme() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')

    resizeCanvas()
    //go togther, first bc img and then the other elements
    drawImg('img/1.jpg')
    renderMeme()
}

function renderMeme(imgSrc) {
    console.log('renderMeme')
    drawImg(imgSrc)
}

//TODO: set img from here, rander is to reopen, afer set img to ser lines
function setImg(){

}

function drawImg(imgSrc) {
    console.log(imgSrc)
    const elImg = new Image() // Create a new html img element
    elImg.src = imgSrc // Send a network req to get that image, define the img src
    
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        // renderMeme()
    }

}

function drawText(currMeme) {
    var { txt, size, align, color, x, y } = currMeme
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'white'
    gCtx.fillStyle = color
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