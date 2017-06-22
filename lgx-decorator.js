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
                this._baseClass.prototype.decorate = function () {

                    return decorate.apply(this, [$this, ...arguments]);

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

        decoration({decorMethod, fnDecor, name}) {
            let $this = this;
            if ($this._baseClass.prototype[decorMethod]) {
                if (Object.keys($this._methodDecorate).includes(decorMethod)) {
                    $this._addNewFnDocorate({decorMethod, fnDecor, name});
                } else {

                    $this._methodDecorate[decorMethod] = $this._baseClass.prototype[decorMethod];
                    $this._baseClass.prototype[decorMethod] = function () {
                        useMethod = decorMethod;
                        return $this._methodDecorate[decorMethod].apply(this, arguments);

                    };

                    $this._createFnDecorator({decorMethod, fnDecor, name})

                }

            } else if ($this._baseClass[decorMethod]) {
                if (Object.keys($this._methodDecorate).includes(decorMethod)) {
                    $this._addNewFnDocorate({decorMethod, fnDecor, name});
                } else {

                    $this._methodDecorate[decorMethod] = $this._baseClass[decorMethod];
                    $this._baseClass[decorMethod] = function () {
                        useMethod = decorMethod;
                        return $this._methodDecorate[decorMethod].apply(this, arguments);

                    };
                    $this._createFnDecorator({decorMethod, fnDecor, name})

                }

            } else {
                throw Error('Decoration method not exist in this Object');
            }
        }
    }

    return Decorator;

})();

