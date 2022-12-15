'use strict'

function downloadImg(elLink) {
    var elCanvas = getCanvas()

    const imgContent = elCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}