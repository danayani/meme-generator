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

function onUploadImg() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg') // Gets the canvas content as an image format

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        // Encode the instance of certain characters in the url
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
    // Pack the image for delivery
    const formData = new FormData()
    formData.append('img', imgDataUrl)
    console.log('formData:', formData)
    // Send a post req with the image to the server
    fetch('//ca-upload.com/here/upload.php', { method: 'POST', body: formData })
        .then(res => res.text())
        .then(url => {
            console.log('url:', url)
            onSuccess(url)
        })
}

