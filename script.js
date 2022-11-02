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