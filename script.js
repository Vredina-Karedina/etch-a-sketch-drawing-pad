"Use strict"

const pad = document.querySelector(".pad");
const body = document.querySelector("body");
document.documentElement.style.setProperty("--padsize", `${body.clientHeight-100}px`);
