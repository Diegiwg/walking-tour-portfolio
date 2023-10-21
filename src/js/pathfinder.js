import { numberToPx } from "./utils.js";

// makePlayerObj
export function makePlayerObj(appRef, size, row, col) {
    const node = document.createElement("div");

    node.style.width = numberToPx(size);
    node.style.height = numberToPx(size);
    node.style.backgroundColor = "black";

    // Position
    node.style.position = "absolute";
    node.style.left = numberToPx(col);
    node.style.top = numberToPx(row);

    appRef.appendChild(node);
    return node;
}

/**
 *
 * @param {{node:HTMLDivElement}[]} gridNodes
 */
export function monitorClick(playerRef, gridNodes, playerSize, divSize) {
    gridNodes.forEach((row) => {
        row.forEach((el) => {
            el.node.addEventListener("click", () => {
                console.log(el, playerRef);
                console.log(el.index);

                const paddingLeft =
                    el.pointCol === "left" ? playerSize : divSize;

                playerRef.style.left = numberToPx(
                    paddingLeft +
                        el.index[1] * divSize +
                        playerSize * (el.index[1] - 1)
                );

                const paddingTop =
                    el.pointRow === "top" ? 0 : divSize + playerSize;

                playerRef.style.top = numberToPx(
                    paddingTop +
                        el.index[0] * divSize +
                        playerSize * (el.index[0] - 1)
                );
            });
        });
    });
}
