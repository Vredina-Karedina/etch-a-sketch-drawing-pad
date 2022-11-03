"Use strict"

const pad = document.querySelector(".pad");
const padSize = pad.clientHeight;

function padDensity (density) {
    pad.style.setProperty("--divsize", `${(padSize-(density-1)) / density}px`);
    let i=0;
    while (i < density*density) {
        const div = document.createElement("div");
        pad.appendChild(div);
        i++;
    }     
}

padDensity(16);

const toolsPanel = document.querySelector(".tools");
const toolsCaseImg = document.querySelector(".tools img");

let executed = false;
function openToolsCase () {
    toolsPanel.style.setProperty("justify-content", "space-between");

    const tools = ["PENSIL", "BACKGROUND", "GRID", "ERASER", "CLEAN"];
    tools.forEach (tool => {
        const item = document.createElement("div");
        item.textContent = `${tool}`;
        toolsPanel.appendChild(item);
        item.classList.add("tool");
    })
}

toolsCaseImg.addEventListener("click", openToolsCase, {once: true});