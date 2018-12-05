# scriptoni

A set of shared scripts for your front-end apps.

## Quick start

1. `yarn add --dev scriptoni`
2. add any script you like to your package.json (e.g. `"metarpheus": "scriptoni metarpheus"`)
3. profit!

## Scripts

- [metarpheus](#metarpheus)
- [metarpheus-diff](#metarpheus-diff)
- [stylelint](#stylelint)
- [webpack](#webpack)

### `metarpheus`

Metarpheus generates io-ts-annotated TS models based on your Scala API. To use,
add this script to your `package.json`:

```js
"metarpheus": "scriptoni metarpheus"
```

By default, Metarpheus will look for your API at `../api/src/main/scala`, but
you can override this (and many other option) by creating a `metarpheus-config.js` file in
your project directory.
If this file is found, it will be merged with [scriptoni's default configuration](src/scripts/metarpheus/config.ts). Only the options you specify will be overridden.


### `metarpheus-diff`

`metarpheus-diff` performs a diff between the existing generated models/api and the new ones. It can be used on a CI server to catch uncommitted updates to generated models and api.

Its configuration is identical to the one of the `metarpheus` script.


### `stylelint`

`stylelint` is used to enforce coding style to your sass files. Scriptoni provides a basic configuration for it, extending buildo's shared config: [stylelint-config](https://github.com/buildo/stylelint-config/).

To use this tool:

add the following script to your `package.json`:

```json
"lint-style": "scriptoni lint-style"
```

add a `.stylelintrc` file in the root folder of your project structured as follows:

```js
{
  "extends": "./node_modules/scriptoni/lib/scripts/stylelint/stylelintrc.json"
  // your custom rules here
  ...
}
```

Scriptoni also provides autofixing capabilities by adding the following script to your `package.json`:

```json
"lint-style-fix": "scriptoni stylefmt"
```

**Note**: you can pass any argument you would pass to ``stylelint` or `stylefmt` executables. By default, `stylelint` and `stylefmt` will analyze any `.scss` in you `/src` directory.
You can analyze a different path by passing it as main arg to the script:

```json
"lint-style": "scriptoni lint-style source/**/*.css"
```

### `webpack`

Bundling your application with webpack is awesome. What's less awesome is having to configure it on every single project. `scriptoni` provides a default battle-tested webpack configuration for both development and production builds.

Add these scripts to your `package.json`:

```json
"start": "UV_THREADPOOL_SIZE=20 scriptoni web-dev -c ./config",
"build": "UV_THREADPOOL_SIZE=20 scriptoni web-build -c ./config"
```

where:

- the `UV_THREADPOOL_SIZE` trick is a workaround for a known issue with the sass-loader (https://github.com/webpack-contrib/sass-loader/issues/100). *You'll need this only if your project has more than a few `.sass` files*
- the `-c ./config` points to a **directory** containing the configurations for your project (read more below).

**`./config` directory**

The `config` directory should include:
- a `Config.ts` file. It should export a `io-ts` type validating the configuration. Currently only `port` is strictly required by scriptoni webpack to work
- any of `production.json`, `development.json`, `local.json` (all are optional): production and development should be tracked in version control, they are the default/base for `NODE_ENV=production` and `=development`, respectively. `local.json` is inteded to be used for custom, per-developer config tweaks, and should not be committed.

The final configuration used to run webpack is obtained by merging `development.json` (`production.json` if `NODE_ENV=production`), `local.json` (which takes precedence) and (with maximum priority) environment variables corresponding to single config keys.

Environment variables follow this rule: to affect e.g. the `title: t.String` config key, you can provide the `CONFIG_TITLE=title` variable before running `scriptoni web-dev` (or `web-build`).

The virtual 'config' module obtained is available as `import config from 'config'` anywhere in your code base.

Not every config keys is actually part of the final bundle, In other words, not every config key is visible to TS code when importing from 'config'. The bundled configs should be specified as part of a sub-key `bundle`:
```js
// config/Config.ts
t.interface({
  port: t.Integer,
  bundle: t.interface({
    apiEndpoint: t.String
  }, { strict: true })
}, { strict: true })

// config/local.json
{
  "port": 8080 // non-bundled, this is available to webpack but not to TS code,
  "bundle": {
    "apiEndpoint": "example.com" // bundled, you can use `config.apiEndpoint` from TS code
  }
}
```

See https://github.com/buildo/webseed/tree/master/config for an example/minimal configuration.

**custom Webpack config**

The default webpack config shipped with scriptoni should be fine in most cases. However, you may need to change something.
If this is the case, you can override the default config by passing an additional `--webpackConfig` argument, followed by the file path containing your override function.

Let's say, for example, you want to change the output library.
You can provide a `webpack.config.js` file in the root directory of your project, with the following content:

```js
module.exports = (defaultConfig, { config, paths, NODE_ENV, bundleAnalyzer, target }) => ({
  ...defaultConfig,
  output: {
    ...config.output,
    library: 'myclient'
  }
});
```

As you can see, your function will receive the default webpack config as first argument, followed by an object containing useful options:
- `config`: the app config (see the previous chapter)
- `paths`: the map of the paths used by your project
- `NODE_ENV`: 'development' or 'production'
- `bundleAnalyzer`: `true` or `false`

As a last step, you can change the `start` and `build` scripts in your `package.json` file by adding `--webpackConfig ./webpack.config.js` at the end of both commands:

```json
"start": "UV_THREADPOOL_SIZE=20 scriptoni web-dev -c ./config --webpackConfig ./webpack-config.js",
"build": "UV_THREADPOOL_SIZE=20 scriptoni web-build -c ./config --webpackConfig ./webpack-config.js"
```
