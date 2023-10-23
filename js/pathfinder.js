import { numberToPx, pxToNumber } from "./utils.js";
import { createBalloon } from "./explanation-balloon.js";

let BALLOON = null;

function check(x, y) {
    const node = document.elementFromPoint(x, y);
    if (node && node.getAttribute("type") === "path") return true;

    return false;
}

// makePlayerObj
export function makePlayerObj(size, row, col) {
    const node = document.createElement("div");

    node.style.width = numberToPx(size);
    node.style.height = numberToPx(size);

    // Style
    node.style.backgroundColor = "black";
    node.style.borderRadius = "1rem";

    // Position
    node.style.position = "absolute";
    node.style.left = numberToPx(col);
    node.style.top = numberToPx(row);

    return {
        node,

        /** @type {"idle"|"moving"} */
        state: "idle",
    };
}

/**
 *  @param { {node: HTMLDivElement, state: "idle"|"moving"} } playerRef
 *  @param {number} playerSpeed
 *  @param { {x:number, y:number} } coord
 */
function walker(appRef, playerRef, playerSpeed, coord, divSize) {
    const playerCoord = {
        x: pxToNumber(playerRef.node.style.left),
        y: pxToNumber(playerRef.node.style.top),
    };

    if (playerCoord.x === coord.x && playerCoord.y === coord.y) {
        playerRef.state = "idle";

        appRef.appendChild(BALLOON);

        if (BALLOON.getAttribute("X") === "left") {
            BALLOON.style.left = numberToPx(
                playerCoord.x - BALLOON.offsetWidth
            );
        }

        if (BALLOON.getAttribute("Y") === "top") {
            BALLOON.style.top = numberToPx(
                playerCoord.y - BALLOON.offsetHeight
            );
        }

        return;
    }
    playerRef.state = "moving";

    // Go to Left
    if (playerCoord.x > coord.x && check(playerCoord.x - 1, playerCoord.y)) {
        playerRef.node.style.left = numberToPx(playerCoord.x - playerSpeed);
    } else if (
        playerCoord.y > coord.y &&
        check(playerCoord.x, playerCoord.y - 1)
    ) {
        playerRef.node.style.top = numberToPx(playerCoord.y - playerSpeed);
    } else if (
        playerCoord.x < coord.x &&
        check(playerCoord.x + 1, playerCoord.y)
    ) {
        playerRef.node.style.left = numberToPx(playerCoord.x + playerSpeed);
    } else if (
        playerCoord.y < coord.y &&
        check(playerCoord.x, playerCoord.y + 1)
    ) {
        playerRef.node.style.top = numberToPx(playerCoord.y + playerSpeed);
    }

    setTimeout(() => {
        walker(appRef, playerRef, playerSpeed, coord, divSize);
    }, 100);
}

/**
 *
 * @param {{node:HTMLDivElement}[]} gridNodes
 */
export function monitorClick(
    appRef,
    playerRef,
    gridNodes,
    playerSize,
    divSize,
    playerSpeed
) {
    gridNodes.forEach((row) => {
        row.forEach((el) => {
            el.node.addEventListener(
                "click",
                /**@param {MouseEvent} e */
                (e) => {
                    if (BALLOON) {
                        BALLOON.remove();
                        BALLOON = null;
                    }

                    if (playerRef.state === "moving") return;

                    const paddingLeft =
                        el.pointCol === "left" ? 0 : divSize + playerSize;

                    const paddingTop =
                        el.pointRow === "top" ? 0 : divSize + playerSize;

                    const pointX =
                        paddingLeft +
                        el.index[1] * divSize +
                        playerSize * (el.index[1] - 1);

                    const pointY =
                        paddingTop +
                        el.index[0] * divSize +
                        playerSize * (el.index[0] - 1);

                    walker(
                        appRef,
                        playerRef,
                        playerSpeed,
                        { x: pointX, y: pointY },
                        divSize
                    );

                    BALLOON = createBalloon(
                        el.text,
                        pointX,
                        pointY,
                        el.pointCol,
                        el.pointRow,
                        playerSize
                    );
                }
            );
        });
    });
}
