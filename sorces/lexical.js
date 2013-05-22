/**
 * @author Andrew D.Laptev <a.d.laptev@gmail.com>
 */

var fn = function() {
	var thing = 41;
	return function() {
		console.log(++thing);
	}
}();
fn();
fn();