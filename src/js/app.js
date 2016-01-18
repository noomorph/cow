import ImageLoader from './loaders/ImageLoader';
import SoundLoader from './loaders/SoundLoader';
import 'gsap';

export default class App {
    constructor(config) {
        this.TimelineMax = TimelineMax;
        this.soundManager = new SoundLoader(config.sound);
        this.imageManager = new ImageLoader(config.image);
    }
    ready() {
        return Promise.all([
            this.imageManager.ready(),
            this.soundManager.ready(),
        ]);
    }
    testSound() {
        const { soundManager } = this;

        return Promise.resolve()
            .then(() => soundManager.play('intro'))
            .then(() => soundManager.play('main'))
            .then(() => soundManager.play('outro'))
            .catch(e => console.error(e)); // eslint-disable-line no-console
    }
}
