/**
 * @type {HTMLDivElement}
 */
const APP = document.querySelector("#app");

const PATH_SIZE = "20px";
const DIV_SIZE = "100px";

// Style APP for flex container
APP.style.display = "flex";
APP.style.flexDirection = "column";
APP.style.gap = PATH_SIZE;

function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
}

function handlerClick(e) {
    console.log(e);
}

function makeDiv(color) {
    const node = document.createElement("div");

    // Style
    node.style.backgroundColor = color;
    node.style.width = DIV_SIZE;
    node.style.height = DIV_SIZE;

    node.addEventListener("click", handlerClick);

    return node;
}

function makeContainer() {
    const node = document.createElement("div");
    node.style.display = "flex";
    node.style.direction = "row";
    node.style.gap = PATH_SIZE;
    return node;
}

// Implementar uma função que vai gerar dinamicamente a GRID
function generateGrid(rows, columns) {
    const grid = new Set();

    let pad = 0;
    for (let row = 0; row < rows; row++) {
        const container = makeContainer();

        for (let col = 0; col < columns; col++) {
            const node = makeDiv(randomColor());

            // grid.x.push(
            //     `${col * 100 + pad * 20}-${col * 100 + 100 + pad * 20}`
            // );

            // grid.y.push(
            //     `${col * 100 + pad * 20}-${col * 100 + 100 + pad * 20}`
            // );

            grid.add(col * 100 + pad * 20);
            grid.add(col * 100 + 100 + pad * 20);

            pad++;

            container.appendChild(node);
        }

        pad = 0;

        APP.appendChild(container);
    }

    return grid;
}

// Teste
const GRID_SIZE = 5;
const MAX_GRID_LEFT_OFFSET = GRID_SIZE * 100 + (GRID_SIZE - 2) * 20;

var grid = generateGrid(GRID_SIZE, GRID_SIZE);
console.log(grid);

function makePlayerNode() {
    const node = document.createElement("div");

    node.id = "player";
    node.style.backgroundColor = "red";

    node.style.width = "20px";
    node.style.height = "20px";

    node.style.position = "absolute";

    node.style.top = "100px";

    APP.appendChild(node);

    return node;
}

const PlayerState = {
    IDLE: 1,
    MOVING: 2,
};

const Player = {
    state: PlayerState.IDLE,
    size: 20,
    node: makePlayerNode(),
};

// Move player

function helper(oldV, newV, operand) {
    oldV = Number(oldV.replace("px", ""));

    if (operand === "+") {
        oldV += newV;
    } else {
        oldV -= newV;
    }

    return `${oldV}px`;
}

// document.listener?
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp": {
            if (Player.node.offsetTop <= 0) return;
            Player.node.style.top = helper(Player.node.style.top, 10, "-");
            break;
        }

        case "ArrowDown": {
            if (Player.node.offsetTop >= MAX_GRID_LEFT_OFFSET) return;
            Player.node.style.top = helper(Player.node.style.top, 10, "+");
            break;
        }

        case "ArrowLeft": {
            if (Player.node.offsetLeft <= 0) return;
            Player.node.style.left = helper(Player.node.style.left, 10, "-");
            break;
        }

        case "ArrowRight": {
            if (Player.node.offsetLeft >= MAX_GRID_LEFT_OFFSET) return;
            Player.node.style.left = helper(Player.node.style.left, 10, "+");
            break;
        }

        case "a": {
            console.log(Player.node.offsetLeft, Player.node.offsetTop);
            break;
        }

        default:
            break;
    }
});

console.log("MAX_GRID_LEFT_OFFSET", MAX_GRID_LEFT_OFFSET);
