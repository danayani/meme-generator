'use strict'

var gMeme
// var gSelectLineIdx //line is on edit

_createMemes()
// console.log(gMeme)

function getMeme() {
    return gMeme
}

function setSelectLine(lineIdx){
    gMeme.selectedLineIdx = lineIdx
}

function setLineDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
    console.log(gMeme.lines)
}


function setLineTxt(txt) {
    var length = gMeme.lines.length
    var elCanvas = document.querySelector('.canvas-container')
    var elCanWidth = elCanvas.offsetWidth
    var elCanHeight = elCanvas.offsetHeight
    //to know were to locate the line
    // need relativ position
    var x = elCanWidth / 2 //middle
    var y = 50 //if: first line
    if (length > 0) y = (length === 1) ? (elCanHeight - 50) : (elCanHeight / 2) //if: secend line / all of the rest


    gMeme.lines.push(_createLine(txt,x, y))
    console.log(gMeme.lines)
}

// function setLineText(newText) {
//     gMeme.lines[gMeme.selectedLineIdx].txt = newText;
// }

function setStrokeColor(newColor) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = newColor;
}

function getLastLine() {
    var length = gMeme.lines.length
    return gMeme.lines[length - 1]
}

function _createLine(txt, x, y) {
    var line = {
        txt,
        size: 50,
        align: 'center',
        color: 'black',
        x,
        y,
        isDrag: false
    }
    return line
}

//defult meme, only in after save
//TODO : storage, to present on Example/edit 
function _createMemes() {
    gMeme = {
        selectedImgId: 1,
        selectedLineIdx: 0,
        lines: []
    }
}