'use strict'

var gElCanvas
var gCtx
var gImg

function initMeme() {
    gImg ='img/1.jpg'//default

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

function drawImgFromUser(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
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

//moving object / drag & drop
var gStartPos
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function onDown(ev) {
    console.log('onDown()')
    console.log(getEvPos(ev))
    //TODO : check if i click on a line
     //TODO: change bool 'isDrag' & remove class(change apperance)

    // const pos = getEvPos(ev)
    // const selectedLineIdx = whichLineClicked(pos)

    // if (selectedLineIdx === -1) return

    // switchLine(selectedLineIdx)
    // console.log('Line Clicked!')
    // setLineDrag(true)
    // gStartPos = pos

    // document.body.style.cursor = 'move'
    // renderMeme()

}

function onUp() {
    console.log('onUp()')
    console.log(getEvPos(ev))
    //TODO: change bool 'isDrag' & remove class(change apperance)
    // setLineDrag(false)

    const meme = getMeme()

    // const selectedLine = meme.lines[meme.selectedLineIdx]
    // if (!selectedLine) return


    // document.body.style.cursor = 'default'
}

function onMove(ev) {
    console.log('onMove()')
    console.log(getEvPos(ev))
    const meme = getMeme()

    //TODO : is there is a lineSaved, and isDrag true, need to change the line pos

    // const selectedLine = meme.lines[meme.selectedLineIdx]
    // if (selectedLine && selectedLine.isDrag) {
    //     const pos = getEvPos(ev)
    //     const dx = pos.x - gStartPos.x
    //     const dy = pos.y - gStartPos.y
    //     moveLine(dx, dy)
    //     gStartPos = pos
    //     renderMeme()
    // }
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
    gCtx.save()
    const selectedLineIdx = getMeme().lines.findIndex(line => {
        const lineMetrics = gCtx.measureText(line.txt);
        var {x, y} = getMeme().lines
        return (clickedPos.x > pos.x - lineMetrics.actualBoundingBoxLeft && clickedPos.x < pos.x + lineMetrics.actualBoundingBoxRight &&
            clickedPos.y > pos.y - lineMetrics.actualBoundingBoxDescent && clickedPos.y < pos.y + lineMetrics.actualBoundingBoxAscent)
    })
    gCtx.restore()
    return selectedLineIdx;
}




