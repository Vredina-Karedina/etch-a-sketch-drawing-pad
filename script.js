"Use strict"

// Fill the pad with divs according to density
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

const tools = document.querySelectorAll(".tool");
const toolsCaseImg = document.querySelector(".tools img");

// Initially hide tools
tools.forEach(tool => tool.style.display = "none");

// Show tools by click on "Tools case" image
toolsCaseImg.addEventListener("click", showTools);
function showTools () {
    tools.forEach(tool => tool.style.display = "block");
}

// Show and close dialog
tools.forEach(tool => {tool.addEventListener("click", toggleDialog)});
function toggleDialog () {
    const thisDialog = document.querySelector(`.${this.textContent.toLowerCase()}-dialog`);
    thisDialog.showModal();

    const closeButton = document.querySelector(`.${this.textContent.toLowerCase()}-dialog .close-button`);
    closeButton.addEventListener("click", () => thisDialog.close());
}