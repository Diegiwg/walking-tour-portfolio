import { makeDivGrid } from "./js/grid.js";
import { makePlayerObj, monitorClick } from "./js/pathfinder.js";

/**
 * @type {HTMLDivElement}
 */
const APP = document.querySelector("#app");

const GRID_OBJS = 5;
const DIV_SIZE = 100;
const PATH_SIZE = 20;
const PLAYER_SIZE = 20;
const PLAYER_SPEED = 20;

// Style APP for flex container
APP.style.display = "flex";
APP.style.flexDirection = "column";

// Make a Grid
const grid = makeDivGrid(APP, GRID_OBJS, PATH_SIZE, DIV_SIZE);

// Make Player
const player = makePlayerObj(PLAYER_SIZE, DIV_SIZE, 0);
APP.appendChild(player.node);

// Monitor Click's and run walker
monitorClick(APP, player, grid, PLAYER_SIZE, DIV_SIZE, PLAYER_SPEED);
