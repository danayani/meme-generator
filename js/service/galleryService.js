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
        _createImg('img/10.jpeg', ['alice', 'politic']),
        _createImg('img/11.jpg', ['ariel', 'cute']),
        _createImg('img/12.jpg', ['castle', 'cute', 'baby']),
        _createImg('img/14.jpg', ['lion', 'cute', 'baby']),
        _createImg('img/15.jpg', ['castle', 'cute', 'baby']),
        _createImg('img/16.jpg', ['mickey', 'cute', 'baby']),
        _createImg('img/17.jpeg', ['mohana', 'cute', 'baby']),
        _createImg('img/18.jpg', ['nemo', 'cute', 'baby']),
        _createImg('img/19.jpg', ['pinokio', 'cute', 'baby']),
        _createImg('img/20.jpg', ['princess', 'cute', 'baby']),
        _createImg('img/21.jpg', ['princess', 'cute', 'baby']),
        _createImg('img/22.jpg', ['lion', 'cute', 'baby']),
        _createImg('img/23.jpg', ['princess', 'cute', 'baby']),
        _createImg('img/24.jpg', ['disney', 'cute', 'baby']),
    ]
}