/**
 * @author Andrew D.Laptev <a.d.laptev@gmail.com>
 */
b = 13;
function a() {
	var b = 42;
	eval('var d = function(){console.log(b);}');
	var c = new Function('console.log(b);');
	c();
}

a();
c();