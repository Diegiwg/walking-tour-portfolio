import { numberToPx, pxToNumber } from "./utils.js";

// makePlayerObj
export function makePlayerObj(appRef, size, row, col) {
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

    appRef.appendChild(node);

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
function walker(playerRef, playerSpeed, coord, divSize) {
    const playerCoord = {
        x: pxToNumber(playerRef.node.style.left),
        y: pxToNumber(playerRef.node.style.top),
    };

    if (playerCoord.x === coord.x && playerCoord.y === coord.y) {
        playerRef.state = "idle";
        return;
    }

    playerRef.state = "moving";

    if (playerCoord.x === coord.x) {
        // nothing
    } else if (playerCoord.x > coord.x) {
        playerRef.node.style.left = numberToPx(playerCoord.x - playerSpeed);
    } else {
        playerRef.node.style.left = numberToPx(playerCoord.x + playerSpeed);
    }

    if (playerCoord.y === coord.y) {
        // nothing
    } else if (playerCoord.y > coord.y) {
        playerRef.node.style.top = numberToPx(playerCoord.y - playerSpeed);
    } else {
        playerRef.node.style.top = numberToPx(playerCoord.y + playerSpeed);
    }

    // Debug

    // divSize, playerY / divSize, playerX / divSize
    console.log(
        divSize,
        "Y:",
        playerCoord.y / divSize,
        "X:",
        playerCoord.x / divSize
    );

    setTimeout(() => {
        walker(playerRef, playerSpeed, coord, divSize);
    }, 100);
}

/**
 *
 * @param {{node:HTMLDivElement}[]} gridNodes
 */
export function monitorClick(
    playerRef,
    gridNodes,
    playerSize,
    divSize,
    playerSpeed
) {
    gridNodes.forEach((row) => {
        row.forEach((el) => {
            el.node.addEventListener("click", () => {
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
                    playerRef,
                    playerSpeed,
                    { x: pointX, y: pointY },
                    divSize
                );
            });
        });
    });
}
