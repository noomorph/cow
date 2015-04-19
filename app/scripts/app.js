/**
 * scripts/app.js
 *
 * This is a sample CommonJS module.
 * Take a look at http://browserify.org/ for more info
 */

'use strict';

var ImageManager = require('./imageManager');
var SoundManager = require('./soundManager');

function App() {
    this.soundManager = new SoundManager({
        intro: {
            ogg: 'sounds/intro.ogg',
            mp3: 'sounds/intro.mp3'
        },
        main: {
            ogg: 'sounds/main.ogg',
            mp3: 'sounds/main.mp3'
        },
        outro: {
            ogg: 'sounds/outro.ogg',
            mp3: 'sounds/outro.mp3'
        }
    });

    this.imageManager = new ImageManager({
        paths: [
          'images/cave_01.jpg',
          'images/cave_02.jpg',
          'images/cave_03.jpg',
          'images/cave_04.jpg',
          'images/cave_05.jpg',
          'images/cave_06.jpg',
          'images/cave_07.jpg',
          'images/cave_08.jpg',
          'images/cave_09.jpg',
          'images/cave_10.jpg',
          'images/cave_11.jpg',
          'images/cave_12.jpg',
          'images/cave_13.jpg',
          'images/cave_14.jpg',
          'images/cave_15.jpg',
          'images/cave_16.jpg',
          'images/cave_17.jpg',
          'images/cave_18.jpg'
        ]
    });

    console.log('app initialized');
}

App.prototype.ready = function () {
    return Promise.all([
        this.imageManager.ready().then(console.log.bind(console)),
        this.soundManager.ready().then(console.log.bind(console))
    ]);
};

module.exports = App;

App.prototype.beep = function () {
    this.ready().then(function () {
    console.log('beeping');
        this.soundManager.start('intro');
    }.bind(this), function (e) {
        console.error('fail', e);
    });
};
