import { makeDivGrid } from "./js/grid.js";
import { numberToPx } from "./js/utils.js";

/**
 * @type {HTMLDivElement}
 */
const APP = document.querySelector("#app");

const GRID_SIZE = 3;
const PATH_SIZE = 20;
const DIV_SIZE = 100;

// Style APP for flex container
APP.style.display = "flex";
APP.style.flexDirection = "column";
APP.style.gap = numberToPx(PATH_SIZE);

// Make a Grid
makeDivGrid(APP, GRID_SIZE, PATH_SIZE, DIV_SIZE);
