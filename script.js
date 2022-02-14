let canvas;
let mouseDown;
let pixel;
let grid = false;
let currentColor = document.getElementById("color-input").value;

document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

const updateCanvas = () => {
    canvas = document.getElementById("canvas")
    if (canvas) canvas.remove();
    let canvasSize = document.getElementById("canvas-size-input").value;
    createCanvas(canvasSize);
}

const createCanvas = (canvasSize) => {
    canvas = document.createElement("div");
    canvas.setAttribute("id", "canvas");

    canvas.style.gridTemplateColumns = `repeat(${canvasSize}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${canvasSize}, 1fr)`;

    document.body.appendChild(canvas);

    for (let i = 0; i < canvasSize * canvasSize; i++) {
        pixel = document.createElement("div")
        pixel.setAttribute("class", "pixel");
        pixel.addEventListener("mouseover", draw);
        pixel.addEventListener("mousedown", draw);
        canvas.appendChild(pixel);
    }
    // Keep the grid ON when the canvas is reset
    if(grid) {
        grid = false;
        toggleGrid();
    }
}

const draw = (e) => {
    if (e.type === 'mouseover' && !mouseDown) return
    e.target.style.backgroundColor = `${currentColor}`;
}

const changeColor = (color = null) => {
    if (color !== null) {
        currentColor = color;
    } else {
        currentColor = document.getElementById("color-input").value;
    }
}

const toggleGrid = () => {
    pixel = document.getElementsByClassName("pixel");
    if (grid === false) {
        for (let i = 0; i < pixel.length; i++) {
            grid = true;
            pixel[i].style.border = "solid black";
        }
    } else {
        for (let i = 0; i < pixel.length; i++) {
            grid = false;
            pixel[i].style.border = "none";
        }
    }
}



updateCanvas(); // Create the canvas when the page loads