import { numberToPx, randomColor } from "./utils.js";

/**
 * @param {number} width
 * @param {number} height
 * @param {Block} block
 * @returns
 */
function makeDiv(width, height, block) {
    const node = document.createElement("div");

    node.style.width = numberToPx(width);
    node.style.height = numberToPx(height);

    switch (block.type) {
        case "img":
            {
                const imgNode = document.createElement("img");
                imgNode.style.width = "100%";
                imgNode.style.height = "100%";
                imgNode.src = block.src;

                node.appendChild(imgNode);
            }

            break;

        default:
            break;
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
 * @typedef {Object} Block
 *
 * @property {HTMLDivElement} node
 * @property {"img"|"video"} type
 * @property {string} src
 * @property {string} name
 * @property {string} text
 */

/** @typedef {Object} Config
 *
 * @property {number} grid-size
 * @property {number} block-size
 * @property {number} path-size
 * @property {number} player-size
 * @property {number} player-speed
 * @property {Block[]} blocks
 */

/**
 *
 * @param {HTMLDivElement} appRef
 * @param {Config} config
 */
export function makeDivGrid(appRef, config) {
    const grid = [];

    const gridSize = Number(config["grid-size"]);
    let currentBlock = 0;

    let pad = 0;
    for (let row = 0; row < gridSize; row++) {
        const container = makeContainer();

        const path = [];
        for (let col = 0; col < gridSize; col++) {
            const block = config["blocks"][currentBlock++];

            const node = makeDiv(
                config["block-size"],
                config["block-size"],
                block
            );
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
                text: `${block.name}\n${block.text}`,
            };
            path.push(el);

            pad++;
            container.appendChild(node);

            if (pad < gridSize) {
                const padNode = makeDiv(
                    config["path-size"],
                    config["block-size"],
                    { type: "path" }
                );
                padNode.setAttribute("type", "path");
                container.appendChild(padNode);
            }
        }

        pad = 0;
        grid.push(path);

        const pathNode = makeDiv(
            Number(config["block-size"]) * gridSize +
                Number(config["path-size"]) * (gridSize - 1),
            config["path-size"],
            { type: "path" }
        );
        pathNode.setAttribute("type", "path");

        appRef.appendChild(container);
        appRef.appendChild(pathNode);
    }

    return grid;
}
