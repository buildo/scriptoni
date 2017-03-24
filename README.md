# scriptoni

A set of shared scripts for your front-end apps.

## Quick start

1. `npm i --save-dev scriptoni`
2. add any script you like to your package.json (e.g. `"metarpheus": "scriptoni metarpheus"`)
3. profit!

## Scripts

- [metarpheus](#metarpheus)
- [metarpheus-diff](#metarpheus-diff)
- [eslint & stylelint](#eslint-and-stylelint)

### `metarpheus`

Metarpheus generates tcomb-annotated JS models based on your Scala API. To use,
add this script to your `package.json`:

```js
"metarpheus": "scriptoni metarpheus"
```

By default, Metarpheus will look for your API at `../api/src/main/scala`, but
you can override this (and many other option) by creating the following files in
your project directory:

* `metarpheus-config.js` - if this file is found, it will be merged with the
  [default options](src/scripts/metarpheus/config.js). Only the options you
  specify will be overridden.
* `metarpheus-config.scala` - if this file is found, it will completely replace
  the [default Scala config](src/scripts/metarpheus/config.scala).

### `metarpheus-diff`

`metarpheus-diff` performs a diff between the existing generated models/api and the new ones. It can be used on a CI server to catch uncommitted updates to generated models and api.

Its configuration is identical to the one of the `metarpheus` script.


### `eslint and stylelint`

`eslint` and `stylelint` are used to enforce coding style to your js or sass files. Scriptoni provides a basic config for both of them, extending buildo's shared configs: [eslint-config](https://github.com/buildo/eslint-config) and [stylelint-config](https://github.com/buildo/stylelint-config/). To use these tools, add the following scripts to your `package.json`:

```json
"lint": "scriptoni lint",
"lint-style": "scriptoni lint-style"
```

and be sure your `.eslintrc` and `.stylelintrc` files in the root folder of your project contain the following:

- `.eslintrc`
```js
{
  "extends": "./node_modules/scriptoni/lib/scripts/eslint/eslintrc.json",
  // your custom rules here
  ...
}
```

- `.stylelintrc`
```js
{
  "extends": "./node_modules/scriptoni/lib/scripts/stylelint/stylelintrc.json"
  // your custom rules here
  ...
}
```

**Note:** If you don't have any config file in your project's root, or if you don't include the `extends` lines above, scriptoni will force our shared configs anyway, but they may be ignored by your editor or by webpack.
