function identity(x) {
	return x;
}

//console.log(identity(3));

function add(x, y) {
	return x + y;
}

function add2(x) {
	return function(y) {
		return x + y;
	}
}

function mul(x, y) {
	return x * y;
}

function mul2(x) {
	return function(y) {
		return x * y;
	}
}

// console.log(add(3, 4));
// console.log(mul(3, 4));

function identityf(x) {
	return function() {
		return x;
	};
}

idf = identityf(3);

function addf(x) {
	return function(y) {
		return x + y;
	}
}

// console.log(addf(3)(4));

//function applyf(func) {
//	return func;
//}

//var addf = applyf(add2);
//console.log(addf(3)(4));

//console.log(applyf(mul2)(5)(6));


function applyf(binary) {
	return function(x) {
		return function(y) {
			return binary(x, y);
		}
	}
}

// console.log(applyf(mul)(5)(6));


function curry(binary, arg) {
	return function(x) {
		return binary(arg, x);
	}
}

// add3 = curry(add, 3);
// console.log(add3(4));
// console.log(curry(mul, 5)(6));

var inc = curry(add, 1);
//console.log(inc(5));
//console.log(inc(inc(5)));

var inc = applyf(add)(1);
// console.log(inc(5));
// console.log(inc(inc(5)));

var inc = addf(1);
// console.log(inc(5));
// console.log(inc(inc(5)));

function methodize(binary) {
	return function(y) {
		return binary(this, y);
	}
}

Number.prototype.add = methodize(add);
// console.log((4).add(3));


function demethodize (func) {
	return function(that, y) {
		return func.call(that, y);
	}
}

demethodize(Number.prototype.add)(5, 6);

function twice(func) {
	return function(x) {
		return func(x, x);
	}
}

var double = twice(add);
// console.log(double(11));

var square = twice(mul);
// console.log(square(11));

function composeu(func1, func2) {
	return function(x) {
		return func2(func1(x));
	}
}

// console.log(composeu(double, square)(3));

function composeb(f, g) {
	return function(x, y, z) {
		return g(f(x, y), z);
	}
}

// console.log(composeb(add, mul)(2, 3, 5));
/*function once(func) {
	var count = 0;

	return function(x, y) {
		count++;

		if(count >= 2){
			throw("Sorry, this function can only be called once!");
		}

		return func(x, y);
	}
}*/

// console.log(add_once(3, 4));
// console.log(add_once(3, 4));

// Crockford's version

function once(func) {
	return function() {
		var f = func;
		func = null;
		return f.apply(this, arguments);
	}
}
var add_once = once(add);
// console.log(add_once(3, 4));
// console.log(add_once(3, 4));

function counterf(val) {

	function inc() {
		return ++val;
	}

	function dec() {
		return --val;
	}

	return {
		inc: inc,
		dec: dec
	};
}

var counter = counterf(10);
// console.log(counter.inc());
// console.log(counter.dec());


function revocable(func) {

	var revoked = false;

	function invoke(val) {

		if(revoked){
			throw("func was revoked!");
		}

		return func(val);
	}

	function revoke() {
		revoked = true;
	}

	return {
		invoke: invoke,
		revoke: revoke
	};
}

// var temp = revocable(alert);
// temp.invoke(7);
// temp.revoke();
// temp.invoke(8);


