
// declare module "ui/core/view" {
//     import {EventData} from "data/observable";
//     export type EventHandler = string | { (args: EventData): void };

//     export interface ViewProps {
//         /**
//          * An id to reference the view.
//          */
//         id?: string;

//         /**
//          * Sets the CSS classes on the view.
//          */
//         class?: string;
//     }

//     export interface View {
//         props: ViewProps;
//     }
// }

// declare module "ui/page" {

//     import {ViewProps, EventHandler} from "ui/core/view";

//     export interface PageProps {
//         navigatingTo?: EventHandler;
//         navigatedTo?: EventHandler;
//         loaded?: EventHandler;
//         navigatingFrom?: EventHandler;
//         navigatedFrom?: EventHandler;
//     }
//     export interface Page {
//         props: PageProps;
//     }
// }

// declare module "ui/layouts/stack-layout" {
//     import {ViewProps} from "ui/core/view";
//     export interface StackLayoutProps extends ViewProps {
//         /**
//          * Sets whether the StackLayout will lay its children horizontally or vertically.
//          */
//         orientation?: "horizontal" | "vertical"
//     }
//     /**
//      * A simple layout that places its children in a single row or column.
//      */
//     export interface StackLayout {
//         props: StackLayoutProps;
//     }
// }

// declare module "ui/label" {
//     import {ViewProps} from "ui/core/view";
//     export interface LabelProps extends ViewProps {
//         /**
//          * The text displayed in the Label.
//          */
//         text?: string;

//         /**
//          * Wether the text can be wrapped on multiple lines.
//          */
//         textWrap?: boolean;
//     }
//     /**
//      * A simple view that displays some text.
//      */
//     export interface Label {
//         props: LabelProps;
//     }
// }

// declare module "ui/button" {
//     import {EventData} from "data/observable";
//     import {ViewProps, EventHandler} from "ui/core/view";
//     export interface ButtonProps extends ViewProps {
//         /**
//          * The text displayed in the button.
//          */
//         text?: string

//         tap?: EventHandler;
//     }
//     /**
//      * A tappable button view. Can trigger manual code upon taps.
//      */
//     export interface Button {
//         props: ButtonProps;
//     }
// }
