import { numberToPx, randomColor } from "./utils.js";

function makeDiv(color, size) {
    const node = document.createElement("div");

    node.style.backgroundColor = color;
    node.style.width = numberToPx(size);
    node.style.height = numberToPx(size);

    return node;
}

function makeContainer(pathSize) {
    const node = document.createElement("div");

    node.style.display = "flex";
    node.style.direction = "row";
    node.style.gap = numberToPx(pathSize);

    return node;
}

/**
 *
 * @param {HTMLDivElement} appRef
 * @param {number} gridSize
 * @param {number} pathSize
 * @param {number} divSize
 */
export function makeDivGrid(appRef, gridSize, pathSize, divSize) {
    let pad = 0;

    for (let row = 0; row < gridSize; row++) {
        const container = makeContainer(pathSize);

        for (let col = 0; col < gridSize; col++) {
            const color = randomColor();
            const node = makeDiv(color, divSize);

            pad++;

            container.appendChild(node);
        }

        pad = 0;
        appRef.appendChild(container);
    }
}
