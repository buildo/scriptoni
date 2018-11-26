/*

Define here inside `bundle` the type of any additional configuration value that you'll need in your app,
and then update `production.json`, `development.json` and `local.json` accordingly.

A typical example is the "api endpoint" configuration key, ex:

bundle: t.interface({
  apiEndpoint: t.string
})

Any config value can be overridden at build time by providing an environment variable with the appropriate name.
This envs variables are namspaced under `CONFIG_`.
For instance, to override the `apiEndpoint` configuration key, your CI can run:

CONFIG_API_ENDPOINT=/myDevApi yarn run build

*/

const t = require('io-ts');

module.exports = t.strict({
  port: t.union([t.undefined, t.number]),
  bundle: t.interface({
    apiEndpoint: t.string
  })
});
