'use strict'


function onInitGallery() {
    initMeme() //init editor canvas
    renderGallery()
}

function renderGallery() {
    const imgs = getImg()
    // console.log(imgs)
    

  var strHTMLs = imgs.map(
    (img) =>
    // var { id, src } = img
    `<img id="${img.id}" src="${img.src}" onclick="onImgSelect('${img.src}')" >
    `)

    var elImgCont = document.querySelector('.img-container')
    elImgCont.innerHTML = strHTMLs

}

