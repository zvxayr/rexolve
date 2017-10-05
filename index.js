function rexolve(valuePromise) {
	return Promise.resolve(valuePromise).then(value => {
		if (value.constructor == Object) {
			// Place object contents on arrays to parse in parrallel
			let keys = [], contents = [];
			for (let key in value) {
				keys.push(key);
				contents.push(value[key]);
			}

			return Promise.all(contents.map(rexolve)).then(resolved => {
				let result = {};
				for (let index in keys) {
					let key = keys[index],
						content = resolved[index];
					result[key] = content;
				}
				return result;
			});

		} else if (value.constructor == Array) {
			// Parse array
			return Promise.all(value.map(rexolve));
		} else {
			return value;
		}
	});
}

module.exports = rexolve;
