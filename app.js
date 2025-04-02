const chessBoard = document.querySelector('#chessboard');
const playerDisplay = document.querySelector('#player');
const infoDisplay = document.querySelector('#info-display');
const productDisplay = document.querySelector('#product-display');

let playerGo = 'black'
playerDisplay.textContent = 'Green';

// Chess Map
const width = 8;
const chessMap = Array(width * width);

// Creating Chess Board
function createBoard() {
    for (let i = 0; i < chessMap.length; i++) {
        const square = document.createElement('div');
        square.classList.add('square');

        // Name square positions
        const row = Math.ceil((i + 1) / width);

        const col = ((i + width) % width) + 1;

        const rank = row.toString();
        const file = String.fromCharCode(64 + col);

        const identity = file.concat(rank);

        // Add square id and coordinate
        square.setAttribute('data-square-id', identity);
        square.setAttribute('axis_x', col);
        square.setAttribute('axis_y',row);

        // Add squares to board
        chessBoard.append(square);

        // Color checks
        if (row % 2 === 0) {
            square.classList.add(i % 2 === 0 ? "beige" : "green");
        } else {
            square.classList.add(i % 2 === 0 ? "green" : "beige");
        }

    }
}
createBoard();

// Add starting pieces to the board
function addPiece (pieceName, locations) {
    pieceName.forEach((single_piece, index) => {
        const square = document.querySelector(`[data-square-id="${locations[index]}"]`);
        if (square) {
            single_piece.setAttribute('draggable', 'true');
            square.appendChild(single_piece);
        }
    })

}

function loadPieces() {
    // Load upper team
    addPiece (rook2, ['A1','H1']);
    addPiece (knight2, ['B1','G1']);
    addPiece (bishop2, ['C1','F1']);
    addPiece (queen2, ['D1']);
    addPiece (king2, ['E1']);
    addPiece (pawn2, ['A2','B2','C2','D2','E2','F2','G2','H2'])

    //Load lower team
    addPiece (rook1, ['A8','H8']);
    addPiece (knight1, ['B8','G8']);
    addPiece (bishop1, ['C8','F8']);
    addPiece (queen1, ['D8']);
    addPiece (king1, ['E8']);
    addPiece (pawn1, ['A7','B7','C7','D7','E7','F7','G7','H7'])
}

loadPieces();

    // Drag movement
const allSquares = document.querySelectorAll('.square');
console.log(allSquares);

allSquares.forEach(square => {
    square.addEventListener('dragstart', dragStart);
    square.addEventListener('dragover', function (e) {e.preventDefault()})
    square.addEventListener('drop', dragDrop);
})

let draggedElement;
let startPosition;
let startPositionId;
let existingElement;
let endPosition;


function dragStart(e) {
    draggedElement = e.target.closest('.piece');
    startPosition = e.target.closest('.square');
    startPositionId = draggedElement.parentNode.getAttribute('data-square-id');

    // Only allow dragging when it's the right turn
    if (!draggedElement.getAttribute('team').includes(playerGo)) {
        e.preventDefault();
        return;
    } else {
        draggedElement.classList.add('dragging');
    }
}

function dragDrop(e) {
    e.stopPropagation();
    existingElement = e.target.closest('.piece');
    endPosition = e.target.closest('.square');
    const valid = checkValid(endPosition);
    const startPosition = document.querySelector(`[data-square-id="${startPositionId}"]`);

    draggedElement.classList.remove('dragging');

    // Only drop on empty squares or capture opponent
    if (valid) {
        endPosition.appendChild(draggedElement);
        if (existingElement) {
            // Capture opponent
            if (existingElement.getAttribute('team') !== draggedElement.getAttribute('team')) {
                endPosition.removeChild(existingElement);
                // Introduce the product
                introduce(existingElement);

                // Check if King is captured
                if (existingElement && existingElement.classList.contains('king')) {
                    setTimeout(restartGame, 600);
                    return;
                }

            } else {
                // Restrict capturing the same team
                if (startPosition) {
                startPosition.appendChild(draggedElement);
                }
                changePlayer();
            }

        }
        infoDisplay.innerHTML = " ";
        changePlayer();



    } else {
        infoDisplay.innerHTML = "You can't go there!!!";
    }

}

