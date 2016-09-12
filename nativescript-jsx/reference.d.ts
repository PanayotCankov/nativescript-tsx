// Private module without publically distributed .d.ts :(
declare module "ui/builder/binding-builder" {
    export function getBindingOptions(property: string, binding: string): void;
    export var bindingConstants: any;
}