import ImageLoader from './loaders/ImageLoader';
import SoundLoader from './loaders/SoundLoader';
import SceneBuilder from './builders/SceneBuilder';
import 'gsap';

export default class App {
    constructor(config) {
        this.TimelineMax = TimelineMax;
        this.container = config.container;
        this.soundManager = new SoundLoader(config.sound);
        this.imageManager = new ImageLoader(config.image);
        this.sceneBuilder = new SceneBuilder(this.imageManager);
    }
    ready() {
        const { container, sceneBuilder, soundManager } = this;

        return Promise.all([
            sceneBuilder.injectSlides(container),
            soundManager.ready(),
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
