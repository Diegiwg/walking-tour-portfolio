export function createBalloon(text, x, y) {
    const balloon = document.createElement("pre");

    balloon.textContent = text;

    balloon.style.position = "absolute";
    balloon.style.left = x + "px";
    balloon.style.top = y + "px";

    balloon.style.color = "white";
    balloon.style.backgroundColor = "#6c5c49";

    balloon.style.border = "black 1px solid";
    balloon.style.borderRadius = "1rem";

    balloon.style.padding = "5px";

    return balloon;
}
