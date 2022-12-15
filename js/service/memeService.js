'use strict'

var gMeme

_createMemes()
// console.log(gMeme)

function getMeme() {
    return gMeme
}

function setLineDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function moveLine(dx, dy) {
    const selectedLine = gMeme.lines[gMeme.selectedLineIdx]
    selectedLine.pos.x += dx
    selectedLine.pos.y += dy

}


function setLineTxt(txt) {
    var length = gMeme.lines.length

    //to know were to locate the line
    //TODO: need relativ position
    var y = 50 //if: first line
    if (length > 0) y = (length === 1) ? 300 : 150 //if: secend line / all of the rest


    gMeme.lines.push(_createLine(txt, y))
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

function _createLine(txt, y) {
    var line = {
        txt,
        size: 50,
        align: 'center',
        color: 'black',
        x: 200,
        y, 
        isDrag : false
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
        // {
        //     txt: 'sometimes',
        //     size: 50,
        //     align: 'left',
        //     color: 'black',
        //     x: 100,
        //     y: 50
        // }

    }
}