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
  console.log('renderGallery')
  const imgs = getImg()
  // console.log(!getImgsFilter())

  if (!getImgsFilter()) {
    var strHTMLs = imgs.map(
      (img) =>
        // var { id, src } = img
        `<img id="${img.id}" src="${img.src}" onclick="onImgSelect('${img.src}')" >
      `)
  } else {
    var word = gImgsFilter

    var fillterImgs = imgs.filter(function (img, idx) {
      return img.keywords[idx] === word
    })

    var strHTMLs = fillterImgs.map(
      (img) =>
        // var { id, src } = img
        `<img id="${img.id}" src="${img.src}" onclick="onImgSelect('${img.src}')" >
      `)
  }


  var elImgCont = document.querySelector('.img-container')
  elImgCont.innerHTML = strHTMLs.join('')

}

function onKeyUpSearch() {
  const searchStr = document.querySelector('.search-Input').value
  const filterBy = setImgsFilter(searchStr)
  //render
  document.querySelector('.search-Input').value = searchStr
  renderGallery()
}

//go to upDownloadService
function onImgInput(ev) {
  loadImageFromInput(ev, setImgService)
}

