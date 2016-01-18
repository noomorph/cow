function canPlay(mimeType) {
    const audio = document.createElement('audio');
    return !!(audio.canPlayType && audio.canPlayType(mimeType + ';').replace(/no/, ''));
}

function loadAudio(path) {
    return new Promise((resolve, reject) => {
        const audio = document.createElement('audio');

        audio.src = path;
        audio.preload = 'auto';
        audio.oncanplay = () => resolve(audio);
        audio.onerror = (e) => reject(e);

        document.body.appendChild(audio);
    });
}

export default class SoundLoader {
    constructor({ intro, main, outro }) {
        const format = (canPlay('audio/mpeg') && 'mp3') || (canPlay('audio/ogg') && 'ogg') || null;

        if (!format) {
            throw new window.Exception('<audio> is not supported');
        }

        this.currentTrack = null;
        this.paths = {
            intro: intro[format],
            main: main[format],
            outro: outro[format],
        };
    }
    ready() {
        if (!this._readyPromise) {
            const promises = [
                loadAudio(this.paths.intro),
                loadAudio(this.paths.main),
                loadAudio(this.paths.outro),
            ];

            this._readyPromise = Promise.all(promises).then(audios => {
                this.tracks = {
                    intro: audios[0],
                    main: audios[1],
                    outro: audios[2],
                };

                this.tracks.main.loop = true;

                return this;
            });
        }

        return this._readyPromise;
    }
    stop() {
        if (this.currentTrack) {
            this.currentTrack.pause();
        }

        return Promise.resolve(this);
    }
    play(key) {
        return this.start(key).then(() => {
            return new Promise(resolve => {
                const track = this.currentTrack;

                track.addEventListener('ended', function onEnded() {
                    resolve();
                    track.removeEventListener('ended', onEnded);
                });
            });
        });
    }
    start(key) {
        return this.stop().then(() => {
            const track = this.tracks[key];
            this.currentTrack = track;
            track.play();

            return this;
        });
    }
}
