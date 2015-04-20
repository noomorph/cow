/**
 * scripts/app.js
 *
 * This is a sample CommonJS module.
 * Take a look at http://browserify.org/ for more info
 */

'use strict';

var config = require('./configuration.js');
var ImageManager = require('./imageManager');
var SoundManager = require('./soundManager');

function App() {
    this.soundManager = new SoundManager(config.soundManager);
    this.imageManager = new ImageManager(config.imageManager);

    console.log('app initialized');
}

App.prototype.ready = function () {
    return Promise.all([
        this.imageManager.ready(),
        this.soundManager.ready()
    ]);
};

module.exports = App;

App.prototype.beep = function () {
    this.ready().then(function () {
        console.log('beeping');
        this.soundManager.play('intro')
            .then(function (soundManager) {
                return soundManager.play('main');
            });
    }.bind(this), function (e) {
        console.error('fail', e);
    });
};
