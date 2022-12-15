'use strict'
var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }];

var gMeme

_createMemes()
// console.log(gMeme)

function getMeme() {
    return gMeme
}
function setLineTxt() {

}


function setLineTxt(txt) {
    var length = gMeme.lines.length
    gMeme.lines.push(_createLine(txt, 100))
}
function getLastLine(){
    var length = gMeme.lines.length
    return gMeme.lines[length-1]
}

function _createLine(txt, x) {
    var line = {
        txt,
        size : 50,
        align : 'center',
        color : 'black',
        x,
        y : 150
    }
    return line
}

//defult meme, only in after save
//TODO : storage, to present on Example/edit 
function _createMemes() {
    gMeme = {
        selectedImgId: 5,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'sometimes',
                size: 50,
                align: 'left',
                color: 'black',
                x: 100,
                y: 50
            }
        ]
    }
}