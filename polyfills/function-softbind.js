/***
https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch2.md

The softBind(..) utility provided here works similarly to the built-in ES5
bind(..) utility, except with our soft binding behavior. It wraps the specified
function in logic that checks the this at call-time and if it's global or
undefined, uses a pre-specified alternate default (obj). Otherwise the this is
left untouched. It also provides optional currying (see the bind(..) discussion
earlier).

Example:

function foo() {
   console.log("name: " + this.name);
}

var obj = { name: "obj" },
    obj2 = { name: "obj2" },
    obj3 = { name: "obj3" };

var fooOBJ = foo.softBind( obj );

fooOBJ(); // name: obj

obj2.foo = foo.softBind(obj);
obj2.foo(); // name: obj2   <---- look!!!

fooOBJ.call( obj3 ); // name: obj3   <---- look!

setTimeout( obj2.foo, 10 ); // name: obj   <---- falls back to soft-binding

The soft-bound version of the foo() function can be manually this-bound to obj2
or obj3 as shown, but it falls back to obj if the default binding would
otherwise apply.

***/

if (!Function.prototype.softBind) {
    Function.prototype.softBind = function(obj) {
        var fn = this,
            curried = [].slice.call( arguments, 1 ),
            bound = function bound() {
                return fn.apply(
                    (!this ||
                        (typeof window !== "undefined" &&
                            this === window) ||
                        (typeof global !== "undefined" &&
                            this === global)
                    ) ? obj : this,
                    curried.concat.apply( curried, arguments )
                );
            };
        bound.prototype = Object.create( fn.prototype );
        return bound;
    };
}


