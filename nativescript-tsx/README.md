### TSX support in NativeScript apps

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

You can a Page UI in page such as `main-page.tsx`:
``` TypeScript
import {View} from "ui/core/view";
import {Page} from "ui/page";
import {StackLayout} from "ui/layouts/stack-layout";
import {Label} from "ui/label";
import {Button} from "ui/button";
import {EventData} from "data/observable";

// Provide the UIBuilder used by tsx output to querry createElement calls.
import {UIBuilder} from "nativescript-tsx";

import { HelloWorldModel } from "./main-view-model";

function navigatingTo(args: EventData) {
    console.log("Get that context...");
    let page = args.object as Page;
    page.bindingContext = new HelloWorldModel();
}

export var createPage =
<Page navigatingTo={navigatingTo}>
    <StackLayout orientation="vertical">
        <Label text="Tap the button" class="title" /> 
        <Button text="TAP" tap="{{ onTap }}" />
        <Label text="{{ message }}" class="message" textWrap={true} />
    </StackLayout>
</Page>;
```