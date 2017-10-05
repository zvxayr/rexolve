var rexolve = require('./');

rexolve({
	a: Promise.resolve(0),
	b: Promise.resolve(Promise.resolve(Promise.resolve(Promise.resolve(0)))),
	c: {
		a: Promise.resolve(0),
		b: {
			a: Promise.resolve(0),
			b: [Promise.resolve('a'), Promise.resolve('b')]
		}
	},
	d: [{
		a: Promise.resolve({
			a: Promise.resolve([
				Promise.resolve('a')
			])
		})
	}],
	e: 'a'
}).then(res => {
	assert(res.a, 0);
	assert(res.b, 0);
	assert(res.c.a, 0);
	assert(res.c.b.a, 0);
	assert(res.c.b.b[0], 'a');
	assert(res.c.b.b[1], 'b');
	assert(res.d[0].a.a[0], 'a');
	assert(res.e, 'a');
}).catch(error => {
	console.error(error);
	process.exit(1);
}).then(() => {
	return rexolve({
		a: Promise.reject('error')
	});	
}).catch(error => {
	assert(error, 'error');
}).catch(error => {
	console.error(error);
	process.exit(1);
});

function assert(left, right) {
	if (left !== right)
		throw Error('Value mismatch');
}