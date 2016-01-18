'use strict';
import App from './app';
import appConfig from './config';
import { buildTimeline } from './timelines/test';

import 'less/app';

const app = new App(appConfig);

const ready = app.ready();

ready.then(() => app.testSound());
ready.then(() => {
    const container = document.getElementById('screen');
    const tl = buildTimeline(container);
    tl.play();
});
