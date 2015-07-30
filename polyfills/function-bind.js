// taken from You Don't Know Javascript via MDN
// https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch2.md

/***

Note: The bind(..) polyfill shown below differs from the built-in bind(..) in
ES5 with respect to hard-bound functions that will be used with new (see below
for why that's useful). Because the polyfill cannot create a function without
a .prototype as the built-in utility does, there's some nuanced indirection to
approximate the same behavior. Tread carefully if you plan to use new with
a hard-bound function and you rely on this polyfill.

***/

if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
        if (typeof this !== 'function') {
            // closest thing possible to the ECMAScript 5
            // internal IsCallable function
            throw new TypeError( 'Function.prototype.bind - what ' +
                'is trying to be bound is not callable'
            );
        }

        var aArgs = Array.prototype.slice.call( arguments, 1 ),
            fToBind = this,
            fNOP = function(){},
            fBound = function(){
                return fToBind.apply(
                    (
                        this instanceof fNOP &&
                        oThis ? this : oThis
                    ),
                    aArgs.concat( Array.prototype.slice.call( arguments ) )
                );
            }
        ;

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}

