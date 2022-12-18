'use strict'


function onInitGallery() {
  initMeme() //init editor canvas
  renderGallery()
}

// var newArray = homes.filter(function (el) {
//   return el.price <= 1000 &&
//          el.sqft >= 500 &&
//          el.num_of_beds >=2 &&
//          el.num_of_baths >= 2.5;
// });

function renderGallery() {

  const imgs = getImgs()

    var strHTMLs = imgs.map(
      (img) =>
        // var { id, src } = img
        `<img id="${img.id}" src="${img.src}" onclick="onImgSelect('${img.src}')" >
      `)
  var elImgCont = document.querySelector('.img-container')
  elImgCont.innerHTML = strHTMLs.join('')

}

function onKeyUpSearch(filterBy) {
  setImgsFilter(filterBy)
  renderGallery()
}


//go to upDownloadService
function onImgInput(ev) {
  loadImageFromInput(ev, setImgService)

  var elGallery = document.querySelector('.gallery-container')
  var elEditor = document.querySelector('.editor-container')
  
  elGallery.classList.add('close')
  elEditor.classList.remove('close')
}

