'use strict'

function downloadImg(elLink) {
    var elCanvas = getCanvas()

    const imgContent = elCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}

// CallBack func will run on success load of the img
//come from galleryController
function loadImageFromInput(ev, setImgService) {
    const reader = new FileReader()
    // After we read the file
    reader.onload = (event) => {
        let img = new Image() // Create a new html img element
        img.src = event.target.result // Set the img src to the img file we read
        // Run the callBack func, To render the img on the canvas
        img.onload = () => setImgService(img)
    }

    reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
}

function setImgService(img) {
    //set img in memeController
    setImg(img)
    
    drawImgFromUser(img)
    
    // console.log(img)
    // // render = update meme/editor
    // renderMeme()
}

