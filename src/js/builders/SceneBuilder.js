import { zip, isNumber, pick, assign, map, curry } from 'lodash';
import { getBackgroundDimensions } from '../utils/ratio';

function getDimensions(el) {
    if (isNumber(el.width) && isNumber(el.height)) {
        return { width: el.width, height: el.height };
    }

    return pick(el.getBoundingClientRect(), ['width', 'height']);
}

function createSlide(img) {
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.style.backgroundImage = `url(${img.src})`;

    return slide;
}

function appendChild(container, el) {
    container.appendChild(el);
    return el;
}

function toPercent(num) {
    return Math.floor(num * 100) + '%';
}

function toPercents(x, y) {
    return toPercent(x) + ' ' + toPercent(y);
}

function toBackgroundStyle({ left, top, width, height }) {
    return {
        backgroundSize: toPercents(width, height),
        backgroundPosition: toPercents(left, top),
    };
}

function doInjectSlides(container, images) {
    const containerDimensions = getDimensions(container);
    const appendToContainer = curry(appendChild)(container);
    const imagesDimesions = map(images, getDimensions);
    const getRelativeBackgroundDimensions = curry(getBackgroundDimensions)(containerDimensions);
    const backgroundDimensions = map(imagesDimesions, getRelativeBackgroundDimensions);
    const backgroundStyles = map(backgroundDimensions, toBackgroundStyle);
    const slides = map(images, createSlide);

    zip(slides, backgroundStyles).forEach(([slide, style]) => assign(slide.style, style));
    slides.forEach(appendToContainer);
}

const promises = new WeakMap();

export default class SceneBuilder {
    constructor(imageLoader) {
        this._imageLoader = imageLoader;
    }
    injectSlides(container) {
        if (!promises.has(container)) {
            const promise = this._imageLoader.ready().then(curry(doInjectSlides)(container));
            promises.set(container, promise);
        }

        return promises.get(container);
    }
}
