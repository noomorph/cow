function getRatio({ width, height }) {
    return height / width;
}

function isImageWiderThanContainer(ratio) {
    return ratio < 1;
}

function getOffset(ratio) {
    return 0.5 * (ratio - 1);
}

function getPosition(ratio) {
    return isImageWiderThanContainer(ratio) ?
        [getOffset(1 / ratio), 0] :
        [0, getOffset(ratio)];
}

function getSize(ratio) {
    return isImageWiderThanContainer(ratio) ?
        [1 / ratio, 1] :
        [1, ratio];
}

export function getBackgroundDimensions(container, image) {
    const containerRatio = getRatio(container);
    const imageRatio = getRatio(image);
    const ratio = imageRatio / containerRatio;

    const [width, height] = getSize(ratio);
    const [left, top] = getPosition(ratio);

    return { left, top, width, height };
}
