'use strict'

// var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }];
var gImgs
var counterId = 0
var gImgsFilter = ''

_createImgs()


function getImgs() {
    if (gImgsFilter) {
        let filteredImgs = []
        gImgs.forEach(img => {
            img.keywords.forEach(key => {
                if (key.includes(gImgsFilter)) {
                    if (!filteredImgs.some(filteredImg => filteredImg.id === img.id)) filteredImgs.push(img)
                }
            })
        })
        return filteredImgs
    } else return gImgs
}

function setImgsFilter(searchStr) {
    gImgsFilter = searchStr
}

function onImgSelect(imgSrc) {
    setImg(imgSrc)
    renderMeme()

    var elGallery = document.querySelector('.gallery-container')
    var elEditor = document.querySelector('.editor-container')

    elGallery.classList.add('close')
    elEditor.classList.remove('close')
}

function getImgById(imgId) {
    const img = gImgs.find(img => img.id === imgId);
    return img //{id: 10, src: 'img/21.jpg', keywords: Array(3)}
}

//to be tested
function uploadImgToGallery(imgSrc) {
    var newImg = _createImg(imgSrc, '')
    gImgs.unshift(newImg)

    //move render to conroller
    renderGallery()
}


function _createImg(src, keywords) {
    var img = {
        id: counterId,
        src,
        keywords,
    }
    counterId++
    return img
}

function _createImgs() {
    gImgs = [
        _createImg('img/10.jpeg', ['alice', 'politic']),
        _createImg('img/11.jpg', ['ariel', 'disney']),
        _createImg('img/12.jpg', ['castle', 'disney', 'baby']),
        _createImg('img/14.jpg', ['lion', 'happy', 'friend']),
        _createImg('img/15.jpg', ['castle', 'disney', 'baby']),
        _createImg('img/16.jpg', ['mickey', 'mouse', 'pink']),
        _createImg('img/17.jpeg', ['mohana', 'princess', 'strong']),
        _createImg('img/18.jpg', ['nemo', 'fish', 'baby']),
        _createImg('img/19.jpg', ['pinokio', 'baby']),
        _createImg('img/20.jpg', ['princess', 'frog']),
        _createImg('img/21.jpg', ['princess', 'sad', 'cry']),
        _createImg('img/22.jpg', ['lion', 'bad', 'scary']),
        _createImg('img/23.jpg', ['princess', 'boy', 'mad']),
        _createImg('img/24.jpg', ['disney', 'friend', 'toy']),
    ]
}