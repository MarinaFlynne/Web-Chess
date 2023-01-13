"use strict";

const pieces = document.querySelectorAll(".piece");
const squares = document.querySelectorAll(".square");

pieces.forEach(elem => {
    elem.addEventListener("dragstart", dragStart);
});

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