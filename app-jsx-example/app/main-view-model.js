"use strict";
var observable = require("data/observable");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        _super.call(this);
        // Initialize default values.
        this._counter = 42;
        this.updateMessage();
    }
    Object.defineProperty(HelloWorldModel.prototype, "message", {
        get: function () {
            return this._message;
        },
        set: function (value) {
            if (this._message !== value) {
                this._message = value;
                this.notifyPropertyChange("message", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    HelloWorldModel.prototype.updateMessage = function () {
        if (this._counter <= 0) {
            this.message = "Hoorraaay! You unlocked the NativeScript clicker achievement!";
        }
        else {
            this.message = this._counter + " taps left";
        }
    };
    HelloWorldModel.prototype.onTap = function () {
        this._counter--;
        this.updateMessage();
    };
    return HelloWorldModel;
}(observable.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=main-view-model.js.map