function checkValid(end) {
    let x = parseInt(end.getAttribute('axis_x'));
    let y = parseInt(end.getAttribute('axis_y'));
    const piece_x = parseInt(startPosition.getAttribute('axis_x'));
    const piece_y = parseInt(startPosition.getAttribute('axis_y'));
    const piece = draggedElement.classList[1];
    const team = draggedElement.getAttribute('team');

    switch(piece) {
        case 'pawn':
            switch(team) {
                case 'black' :
                    // Move forward 1 or 2 steps on the first go
                    if ((piece_y === 2 && x === piece_x && (y === (piece_y + 1) || y === (piece_y + 2))) ||
                        // Move 1 step from the next go
                        (piece_y > 2 && x === piece_x && y === (piece_y + 1))){
                        // Invalid move if blocked by another piece
                        if (existingElement) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                    // Capture diagonally only
                    else if (existingElement && (x === (piece_x + 1)|| x === (piece_x - 1)) && y === (piece_y + 1)) {
                        return true;
                    }
                case 'white' :
                    if ((piece_y === 7 && x === piece_x && (y === (piece_y - 1) || y === (piece_y - 2))) ||
                        (piece_y < 7 && x === piece_x && y === (piece_y - 1))) {
                            if (existingElement) {
                                return false;
                            } else {
                                return true;
                            }
                    } else if (existingElement && (x === (piece_x + 1)|| x === (piece_x - 1)) && y === (piece_y - 1)) {
                        return true;
                    }
                }
            break;

        case 'rook':
            // Move many squares horizontally and vertically
            if (piece_x === x || piece_y === y) {
                // Can't move through when blocked by another piece
                if (noBlock(piece_x, piece_y, x, y)) {
                    return true;
                }
            }
            break;

        case 'knight':
            // Move in L shape
            const lengthX = Math.abs(piece_x - x);
            const lengthY = Math.abs(piece_y - y);
            if ((lengthX === 2 && lengthY === 1) || (lengthX === 1 && lengthY === 2)) {
                return true;
            }
            break;

        case 'bishop' :
            // Move many squares diagonally
            if (Math.abs(piece_x - x) === Math.abs(piece_y - y)) {
                if (noBlock(piece_x, piece_y, x, y)) {
                    return true;
                }
            }
            break;

        case 'queen' :
            // Move like rook and bishop combined
            if ((piece_x === x || piece_y === y) || Math.abs(piece_x - x) === Math.abs(piece_y - y)) {
                if (noBlock(piece_x, piece_y, x, y)) {
                    return true;
                }
            }
            break;

        case 'king':
            // Move 1 step in any direction
            if (Math.abs(x - piece_x) <= 1 && Math.abs(y-piece_y) <= 1) {
                return true;
            }
            break;
    }
}


function noBlock(startX, startY, endX, endY) {
    // Get the correct direction
    let dx = Math.sign(endX - startX);
    let dy = Math.sign(endY - startY);

    // Iterate through each square on the way to detect blocking piece
    let currentX = startX + dx;
    let currentY = startY + dy;

    while (currentX !== endX || currentY !== endY) {
        let currentSquare = document.querySelector(`[axis_x="${currentX}"][axis_y="${currentY}"]`);
        if (currentSquare && currentSquare.querySelector('.piece')) {
            // Invalid move if block is found
            return false;
        }
        // Increment to the next square
        currentX += dx;
        currentY += dy;
    }
    return true;
}


function changePlayer() {
    if (playerGo === 'white') {
        playerGo = 'black';
        playerDisplay.textContent = 'Green';
    } else if (playerGo === 'black') {
        playerGo = 'white';
        playerDisplay.textContent = 'Red';
    }
}

function introduce(product) {
    // Grab the image
    const image = product.querySelector('img').getAttribute('src');
    productImage = document.createElement('img');
    productImage.src = image;
    productImage.id = 'productImg';

    // Grab the name
    const name = product.querySelector('img').getAttribute('title');
    productName = document.createElement('a');
    productName.innerHTML = `${name}`,

    // Grab the url
    productURL = product.getAttribute('productLink');
    productName.href = productURL;
    productName.target = '_blank';
    productName.id = 'productName';

    // Make sure the display is clear
    productDisplay.innerHTML = "";

    // Inject the product into DOM
    productDisplay.appendChild(productImage);
    productDisplay.appendChild(productName);

}

function restartGame() {
    alert(`${playerDisplay.textContent.toUpperCase()} wins! Play again hehehe...`)

    allSquares.forEach(square => square.innerHTML = '');

    loadPieces();

    playerGo = 'black';
    playerDisplay.textContent = 'Green';
    productDisplay.innerHTML = "";

}

// Check valid moves


/*


/* function showItem() {
    // Get the item name
    let dragItem = document.querySelector('.dragging');
    if (dragItem) {
        let item = document.querySelector('.img');
        if (item) {
            dragItem.innerHTML = `${img.title}`;
        }
    }


}




// [ veg_rook, veg_knight, veg_bishop, veg_queen, veg_king, veg_pawn, pawn, rook, knight, bishop, queen, king]

*/
