function SoundManager(options) {
    var format = 
        canPlay('audio/mpeg') ? 'mp3' :
        canPlay('audio/ogg') ? 'ogg' : null;

    if (!format) {
        throw new Exception('<audio> is not supported');
    }

    this.currentTrack = null;
    this.paths = {
        intro: options.intro[format],
        main: options.main[format],
        outro: options.outro[format]
    };
}

SoundManager.prototype.ready = function () {
    if (this._loading) {
        return this._loading;
    }

    var self = this,
        promises = [
            createAudio(this.paths.intro),
            createAudio(this.paths.main),
            createAudio(this.paths.outro)
        ];

    this._loading = Promise.all(promises).then(function (audios) {
        self.tracks = {
            intro: audios[0],
            main: audios[1],
            outro: audios[2]
        };

        self.tracks.main.loop = true;

        return self;
    });

    return this._loading;
};

SoundManager.prototype.stop = function () {
    if (this.currentTrack) {
        this.currentTrack.pause();
    }

    return Promise.resolve(this);
};

SoundManager.prototype.play = function (key) {
    return this.start(key).then(function (self) {
        return new Promise(function (resolve) {
            var track = self.currentTrack;

            track.addEventListener('ended', function onEnded() {
                resolve(self);
                track.removeEventListener('ended', onEnded);
            });
        });
    });
};

SoundManager.prototype.start = function (key) {
    return this.stop().then(function (self) {
        var track = self.tracks[key];
        self.currentTrack = track;
        track.play();

        console.log('starting to play', track.src);
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
