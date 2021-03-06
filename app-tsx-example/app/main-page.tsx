// Better re-export these in a single module... God, I can't wait for ES6 module syntax.
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

export var createPage = () =>
<Page navigatingTo={navigatingTo}>
    <StackLayout orientation="vertical">
        <Label text="Tap the button" class="title" /> 
        <Button text="TAP" tap="{{ onTap }}" />
        <Label text="{{ message }}" class="message" textWrap={true} />
    </StackLayout>
</Page>;
