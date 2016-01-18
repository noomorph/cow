function loadImage(path) {
    return new Promise((resolve, reject) => {
        const img = document.createElement('img');

        img.src = path;
        img.onload = () => resolve(img);
        img.onerror = (e) => reject(e);
    });
}

export default class ImageLoader {
    constructor({ paths = [] }) {
        this._readyPromise = null;
        this.paths = paths;
        this.images = null;
    }
    ready() {
        if (!this._readyPromise) {
            const promises = this.paths.map(loadImage);

            this._readyPromise = Promise
                .all(promises)
                .then(images => {
                    this.images = images;
                });

            return this._readyPromise;
        }
    }
}

module.exports = ImageLoader;
