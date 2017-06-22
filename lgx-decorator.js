'use strict';

window.Decorator = (() => {
    'use strict';

    let decorate = function (decoratorClass, className, args) {

        let afterDecore = void 0;
        let $this = this;

        if (useMethod.length === 0) {
            throw Error('Not find method for use decorate');
        } else if (typeof className === 'string') {

            afterDecore = decoratorClass._methodDecorateFn[useMethod][className].apply(this, args);

        } else if (typeof className === 'object' && !Array.isArray(className)) {
            //todo Obiekt jako kolejne dekoratory do wykonania
        } else {
            throw Error('Invalid decorator name!');
        }

        useMethod = '';

        return afterDecore;


    };

    let useMethod = '';

    class Decorator {

        constructor(baseClass) {
            let $this = this;
            this._baseClass = void 0;
            this._methodDecorate = {};
            this._methodDecorateFn = {};

            if (!baseClass || !(baseClass instanceof Object)) {
                throw Error('Class required!');
            } else {
                this._baseClass = baseClass;
                if (this._baseClass.prototype) {
                    this._baseClass.prototype.decorate = function () {
                        return decorate.apply(this, [$this, ...arguments]);
                    }
                } else {
                    this._baseClass.__proto__.decorate = function () {
                        return decorate.apply(this, [$this, ...arguments]);
                    }
                }
            }
        }

        _addNewFnDocorate({decorMethod, fnDecor, name}) {
            let $this = this;
            if ($this._methodDecorateFn[decorMethod][name]) {
                throw Error('Decorator exist!');
            } else {
                $this._methodDecorateFn[decorMethod][name] = fnDecor;
            }
        }

        _createFnDecorator({decorMethod, fnDecor, name}) {
            let $this = this;
            $this._methodDecorateFn[decorMethod] = {};
            $this._methodDecorateFn[decorMethod][name] = fnDecor;
        }

        _replaceMethod({decorMethod}, fix) {
            let $this = this;
            return function () {
                useMethod = decorMethod;
                let _return = $this._methodDecorate[decorMethod].apply(this, arguments);
                if (fix) {
                    Object.defineProperty(_return, 'decorate', {
                        enumerable: false,
                        configurable: false,
                        get: function () {
                            return function () {
                                return decorate.apply(this, [$this, ...arguments]);
                            };
                        }
                    });
                }
                return _return;
            };
        }

        decoration({decorMethod, fnDecor, name}, fix) {
            let $this = this;

            if ($this._baseClass.prototype && $this._baseClass.prototype[decorMethod]) {
                if (Object.keys($this._methodDecorate).includes(decorMethod)) {
                    $this._addNewFnDocorate({decorMethod, fnDecor, name});
                } else {
                    $this._methodDecorate[decorMethod] = $this._baseClass.prototype[decorMethod];
                    $this._baseClass.prototype[decorMethod] = $this._replaceMethod({decorMethod, fnDecor, name}, fix);
                    $this._createFnDecorator({decorMethod, fnDecor, name})
                }

            } else if ($this._baseClass.__proto__ && $this._baseClass.__proto__[decorMethod]) {
                if (Object.keys($this._methodDecorate).includes(decorMethod)) {
                    $this._addNewFnDocorate({decorMethod, fnDecor, name});
                } else {
                    $this._methodDecorate[decorMethod] = $this._baseClass.__proto__[decorMethod];
                    $this._baseClass.__proto__[decorMethod] = $this._replaceMethod({decorMethod, fnDecor, name}, fix);
                    $this._createFnDecorator({decorMethod, fnDecor, name})
                }
            } else if ($this._baseClass[decorMethod]) {
                if (Object.keys($this._methodDecorate).includes(decorMethod)) {
                    $this._addNewFnDocorate({decorMethod, fnDecor, name});
                } else {
                    $this._methodDecorate[decorMethod] = $this._baseClass[decorMethod];
                    $this._baseClass[decorMethod] = $this._replaceMethod({decorMethod, fnDecor, name}, fix);
                    $this._createFnDecorator({decorMethod, fnDecor, name})
                }
            } else {
                throw Error('Decoration method not exist in this Object');
            }
        }
    }

    return Decorator;

})();

