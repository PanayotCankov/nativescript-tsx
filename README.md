# nativescript-jsx

### Develop
To wire the `nativescript-jsx` and the `app-jsx-example` do `npm run link`.
To rebuild the plugin `npm run build` or `tsc` in the `nativescript-jsx`.
Then do a regular `tns run|livesync ios|android --path app-jsx-example`, (livesync with --watch may not sync plugins).

All of the above is added to `prepublish` and will happen on `npm install` anyway. Really, check the npm scripts in the package.json.

To work on the plugin `code .`, the `node_modules/nativescript-jsx` will be linked in node_modules.
You can experiment with the intellisence in the `app-jsx-example/app/main-page.tsx`.

### How does it work
The tns app need the following flags in its `tsconfig.json`:
```
  "jsx": "react",
  "reactNamespace": "UIBuilder"
```
jsx will enable jsx and tsx compilation, reactNamespace will emit "UIBuilder.createElement" instead "React.createElement",
just enough to make it work, yet show we don't support full blown React experience yet.

Also the following to pull global object declarations:
```
/// <reference path="./node_modules/nativescript-jsx/jsx.d.ts" /> Enable JSX typechecking.
/// <reference path="./node_modules/nativescript-jsx/core.d.ts" /> Patch core modules with properties.
```

### Developers
Some JSX materials:
https://www.typescriptlang.org/docs/handbook/jsx.html
https://basarat.gitbooks.io/typescript/content/docs/jsx/tsx.html
http://www.jbrantly.com/typescript-and-jsx/

TODO:
The minimal UIBuilder in nativescript-jsx should be extended to handle bindings, itemTemapltes etc.

A good reference would be to check the existing XML parser and UI builder:
https://github.com/NativeScript/NativeScript/blob/master/tns-core-modules/ui/builder/builder.ts
And the component builder (attributes handling here):
https://github.com/NativeScript/NativeScript/blob/master/tns-core-modules/ui/builder/component-builder.ts

You may as well want to publish a template for using .tsx for UI declaration.
