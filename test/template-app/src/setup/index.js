/*

This file prepares the app before rendering with React,
adding custom polyfills and setting up the `react-intl` provider.

You shouldn't need to edit this file.

*/

import './polyfills';

// using require to guarantee they're imported after polyfills are installed
const React = require('react');
const ReactDOM = require('react-dom');
const App = require('components/App').default;
const { IntlProvider } = require('@buildo/bento/utils');
const { loadLocale } = require('./loadLocale');

require('./addDeviceClassName');
require('theme');

export function main(mountNode) {
  ReactDOM.render((
    <IntlProvider loadLocale={loadLocale} locale='it'>
      <App />
    </IntlProvider>
  ), mountNode);
}
