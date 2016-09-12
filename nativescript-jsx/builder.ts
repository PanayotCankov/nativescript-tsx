import {getBindingOptions, bindingConstants} from "ui/builder/binding-builder";
import {View, isEventOrGesture} from "ui/core/view";

export class UIBuilder {
    static createElement(ctor: { new(): any, name: string }, attributes: {}, ... content: any[]) {
        console.log("new " + ctor.name + "()");
        let view = new ctor();

        for(let key in attributes) {
            let value = attributes[key];
            if (isString(value) && isBinding(attributes[key])) {
                var bindOptions = getBindingOptions(key, getBindingExpressionFromAttribute(value));
                console.log(" - binding " + key);
                view.bind({
                    sourceProperty: bindOptions[bindingConstants.sourceProperty],
                    targetProperty: bindOptions[bindingConstants.targetProperty],
                    expression: bindOptions[bindingConstants.expression],
                    twoWay: bindOptions[bindingConstants.twoWay]
                }, bindOptions[bindingConstants.source]);
                continue;
            }

            if (isEventOrGesture(key, view) && typeof value === "function") {
                console.log(" - event or gesture " + key + " " + value);
                view.on(key, value);
                continue;
            }

            console.log(" - set property " + key + " to " + attributes[key]);
            view[key] = attributes[key];
        }

        if (content) {
            for (let child of content) {
                if (!(child instanceof View)) {
                    // Maybe comment or content not yet supported? String?
                    continue;
                }
                let name = child.constructor.name;
                console.log(" - adding child: " + child + ", to parent: " + view + ", name: " + name);
                view._addChildFromBuilder(name, child);
            }
        }

        return view;
    }
}

function isString(value: any): boolean {
    return typeof value === "string" || value instanceof String;
}

function getBindingExpressionFromAttribute(value: string): string {
    return value.replace("{{", "").replace("}}", "").trim();
}

function isBinding(value: any): boolean {
    var isBinding;

    if (isString(value)) {
        var str = value.trim();
        isBinding = str.indexOf("{{") === 0 && str.lastIndexOf("}}") === str.length - 2;
    }

    return isBinding;
}
