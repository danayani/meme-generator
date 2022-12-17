'use strict'

// var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }];
var gImgs
var counter = 0
var gImgsFilter =''

_createImgs()

function getImg(){
    return gImgs
}

function getImgsFilter(){
    return gImgsFilter
}

function setImgsFilter(searchStr){
    gImgsFilter = searchStr
    // console.log('setImgsFilter')
    // console.log(gImgsFilter)
}

function onImgSelect(imgSrc){
    setImg(imgSrc)
    renderMeme()

    var elGallery = document.querySelector('.gallery-container')
    var elEditor = document.querySelector('.editor-container')
    
    elGallery.classList.add('close')
    elEditor.classList.remove('close')
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