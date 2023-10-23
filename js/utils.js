export function numberToPx(number) {
    return `${number}px`;
}

export function pxToNumber(px) {
    return Number(px.replace("px", ""));
}

export function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
}
