'use strict';
import App from './app';
import defaultAppConfig from './config';
import { assign } from 'lodash';

import 'less/app';

const appConfig = assign(defaultAppConfig, {
    container: document.getElementById('screen'),
});

const app = new App(appConfig);

const ready = app.ready();

ready.then(() => app.testSound());
// ready.then(() => {
//     const tl = buildTimeline(appConfig.container);
//     tl.play();
// });
