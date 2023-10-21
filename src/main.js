import { makeDivGrid } from "./js/grid.js";
import { numberToPx } from "./js/utils.js";
import { makePlayerObj, monitorClick } from "./js/pathfinder.js";

/**
 * @type {HTMLDivElement}
 */
const APP = document.querySelector("#app");

const GRID_SIZE = 5;
const PATH_SIZE = 20;
const DIV_SIZE = 100;

// Style APP for flex container
APP.style.display = "flex";
APP.style.flexDirection = "column";
APP.style.gap = numberToPx(PATH_SIZE);

// Make a Grid
const grid = makeDivGrid(APP, GRID_SIZE, PATH_SIZE, DIV_SIZE);

// Make Player
const player = makePlayerObj(APP, PATH_SIZE, DIV_SIZE, 0);

// Monitor Click's and run walker
monitorClick(player, grid, PATH_SIZE, DIV_SIZE, 5);
