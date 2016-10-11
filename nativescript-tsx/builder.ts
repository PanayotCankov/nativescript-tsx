import {getBindingOptions, bindingConstants} from "ui/builder/binding-builder";
import {View, isEventOrGesture} from "ui/core/view";
import {Property} from "ui/core/dependency-observable";

class Setter {
    constructor(public property: Property, public value: any) {
    }
}

export class UIBuilder {
    static createElement(ctor: { new(): any, name: string } | Property, attributes: {}, ... content: any[]): any {
        if (ctor instanceof Property) {
            // Complex property. Wild guess - ListView.itemTemplate. Provision type introspection.
            if (content.length != 1) {
                throw new Error("Expected exactly one item for template");
            }
            return new Setter(ctor, content[0]);
        } else {
            return () => {
                let view = new ctor();
                // console.log("new " + ctor.name + "()");

                for(let key in attributes) {
                    let value = attributes[key];

                    // Because why not?
                    if (key === "class") {
                        key = "cssClass";
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

                    if (isEventOrGesture(key, view) && typeof value === "function") {
                        // console.log(" - event or gesture " + key + " " + value);
                        view.on(key, value);
                        continue;
                    }

                    // console.log(" - set property " + key + " to " + value);
                    view[key] = value;
                }

                if (content) {
                    content.filter(f => typeof f === "function").forEach(factory => {
                        let child = new factory();
                        let name = factory.name;
                        view._addChildFromBuilder(name, child);
                    });
                    content.filter(s => s instanceof Setter).forEach(setter => {
                        view._setValue(setter.property, setter.value);
                    });
                }

                return view;
            }
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
