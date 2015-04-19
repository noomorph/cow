function ImageManager(options) {
    this.paths = options.paths;
    this.images = null;
}

ImageManager.prototype.ready = function () {
    if (this.images) {
        return Promise.resolve(this);
    }

    var promises = this.paths.map(createImage),
        self = this;

    return Promise.all(promises).then(
        function onResolve(images) {
            self.images = images;
            return self;
        }
    );
};

function createImage(path) {
    return new Promise(function (resolve, reject) {
        var img = document.createElement('img');
        img.src = path;
        img.onload = function () { resolve(img); };
        img.onerror = function () { reject(img); };
    });
}

module.exports = ImageManager;
