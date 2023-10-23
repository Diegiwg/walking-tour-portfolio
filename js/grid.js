import { numberToPx, randomColor } from "./utils.js";

function makeDiv(color, width, height, img = false) {
    const node = document.createElement("div");

    node.style.backgroundColor = color;
    node.style.width = numberToPx(width);
    node.style.height = numberToPx(height);

    if (img) {
        const imgNode = document.createElement("img");
        imgNode.style.width = "100%";
        imgNode.style.height = "100%";
        imgNode.src = `./assets/${Math.floor(Math.random() * 3)}.png`;

        node.appendChild(imgNode);
    }

    return node;
}

function makeContainer() {
    const node = document.createElement("div");

    node.style.display = "flex";
    node.style.direction = "row";

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
        const container = makeContainer();

        const path = [];
        for (let col = 0; col < gridSize; col++) {
            const color = randomColor();
            const node = makeDiv(color, divSize, divSize, true);
            node.setAttribute("type", "block");

            const el = {
                // col pointer
                pointCol: col < gridSize / 2 ? "right" : "left",

                // row pointer
                pointRow: row < gridSize / 2 ? "bottom" : "top",

                // element index
                index: [row, col],

                // node ref
                node,

                // Text
                text: "Lorem ipsum dolor sit amet, \nconsectetur adipiscing elit.",
            };
            path.push(el);

            pad++;
            container.appendChild(node);

            if (pad < gridSize) {
                const padNode = makeDiv("white", pathSize, divSize);
                padNode.setAttribute("type", "path");
                container.appendChild(padNode);
            }
        }

        pad = 0;
        grid.push(path);

        const pathNode = makeDiv(
            "white",
            divSize * gridSize + pathSize * (gridSize - 1),
            pathSize
        );
        pathNode.setAttribute("type", "path");

        appRef.appendChild(container);
        appRef.appendChild(pathNode);
    }

    return grid;
}
