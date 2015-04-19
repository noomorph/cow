function SoundManager(options) {
    var format = 
        canPlay('audio/mpeg') ? 'mp3' :
        canPlay('audio/ogg') ? 'ogg' : null;

    if (!format) {
        throw new Exception('<audio> is not supported');
    }

    this.paths = {
        intro: options.intro[format],
        main: options.main[format],
        outro: options.outro[format]
    };
}

SoundManager.prototype.ready = function () {
    var self = this,
        promises = [
            createAudio(this.paths.intro),
            createAudio(this.paths.main),
            createAudio(this.paths.outro)
        ];

    return Promise.all(promises).then(function (audios) {
        self.tracks = {
            intro: audios[0],
            main: audios[1],
            outro: audios[2]
        };

        return self;
    });
};

SoundManager.prototype.stop = function (key) {
    if (key) {
        this.tracks[key].pause();
    } else {
        this.tracks.intro.pause();
        this.tracks.main.pause();
        this.tracks.outro.pause();
    }

    return Promise.resolve(this);
};

SoundManager.prototype.start = function (key) {
    return this.stop().then(function (self) {
        self.tracks[key].play();
        return self;
    });
};

function createAudio(path) {
    return new Promise(function (resolve, reject) {
        var audio = document.createElement('audio');

        audio.src = path;
        audio.preload = 'auto';
        audio.oncanplay = function () { resolve(audio); };
        audio.onerror = function () { reject(audio); };

        document.body.appendChild(audio);
    });
}

function canPlay(mimeType) {
    var a = document.createElement('audio');
    return !!(a.canPlayType && a.canPlayType(mimeType+';').replace(/no/, ''));
}

module.exports = SoundManager;
