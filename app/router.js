import EmberRouter from '@ember/routing/router';
import config from 'download-list/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('files', { path: '/files' });

});
