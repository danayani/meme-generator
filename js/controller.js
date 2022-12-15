'use strict'
// the main controle on index.html


function onInit(){} //on the making

function onAddTxt(){
    var txt = document.getElementById('txt-user').value
    // console.log(txt)
    
    setLineTxt(txt) //added to service
    drawText(getLastLine())
    document.getElementById('txt-user').value = '' //clean text area
}

function onImgSelect(imgSrc){
    // console.log('onImgSelect')
    renderMeme(imgSrc)

    //TODO: use display on the editor and the gallery
}