'use strict'

//Create mat for modal
function createMat(ROWS, COLS) {
    const mat = []
    for (var i = 0; i < ROWS; i++) {
        const row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}

// The maximum is exclusive and the minimum is inclusive
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
        }
    }

    board[1][1] = POWERFOOD
    board[8][1] = POWERFOOD
    board[8][8] = POWERFOOD
    board[1][8] = POWERFOOD
    return board
}

function renderBoard(mat, selector) {

    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {

            const cell = mat[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function getGhostHTML(ghost) {
    
    var color = (gPacman.isSuper)? 'blue' : ghost.color
    console.log(color)
    return `<span style="color: ${color} ;">${GHOST}</span>`
}

// Move the player to a specific location
function moveTo(i, j) {

    console.log(i, j)
    const targetCell = gBoard[i][j]
    if (targetCell.type === WALL) return

    // Calculate distance to make sure we are moving to a neighbor cell
    const iAbsDiff = Math.abs(i - gGamerPos.i)
    const jAbsDiff = Math.abs(j - gGamerPos.j)


    var pass = false
    if(gGamerPos.i === 5 && i === 5 ) pass = true
    else if(gGamerPos.j === 6 && j === 6 ) pass = true

    console.log(pass)
    // If the clicked Cell is one of the four allowed
    if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0) || pass) {
        if(targetCell.gameElement === GLUE){
            setTimeout(wasteTime, 3000)
            console.log('glue')
        }
        else if (targetCell.gameElement === BALL) {
            console.log('Collecting!')
            gScore++
            gCountBalls--
            // document.getElementById("audioBall").loop = true;
        }
        // DONE: Move the gamer
        // REMOVING FROM
        // update Model
        gBoard[gGamerPos.i][gGamerPos.j].gameElement = null
        // update DOM
        renderCell(gGamerPos, '')

        // ADD TO
        // update Model
        targetCell.gameElement = GAMER
        gGamerPos = { i, j }
        // update DOM
        renderCell(gGamerPos, GAMER_IMG)
        if (gCountBalls === 0) onEndGame(true)
    }

}

function copyMat(mat) {
    var newMat = []
    for (var i = 0; i < mat.length; i++) {
        newMat[i] = []
        for (var j = 0; j < mat[0].length; j++) {
            newMat[i][j] = mat[i][j]
        }
    }
    return newMat
}

function blowUpNegs(cellI, cellJ, mat) {
    // console.log('cellI', cellI)
    // console.log('cellJ', cellJ)

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= mat[0].length) continue
            if (i === cellI && j === cellJ) continue
            // console.log('mat[i][j]', mat[i][j])
            if (mat[i][j] === LIFE) {

                // Update the model :
                mat[i][j] = ''

                // Update the dom :
                var elTd = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
                elTd.innerText = ''
                elTd.classList.remove('occupied')
            }
        }
    }
    // console.log('mat', mat)
}

function countNegs(cellI, cellJ, mat) {
    var negsCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= mat[i].length) continue
            // if (mat[i][j] === LIFE || mat[i][j] === SUPER_LIFE) negsCount++
            if (mat[i][j]) negsCount++
        }
    }
    return negsCount
}

function renderCars() {
    var strHTML = ''
    for (var i = 0; i < gCars.length; i++) {
        // console.log('i', i)
        strHTML +=
            `<div class="car car${i + 1}" onclick="onSpeedUp(${i})">
            Car${i + 1}</div>`
    }
    // console.log('strHTML', strHTML)

    var elRoad = document.querySelector('.road')
    elRoad.innerHTML = strHTML
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function drawNums() {
    var idx = getRandomInt(0, gNums.length)
    var num = gNums[idx]
    gNums.splice(idx, 1)
    return num

}