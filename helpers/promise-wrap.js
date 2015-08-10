/*
It takes a function that expects an error-first style callback as its last
parameter, and returns a new one that automatically creates a Promise to
return, and substitutes the callback for you, wired up to the Promise
fulfillment/rejection.

Usage:
var request = Promise.wrap( ajax );

request( "http://some.url.1/" )
.then( .. )
..
*/

// polyfill-safe guard check
if (!Promise.wrap) {
    Promise.wrap = function(fn) {
        return function() {
            var args = [].slice.call( arguments );

            return new Promise( function(resolve,reject){
                fn.apply(
                    null,
                    args.concat( function(err,v){
                        if (err) {
                            reject( err );
                        }
                        else {
                            resolve( v );
                        }
                    } )
                );
            } );
        };
    };
}

