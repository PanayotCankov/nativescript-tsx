import { getBindingOptions, bindingConstants } from "ui/builder/binding-builder";
import { View } from "ui/core/view";
import { isEventOrGesture } from "ui/core/bindable";
import { GestureTypes } from "ui/gestures/gestures";
import { Property } from "ui/core/properties";

class Setter {
    constructor(public property: Property<any, any>, public value: any) {
    }
}

export class UIBuilder {
    static createElement(ctor: { new(): any, name: string } | Property<any, any>, attributes: {}, ... content: any[]): any {
        if (ctor instanceof Property) {
            // TODO: The new property system (post 3.0) defines the properties in the modules instead of on the class.
            // Maybe property.register(class) should assign the property on the class somehow,
            // so complex properties can be checked when building from templates.
            if (content.length != 1) {
                throw new Error("Expected exactly one item for template");
            }
            return new Setter(ctor, content[0]);
        } else {
            let view = new ctor();

            for(let key in attributes) {
                let value = attributes[key];

                if (key === "class") {
                    // I regret nothing!
                    key = "className";
                }

                if (isString(value) && isBinding(attributes[key])) {
                    var bindOptions = getBindingOptions(key, getBindingExpressionFromAttribute(value));
                    // console.log(" - binding " + key);
                    view.bind({
                        sourceProperty: bindOptions[bindingConstants.sourceProperty],
                        targetProperty: bindOptions[bindingConstants.targetProperty],
                        expression: bindOptions[bindingConstants.expression],
                        twoWay: bindOptions[bindingConstants.twoWay]
                    }, bindOptions[bindingConstants.source]);
                    continue;
                }

                var isev = isEventOrGesture(key, view);
                var ison = key.startsWith("on");

                if ((isev || ison) && typeof value === "function") {
                    var mapped = key;
                    if (ison && key.length > 2) {
                        mapped = mapped[2].toLowerCase() + mapped.substr(3);
                    }
                    if (mapped in GestureTypes) {
                        mapped = GestureTypes[mapped];
                    }
                    view.on(mapped, value);
                    continue;
                }

                // console.log(" - set property " + key + " to " + value);
                view[key] = value;
            }

            if (content) {
                // content.forEach(c => console.log(" - child: " + c));
                content.filter(v => v instanceof View).forEach(child => {
                    let name = (<any>child.constructor).name;
                    view._addChildFromBuilder(name, child);
                    // console.log("Adding " + child + " to " + view);
                });
                content.filter(s => s instanceof Setter).forEach(setter => {
                    view._setValue(setter.property, setter.value);
                });
            }

            return view;
        }
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
