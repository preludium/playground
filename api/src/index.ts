import 'module-alias/register.js';
import 'source-map-support/register.js';
import config from '@config';
import controllers from '@controller';

import App from './app';

const app = new App(
    controllers,
    config.PORT
);

app.listen();
