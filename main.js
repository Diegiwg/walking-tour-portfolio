import { makeDivGrid } from "./js/grid.js";
import { makePlayerObj, monitorClick } from "./js/pathfinder.js";

/**
 * @type {HTMLDivElement}
 */
const APP = document.querySelector("#app");

// Style APP for flex container
APP.style.display = "flex";
APP.style.flexDirection = "column";

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

async function main() {
    const response = await fetch("./config.json");
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    /** @type {Config} */
    let config;
    try {
        config = await response.json();
    } catch (error) {
        throw new Error(`Error parsing JSON: ${error}`);
    }

    // Make a Grid
    const grid = makeDivGrid(APP, config);

    // Make Player
    const player = makePlayerObj(
        Number(config["player-size"]),
        Number(config["block-size"]),
        Number(config["block-size"])
    );
    APP.appendChild(player.node);

    // Monitor Click's and run walker
    monitorClick(
        APP,
        player,
        grid,
        Number(config["player-size"]),
        Number(config["block-size"]),
        Number(config["player-speed"])
    );
}

main();
