export function createBalloon(text, x, y, pointX, pointY, offset) {
    const balloon = document.createElement("pre");

    balloon.textContent = text;

    const paddingLeft = pointX === "left" ? -offset : offset;
    balloon.setAttribute("X", pointX);

    const paddingTop = pointY === "top" ? -offset : offset;
    balloon.setAttribute("Y", pointY);

    balloon.style.position = "absolute";
    balloon.style.left = x + paddingLeft + "px";
    balloon.style.top = y + paddingTop + "px";

    balloon.style.color = "white";
    balloon.style.backgroundColor = "#6c5c49";

    balloon.style.border = "black 1px solid";
    balloon.style.borderRadius = "1rem";

    balloon.style.padding = "5px";

    return balloon;
}
