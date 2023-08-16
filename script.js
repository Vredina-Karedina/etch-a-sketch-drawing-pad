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

const gridCells = document.querySelectorAll(".pad div");
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
