"Use strict"

// ========== Fill the pad with cells according to density ========== //

const pad = document.querySelector(".pad");
const body = document.querySelector("body");
document.documentElement.style.setProperty("--padsize", `${body.clientHeight-100}px`);

function updateDensity() {
    const density = 16;
    document.documentElement.style.setProperty("--cellsize", `${Math.floor(((body.clientHeight-100) - (density-1)) / density)}px`);

    let i=0;
    while (i < density*density) {
        const cell = document.createElement("div");
        pad.appendChild(cell);
        i++;
    }
}
updateDensity();

// ========== Background update functionality ========== //

const gridCells = document.querySelectorAll(".pad div");
const backgroundDialogColorInput = document.querySelector(".background-color-input");
backgroundDialogColorInput.addEventListener("change", updateBackground);

function updateBackground () {
    gridCells.forEach(cell => cell.style.backgroundColor = backgroundDialogColorInput.value);
}
updateBackground();

// ========== Show tools by click on "Tools case" image ========== //

const tools = document.querySelectorAll(".tool");
const toolsCaseImg = document.querySelector(".tools img");
toolsCaseImg.addEventListener("click", toggleToolsMenu);

function toggleToolsMenu () {
    tools.forEach(tool => tool.classList.toggle("open"));
}

// ========== Tool dialog ========== //

tools.forEach(tool => {tool.addEventListener("click", toggleDialog)});

function toggleDialog () {
    if (this.textContent === "Eraser" || this.textContent === "Clean") return;
    const thisDialog = document.querySelector(`.${this.textContent.toLowerCase()}-dialog`);
    thisDialog.showModal();

    const buttonClose = document.querySelector(`.${this.textContent.toLowerCase()}-dialog .close-button`);
    buttonClose.addEventListener("click", () => thisDialog.close());
}

// ========== Pencil color selection ========== //

// To switch between pencils "changePencil" function launch appropriate function from the array "pencilOptions"
// The color for each cell calculates separately

let pencilColor = "#000000";

const pencilOptions = [];

// [ Solid ]
const solidColorInput = document.querySelector("input[name=solid]");
const solidRadioButton = document.querySelector(".solid");

pencilOptions["solid"] = function changeToSolid () {
    gridCells.forEach(cell => cell.addEventListener("mousedown", assignSolidColor));
    gridCells.forEach(cell => cell.addEventListener("mouseenter", assignSolidColor));

    function assignSolidColor() {
        pencilColor = solidColorInput.value;
    }
};
// Handle solid color update by dialog color input change
solidColorInput.addEventListener("change", () => {
    if (solidRadioButton.checked) pencilOptions["solid"]();
});

// [ Rainbow ]
pencilOptions["rainbow"] = function changeToRainbow () {
    let hue = 0;
    gridCells.forEach(cell => cell.addEventListener("mousedown", assignRainbowColor));
    gridCells.forEach(cell => cell.addEventListener("mouseenter", assignRainbowColor));

    function assignRainbowColor() {
        pencilColor = `hsl(${hue}, 100%, 50%)`;
        hue = hue+2;
        if (hue>360) hue=0;
    }
}

// [ Random ]
pencilOptions['random'] = function changeToRandom () {
    gridCells.forEach(cell => cell.addEventListener("mousedown", assignRandomColor));
    gridCells.forEach(cell => cell.addEventListener("mouseenter", assignRandomColor));

    function assignRandomColor() {
        let hue = Math.floor(Math.random() * 359);
        pencilColor = `hsl(${hue}, 100%, 50%)`;
    }
}

// [ Shade ]
const shadeColorInput = document.querySelector("input[name=shade]");

pencilOptions['shade'] = function changeToShade () {
    gridCells.forEach(cell => cell.addEventListener("mousedown", assignShadeColor));
    gridCells.forEach(cell => cell.addEventListener("mouseenter", assignShadeColor));

    function assignShadeColor() {
        // Transform cell color to rgba
        const baseRgb = this.style.backgroundColor.slice(4, this.style.backgroundColor.length-1).split(", ");
        const baseRgba = baseRgb.map(Number);
        baseRgba.push(1);

        // Transform shade input color to rgba
        const red = parseInt(shadeColorInput.value.substring(1, 3), 16);
        const green = parseInt(shadeColorInput.value.substring(3, 5), 16);
        const blue = parseInt(shadeColorInput.value.substring(5, 7), 16);
        const shadeRgba = [red, green, blue, 0.25];

        // Combine base and shade colors
        const mix = [];
        mix[3] = 1 - (1 - shadeRgba[3]) * (1 - baseRgba[3]);
        mix[0] = Math.round(
            (shadeRgba[0] * shadeRgba[3] / mix[3])
            + (baseRgba[0] * baseRgba[3] * (1 - shadeRgba[3]) / mix[3]));
        mix[1] = Math.round(
            (shadeRgba[1] * shadeRgba[3] / mix[3])
            + (baseRgba[1] * baseRgba[3] * (1 - shadeRgba[3]) / mix[3]));
        mix[2] = Math.round(
            (shadeRgba[2] * shadeRgba[3] / mix[3])
            + (baseRgba[2] * baseRgba[3] * (1 - shadeRgba[3]) / mix[3]));

        pencilColor = `rgba(${mix[0]}, ${mix[1]}, ${mix[2]}, ${mix[3]})`;
    }
}

// Switch between menu options
const pencils = document.querySelectorAll("input[name=color]");
pencils.forEach(pencil => pencil.addEventListener("change", changePencil));

function changePencil () {
    pencilOptions[`${this.classList.value}`]();
}

// ========== Drawing functionality ========== //

gridCells.forEach(cell => cell.addEventListener("mousemove", draw));
gridCells.forEach(cell => cell.addEventListener("mousedown", () => drawingProcess = true));
gridCells.forEach(cell => cell.addEventListener("mouseup", () => drawingProcess = false));
let drawingProcess = false;

function draw () {    
    if (!drawingProcess) return;
    this.style.backgroundColor = pencilColor;
}
