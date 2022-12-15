'use strict'

// var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }];
var gImgs
var counter = 0

_createImgs()

function getImg(){
    return gImgs
}

function _createImg(src, keywords) {
    var img = {
        id: counter,
        src,
        keywords,
    }
    counter++
    return img
}

function _createImgs(){
    gImgs = [
        _createImg('img/1.jpg', ['trump', 'politic']),
        _createImg('img/2.jpg', ['puppy', 'cute']),
        _createImg('img/3.jpg', ['puppy', 'cute', 'baby']),
    ]
}