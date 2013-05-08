/**
 * @author Andrew D.Laptev <a.d.laptev@gmail.com>
 */

/**
 *
 * @param {Function} fun
 */
var curry = function(fun) {
	return function(a) {  // возвращаем функцию от одного параметра
		if (fun.length == 1) {
			return fun.call(null, a);
		} else {
			return curry(fun.bind(null, a)); // рекурсия!
		}
	}
};

var sum4 = function(a, b, c, d) {
	return a + b + c + d;
};

var csum4 = curry(sum4);

console.log(sum4(1,2,3,4)); // 10
console.log(csum4(1)(2)(3)(4)); // 10

console.log(csum4.length); // 1
console.log(csum4(1).length); // 1
console.log(csum4(1)(2)(3)(4).length); // undefined, это уже не функция

csum3 = csum4(0);
sum3 = sum4.bind(null, 0); // нативный вариант с частичной применимостью лучше

function curry$(f, bound){
	var context,
		_curry = function(args) {
			return f.length > 1 ? function(){
				var params = args ? args.concat() : [];
				context = bound ? context || this : this;
				return params.push.apply(params, arguments) <
					f.length && arguments.length ?
					_curry.call(context, params) : f.apply(context, params);
			} : f;
		};
	return _curry();
}

var sum4$ = curry$(sum4);
console.log(sum4$(1)(2)(3)(4));

var curry = function(f) {
	return function(a) {
		return function(b) {
			return f(a,b);
		}
	}
};

var sum2 = function(a,b) {
	return a + b;
};

console.log(curry(sum2)(5)(10));