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
    const grid = [];

    let pad = 0;

    for (let row = 0; row < gridSize; row++) {
        const path = [];

        const container = makeContainer(pathSize);

        for (let col = 0; col < gridSize; col++) {
            const el = {
                // col pointer
                pointCol: col < gridSize / 2 ? "right" : "left",

                // row pointer
                pointRow: row < gridSize / 2 ? "bottom" : "top",

                // element index
                index: [row, col],
            };

            const color = randomColor();
            const node = makeDiv(color, divSize);

            node.setAttribute("data-point", JSON.stringify(el));
            el["node"] = node;

            pad++;
            path.push(el);
            container.appendChild(node);
        }

        pad = 0;
        grid.push(path);
        appRef.appendChild(container);
    }

    return grid;
}
