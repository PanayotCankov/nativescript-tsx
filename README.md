# nativescript-tsx

### Develop
To wire the `nativescript-tsx` and the `app-tsx-example` do `npm run link`.
To rebuild the plugin `npm run build`.
Then do a regular `tns run|livesync ios|android --path app-tsx-example`, (livesync with --watch may not sync plugins).

All of the above is added to `prepublish` and will happen on `npm install` anyway. Really, check the npm scripts in the package.json.

To work on the plugin `code .`, the `node_modules/nativescript-tsx` will be linked in node_modules.
You can experiment with the intellisence in the `app-tsx-example/app/main-page.tsx`.

### How does it work
The tns app need the following flags in its `tsconfig.json`:
```
  "jsx": "react",
  "reactNamespace": "UIBuilder"
```
tsx will enable tsx and tsx compilation, reactNamespace will emit "UIBuilder.createElement" instead "React.createElement",
just enough to make it work, yet show we don't support full blown React experience yet.

Also the following to references.d.ts to pull global object declarations:
```
/// <reference path="./node_modules/nativescript-tsx/tsx.d.ts" /> Enable tsx typechecking.
/// <reference path="./node_modules/nativescript-tsx/core.d.ts" /> Patch core modules with properties.
```

### Developers
Some tsx materials:
https://www.typescriptlang.org/docs/handbook/tsx.html
https://basarat.gitbooks.io/typescript/content/docs/tsx/tsx.html
http://www.jbrantly.com/typescript-and-tsx/

TODO:
The minimal UIBuilder in nativescript-tsx should be extended to handle bindings, itemTemapltes etc.

A good reference would be to check the existing XML parser and UI builder:
https://github.com/NativeScript/NativeScript/blob/master/tns-core-modules/ui/builder/builder.ts
And the component builder (attributes handling here):
https://github.com/NativeScript/NativeScript/blob/master/tns-core-modules/ui/builder/component-builder.ts

You may as well want to publish a template for using .tsx for UI declaration.
