"use strict";

const pieces = document.querySelectorAll(".piece");
const squares = document.querySelectorAll(".square");

const startingLayout = ["w-rook", "w-knight", "w-bishop", "w-queen", "w-king", "w-bishop", "w-knight", "w-rook", "/", "w-pawn", "w-pawn", "w-pawn", "w-pawn", "w-pawn", "w-pawn", "w-pawn", "w-pawn", "/", "/", "/", "/", "/", "b-pawn", "b-pawn", "b-pawn", "b-pawn", "b-pawn", "b-pawn", "b-pawn", "b-pawn", "/", "b-rook", "b-knight", "b-bishop", "b-king", "b-queen", "b-bishop", "b-knight", "b-rook"];
placePieces(startingLayout);

//ebemt listener for the pieces
pieces.forEach(elem => {
    elem.addEventListener("dragstart", dragStart);
});

//event listener for the squares
squares.forEach(elem => {
    elem.addEventListener("dragover", dragOver);

    elem.addEventListener("drop", drop);
});


function dragStart(event) {
    //store the id of the parent
    event
    .dataTransfer
    .setData('text/plain', event.target.parentNode.id);
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    const id = event
    .dataTransfer
    .getData('text');

    const draggableElement = document.getElementById(id);

    const dropzone = event.target;

    //make the piece of the parent a child of the new square
    dropzone.appendChild(draggableElement.firstChild);
}

function placePiece(position, pieceName, color) {
    //create the new piece element
    const newPiece = document.createElement("div");
    const pieceClass = "piece " + pieceName + " " + color;
    newPiece.className = pieceClass;
    newPiece.draggable = true;
    newPiece.addEventListener("dragstart", dragStart);
    //make it the child of the square element with id position
    const pieceParent = document.getElementById(position);
    pieceParent.appendChild(newPiece);
}

function columnNumToLetter(number) {
    const columnLetters = ["a", "b", "c", "d", "e", "f", "g", "h"];
    return columnLetters[number-1];
}
//TODO
function placePieces(layout) {
    // let startingLayoutWhite = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"];
    // let startingLayoutBlack = ["rook", "knight", "bishop", "king", "queen", "bishop", "knight", "rook"];
    let currentIndex = 0;
    let color = "white";
    let column = 1;
    //WHY DOES IT SKIP 2 ROWS??
    for (let row = 1; row <= 8; row++) {
        console.log("row = " + row + "column = " + column);
        if (layout[currentIndex] == "/") {
            console.log("currentIndex " + currentIndex);
            currentIndex++;
        } else {
            for (column = 1; column <= 8; column++) {
                const colourPiece = layout[currentIndex].split("-");
                if (colourPiece[0] == "w") {
                    color = "white";
                } else {
                    color = "black";
                }
                let piece = colourPiece[1];
                console.log(columnNumToLetter(column) + row);
                placePiece(columnNumToLetter(column) + row, piece, color);
                currentIndex++;
            }
        }
    }


}

