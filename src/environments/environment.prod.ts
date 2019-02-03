import * as _ from 'lodash';
import * as _default from '../../env.angular.default.js';
import * as _env from '../../env.angular.js';

const env = _.merge(_default, _env);

export const environment = {
    production: true,
    websocket: env.websocket
};
