"use strict";
var page_1 = require("ui/page");
var stack_layout_1 = require("ui/layouts/stack-layout");
var label_1 = require("ui/label");
var button_1 = require("ui/button");
// Provide the UIBuilder used by tsx output to querry createElement calls.
var nativescript_jsx_1 = require("nativescript-jsx");
var main_view_model_1 = require("./main-view-model");
function navigatingTo(args) {
    console.log("Get that context...");
    var page = args.object;
    page.bindingContext = new main_view_model_1.HelloWorldModel();
}
exports.createPage = function () {
    return nativescript_jsx_1.UIBuilder.createElement(page_1.Page, {navigatingTo: navigatingTo}, " ", nativescript_jsx_1.UIBuilder.createElement(stack_layout_1.StackLayout, {orientation: "vertical"}, nativescript_jsx_1.UIBuilder.createElement(label_1.Label, {text: "{{ message }}", class: "message", textWrap: true}), " ", nativescript_jsx_1.UIBuilder.createElement(button_1.Button, {text: "Button", tap: "{{ onTap }}"}), " "));
};
//# sourceMappingURL=main-page.js.map