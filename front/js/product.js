import { KanapOrderLine } from "./object.js";

KanapOrderLine.getHeadName();

const img = document.querySelector(".item__img");

img.innerHTML = `
<img src="${ModelKanap.img}" alt="${ModelKanap.altTxt}">
`;
