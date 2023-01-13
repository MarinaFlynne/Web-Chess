"use strict";

const pieces = document.querySelectorAll(".piece");
const squares = document.querySelectorAll(".square");

placePiece("b1", "rook","white");

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