import { makeDivGrid } from "./js/grid.js";
import { numberToPx } from "./js/utils.js";
import { makePlayerObj, monitorClick } from "./js/pathfinder.js";

/**
 * @type {HTMLDivElement}
 */
const APP = document.querySelector("#app");

const GRID_OBJS = 5;
const DIV_SIZE = 100;
const PATH_SIZE = 20;
const PLAYER_SIZE = 20;
const PLAYER_SPEED = 5;

// Style APP for flex container
APP.style.display = "flex";
APP.style.flexDirection = "column";
APP.style.gap = numberToPx(PATH_SIZE);

// Make a Grid
const grid = makeDivGrid(APP, GRID_OBJS, PATH_SIZE, DIV_SIZE);

// Make Player
const player = makePlayerObj(APP, PLAYER_SIZE, DIV_SIZE, 0);

// Monitor Click's and run walker
monitorClick(player, grid, PLAYER_SIZE, DIV_SIZE, PLAYER_SPEED);

// document.elementFromPoint(x, y);
// Provavelmente terá que modificar o sistema de geração do Grid,
// para uma 'geração' manual, para que o elementos estejam na grid
// ocupando apenas as posições 'corretas', e assim, é possível
// testar se o player está indo para um local que tem elemento
// e se sim, não executar a função.
