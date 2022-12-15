'use strict'

var gElCanvas
var gCtx
var gImg

function initMeme() {
    gImg = 'img/1.jpg'//default

    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    addListeners()
    resizeCanvas()



}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
}
function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}
function renderMeme() {
    // console.log('renderMeme')
    drawImg(gImg) //going after to render lines
}

function renderLines() {//come after renderMeme (load img)
    const meme = getMeme()
    meme.lines.forEach(line => {
        drawText(line)
    })
}

function onAddTxt() {
    var txt = document.getElementById('txt-user').value

    setLineTxt(txt) //added to service
    console.log(getLastLine())
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
        renderLines()
    }
}

function drawImgFromUser(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function drawText(currLine) {
    var { txt, size, align, color, x, y } = currLine
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

function getCanvas() {
    return gElCanvas
}

//moving object / drag & drop
var gStartPos
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function onDown(ev) {
    console.log('onDown()')

    //check if i click on a line
    const pos = getEvPos(ev) // {x: , y: }
    const currLineIdx = whichLineClicked(pos)
    if (currLineIdx === -1) return
    console.log('Line Clicked!')

    //change bool 'isDrag'
    setSelectLine(currLineIdx) //set line on service
    setLineDrag(true) // change line status
    gStartPos = pos

    //TODO: taggle class(change apperance)

}

function onUp(ev) {
    console.log('onUp()')

    //change bool 'isDrag' 
    setLineDrag(false)

    var pos = getEvPos(ev) // {x: , y: }
    const meme = getMeme()

    const selectedLine = meme.lines[meme.selectedLineIdx]
    if (!selectedLine) return

    // remove class(change apperance)

}

function onMove(ev) {
    const meme = getMeme()

    //if there is a lineSaved, and isDrag true, need to change the line pos
    const selectedLine = meme.lines[meme.selectedLineIdx]
    if (selectedLine && selectedLine.isDrag) {
        const pos = getEvPos(ev) //curr position
        const dx = pos.x - gStartPos.x //distance
        const dy = pos.y - gStartPos.y //distance

        moveLine(dx, dy) //change the line pos in gMeme
        renderMeme() // change pos on the canvas
        gStartPos = pos
    }
}

function moveLine(dx, dy) {
    const selectedLine = gMeme.lines[gMeme.selectedLineIdx]
    selectedLine.x += dx
    selectedLine.y += dy
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function whichLineClicked(clickedPos) {
    // console.log('in')
    gCtx.save()
    const currLine = getMeme().lines.findIndex(line => {
        // console.log('line', line)
        const lineMetrics = gCtx.measureText(line.txt)
        // console.log('lineMetrics', lineMetrics)
        var { x, y } = line
        // console.log('{ x, y }', x, y)
        return (clickedPos.x > x - lineMetrics.actualBoundingBoxLeft && clickedPos.x < x + lineMetrics.actualBoundingBoxRight &&
            clickedPos.y > y - lineMetrics.actualBoundingBoxDescent && clickedPos.y < y + lineMetrics.actualBoundingBoxAscent)
    })
    gCtx.restore()
    return currLine;
}




