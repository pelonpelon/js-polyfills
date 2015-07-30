// taken from You Don't Know Javascript via MDN
// https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch2.md

/***

Note: The bind(..) polyfill shown below differs from the built-in bind(..) in
ES5 with respect to hard-bound functions that will be used with new.

The primary reason for this behavior is to create a function (that can be used
with new for constructing objects) that essentially ignores the this hard
binding but which presets some or all of the function's arguments. One of the
capabilities of bind(..) is that any arguments passed after the first this
binding argument are defaulted as standard arguments to the underlying function
(technically called "partial application", which is a subset of "currying").

Example:
function foo(p1,p2) {
    this.val = p1 + p2;
}

// using `null` here because we don't care about
// the `this` hard-binding in this scenario, and
// it will be overridden by the `new` call anyway!
var bar = foo.bind( null, "p1" );

var baz = new bar( "p2" );

baz.val; // p1p2

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

