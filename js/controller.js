<<<<<<< HEAD
'use strict'
// the main controle on index.html


function onInit(){} //on the making

function onAddTxt(){
    var txt = document.getElementById('txt-user').value
    // console.log(txt)
    
    setLineTxt(txt) //added to service
    drawText(getLastLine())
    document.getElementById('txt-user').value = '' //clean text area
=======
'use strict'
// the main controle on index.html


function onInit(){} //on the making

function onAddTxt(){
    var txt = document.getElementById('txt-user').value
    // console.log(txt)
    
    setLineTxt(txt) //added to service
    drawText(getLastLine())
    document.getElementById('txt-user').value = '' //clean text area
>>>>>>> 05d08108e7884b884864f10e2f3bc696480dc500
}