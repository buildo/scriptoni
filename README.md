# scriptoni

A set of shared scripts for your front-end apps.

## Quick start

1. `npm i --save-dev scriptoni`
2. profit!

## metarpheus

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
