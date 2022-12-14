'use strict'
var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }];

var gMeme

_createMemes()
// console.log(gMeme)

function getMeme() {
    return gMeme
}
function setLineTxt(){

}

function _createMemes() {
    gMeme = {
        selectedImgId: 5,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'sometimes',
                size: 50,
                align: 'left',
                color: 'white',
                x:100,
                y:50
            }
        ]
    }
}