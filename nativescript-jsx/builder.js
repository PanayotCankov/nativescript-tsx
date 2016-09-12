"use strict";
var binding_builder_1 = require("ui/builder/binding-builder");
var view_1 = require("ui/core/view");
var UIBuilder = (function () {
    function UIBuilder() {
    }
    UIBuilder.createElement = function (ctor, attributes) {
        var content = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            content[_i - 2] = arguments[_i];
        }
        console.log("new " + ctor.name + "()");
        var view = new ctor();
        for (var key in attributes) {
            var value = attributes[key];
            if (isString(value) && isBinding(attributes[key])) {
                var bindOptions = binding_builder_1.getBindingOptions(key, getBindingExpressionFromAttribute(value));
                console.log(" - binding " + key);
                view.bind({
                    sourceProperty: bindOptions[binding_builder_1.bindingConstants.sourceProperty],
                    targetProperty: bindOptions[binding_builder_1.bindingConstants.targetProperty],
                    expression: bindOptions[binding_builder_1.bindingConstants.expression],
                    twoWay: bindOptions[binding_builder_1.bindingConstants.twoWay]
                }, bindOptions[binding_builder_1.bindingConstants.source]);
                continue;
            }
            if (view_1.isEventOrGesture(key, view) && typeof value === "function") {
                console.log(" - event or gesture " + key + " " + value);
                view.on(key, value);
                continue;
            }
            console.log(" - set property " + key + " to " + attributes[key]);
            view[key] = attributes[key];
        }
        if (content) {
            for (var _a = 0, content_1 = content; _a < content_1.length; _a++) {
                var child = content_1[_a];
                if (!(child instanceof view_1.View)) {
                    // Maybe comment or content not yet supported? String?
                    continue;
                }
                var name_1 = child.constructor.name;
                console.log(" - adding child: " + child + ", to parent: " + view + ", name: " + name_1);
                view._addChildFromBuilder(name_1, child);
            }
        }
        return view;
    };
    return UIBuilder;
}());
exports.UIBuilder = UIBuilder;
function isString(value) {
    return typeof value === "string" || value instanceof String;
}
function getBindingExpressionFromAttribute(value) {
    return value.replace("{{", "").replace("}}", "").trim();
}
function isBinding(value) {
    var isBinding;
    if (isString(value)) {
        var str = value.trim();
        isBinding = str.indexOf("{{") === 0 && str.lastIndexOf("}}") === str.length - 2;
    }
    return isBinding;
}
