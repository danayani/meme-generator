var gGallery
var counter = 0


function onInitGallery() {
    _createImgs()
    renderGallery()
}

function renderGallery() {
    
}

function _createImg(src, words) {
    img = {
        id: counter,
        src,
        words,
    }
    counter++
    return img
}

function _createImgs(){
    gGallery = [
        _createImg('1.jpg', ['trump', 'politic']),
        _createImg('2.jpg', ['puppy', 'cute']),
        _createImg('3.jpg', ['puppy', 'cute', 'baby']),
    ]
}