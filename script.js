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
