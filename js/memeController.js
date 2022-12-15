'use strict'

var gElCanvas
var gCtx
var gImg

function initMeme() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    addListeners()
    resizeCanvas()
    
    gImg ='img/1.jpg'
    
}

function addListeners() {
    // addMouseListeners()
    // addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
}

function renderMeme() {
    // console.log('renderMeme')
    drawImg(gImg)
}

function onAddTxt(){
    var txt = document.getElementById('txt-user').value
    
    setLineTxt(txt) //added to service
    drawText(getLastLine())
    document.getElementById('txt-user').value = '' //clean text area
}

//TODO: set img from here, rander is to reopen, afer set img to ser lines
function setImg(imgSrc) {
    gImg = imgSrc
}

function drawImg() {
    const elImg = new Image() // Create a new html img element
    elImg.src = gImg // Send a network req to get that image, define the img src

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

function getCanvas(){
    return gElCanvas
}