# scriptoni

A set of shared scripts for your front-end apps.

## Quick start

1. `npm i --save-dev scriptoni`
2. add any script you like to your package.json (e.g. `"metarpheus": "scriptoni metarpheus"`)
3. profit!

## Scripts

- [metarpheus](#metarpheus)
- [metarpheus-diff](#metarpheus-diff)

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
