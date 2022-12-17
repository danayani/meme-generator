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
    resizeCanvas()
    drawImg(gImg) //going after to render lines
}

function renderLines() {//come after renderMeme (load img)
    
    const meme = getMeme()
    meme.lines.forEach(line => {
        drawText(line)
    })
}



//TODO: set img from here, rander is to reopen, afer set img to ser lines
function setImg(imgSrc) {
    gImg = imgSrc
}

function drawImg() {
    const elImg = new Image() // Create a new html img element
    elImg.src = gImg // Send a network req to get that image, define the img src

    elImg.onload = () => {
        resizeCanvas()
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        renderLines()
    }
}

function drawImgFromUser(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function drawText(currLine) {
    var { txt, size, align, color, x, y, isDrag } = currLine
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px Impact`
    gCtx.textAlign = align
    gCtx.textBaseline = 'middle'

    gCtx.shadowColor='rgba(0,0,0,0)'
    if (isDrag) {
        gCtx.strokeStyle = '#f2f0f8a1'

        gCtx.strokeStyle = '#f2f0f8a1'
        gCtx.shadowColor = '#f2f0f8a1'
        // set initial blur of 3px
        gCtx.shadowBlur = 5
    }


    gCtx.fillText(txt, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(txt, x, y) // Draws (strokes) a given text at the given (x, y) position.
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth - 10
    gElCanvas.height = elContainer.offsetWidth - 10
}

function getCanvas() {
    return gElCanvas
}

//tools functions

function onAddTxt() {
    var txt = document.getElementById('txt-user').value

    const meme = getMeme()
    const selectedLine = meme.selectedLineIdx

    if (selectedLine < 0) {
        console.log('selectedLine', selectedLine)
        setLineTxt(txt) //added to service
        // console.log(getLastLine())
        drawText(getLastLine())
    }
    else {
        updateTxt(txt)
    }

    renderMeme()
    document.getElementById('txt-user').value = '' //clean text area
    meme.selectedLine = -1
}

function onDeleteLine() {
    const meme = getMeme()
    if (meme.selectedLineIdx < 0) return  //check if there is line to delete
    deleteLine()
    renderMeme()

    document.getElementById('txt-user').value = '' //clean text area

    // console.log(getMeme())
}

function onSetColor(elcolor) {
    const meme = getMeme()
    if (meme.selectedLineIdx < 0) return

    setColor(elcolor.value)
    renderMeme()
}

function onChangeSizeLine(diff) {
    console.log('onChangeSizeLine')
    const meme = getMeme()
    if (meme.selectedLineIdx < 0) return

    changeSizeLine(diff)
    renderMeme()
}

function onAddEmoji(elEmoj) {
    console.log(elEmoj.innerText)
    setLineTxt(elEmoj.innerText)
    drawText(getLastLine())

}

//moving object / drag & drop
var gStartPos
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function onDown(ev) {
    // console.log('onDown()')

    //check if i click on a line
    const pos = getEvPos(ev) // {x: , y: }
    const currLineIdx = whichLineClicked(pos)
    if (currLineIdx === -1) {
        renderMeme()
        return
    }
    console.log('Line Clicked!')

    //change bool 'isDrag'
    setSelectLine(currLineIdx) //set line on service
    setLineDrag(true) // change line status
    document.body.style.cursor = 'move'
    gStartPos = pos

    //TODO: taggle class(change apperance)

}

function onUp(ev) {
    console.log('onUp()')

    //change bool 'isDrag' 
    setLineDrag(false)
    document.body.style.cursor = 'default'

    var pos = getEvPos(ev) // {x: , y: }
    const meme = getMeme()

    console.log('meme', meme)

    var lineId = whichLineClicked(pos)
    // console.log(lineId)
    if (lineId < 0) {
        document.getElementById('txt-user').value = ''
        // setLineDrag(false)
        meme.selectedLineIdx = -1
        return
    }

    document.getElementById('txt-user').value = meme.lines[meme.selectedLineIdx].txt

    // const selectedLine = meme.lines[meme.selectedLineIdx]
    // if (!selectedLine) {
    //     document.getElementById('txt-user').value = ''
    //     return
    // }
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




