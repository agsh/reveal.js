/**
 * @author Andrew D.Laptev <a.d.laptev@gmail.com>
 */
	/*
var Monad = function(bindFunction) {
	this.bind = bindFunction;
};

Monad.prototype.return = function(val) {
	this
};

function unit(value);
function bind(monad, function(value))

bind(unit(x), f) === f(x)                   // (return x >>= f) = f x согласованность return и bind. x - монада

bind(x, unit) === x                         // x >== return === x

bind(bind(monad, f), g) ===                 // ((x >>= f) >>= g) = (x >>= (\y -> f y >>= g)) ассоциативность
	bind(monad, function(value) {
	    return bind(f(value), g);
    });

function MONAD() {
	return function unit(value) {
		var monad = Object.create(null);
		monad.bind = function(func) {
			return func(value);
		}
		return monad;
	}
}

var identity = MONAD();
var monad = identity("Hello");
monad.bind(console.log).bind(console.log);


unit(value).bind(f) === f(value)
monad.bind(unit) === monad
monad.bind(f).bind(g) === monad.bind(function(value) {
	return f(value).bind(g);
})
		*/

Array.prototype.bind = function(f) {
	return Array.prototype.concat.apply([], this.map(f));
};

Array.prototype.bind = function(f) {return Array.prototype.concat.apply([], this.map(f));}; // суффиксная форма, "бинарная"

Array.prototype.return = function(x) {return [x];} // суффиксная форма
returnArray = function(x) {return [x];} // префиксная унарная

three = function(a){ return [a,a+1,a+2]; };

console.log( [1,2,3].bind(three)); // [ 1, 2, 3, 2, 3, 4, 3, 4, 5 ]


// x >== return === x
[1,2,3].bind(Array.prototype.return) // [1, 2, 3]
[1,2,3].bind(returnArray) // [1, 2, 3]

// (return x >>= f) = f x
var doubleElems = function(arr) {return arr.map(function(a){return a*2;}); };
var filterElems = function(arr) {return arr.filter(function(a){return a>3;}); };

(returnArray([1,2,3])).bind(doubleElems); // [2, 4, 6]
doubleElems([1,2,3]); // [2,4,6]

// ((x >>= f) >>= g) = (x >>= (\y -> f y >>= g))
[1,2,3].bind(three).bind(three); // [ 1, 2, 3, 2, 3, 4, 3, 4, 5, 2, 3, 4, 3, 4, 5, 4, 5, 6, 3, 4, 5, 4, 5, 6, 5, 6, 7 ]
[1,2,3].bind(function(y) { return three(y).bind(three); }); // [ 1, 2, 3, 2, 3, 4, 3, 4, 5, 2, 3, 4, 3, 4, 5, 4, 5, 6, 3, 4, 5, 4, 5, 6, 5, 6, 7 ]


// Maybe

var Maybe = function(value) {
	if (value) {
		this.value = value;
	}
};

Maybe.prototype.bind = function(f) {
	if (this.value) {
		return f(this.value)
	} else{
		return Nothing;
	}
};

var Nothing = new Maybe();

var Just1 = new Maybe(1); // new Maybe(1) instanceof Maybe
var Just2 = new Maybe(2);

var add = function(mx, my) {
	return mx.bind(function(x) {
		return my.bind(function(y) {
			return new Maybe(x + y);
		});
	});
};

