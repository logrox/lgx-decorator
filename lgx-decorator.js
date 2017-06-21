'use strict';

let decorator = (() => {
    'use strict';

    let decorate = (className,args) => {
        if(typeof className === 'string'){

        }else if(typeof className === 'object' && !Array.isArray(className)){

        }else {
            throw Error('Invalid decorator name!');
        }
     };

    class Decorator {
        _baseClass = void 0;
        constructor(baseClass) {
            if (!baseClass || baseClass instanceof Object) {
                throw Error('Class required!');
            } else {
                this._baseClass = baseClass;
            }
        }
        decoration({ decorMethod, fnDecore, name }) {
            if (this._baseClass.prototype[decorMethod]) {

            } else {
                throw Error('Decration method not exist in this Object');
            }
        }
    };

    return Decorator;

})();

export {
    decorator
};

let decoratorString = new decorator(String);
decoratorString.decoration({
    decorMethod: 'small',
    name: 'class',
    fnDecore: (self, args) => {

    }
});

/**
 * @example
  var text = 'Test TEXT';
  text
    .small()
    .decorate('class', ['small__color--red'])
    .decorate('transparent-hover', [0.67]);

  text
    .small()  
    .decorate({
        'class': ['small__color--red'],
        'transparent-hover': [0.67]
    });

  text === '<small class="small__color--red">Test TEXT</small>';
 */
