module.exports = {
	del,
	get,
	push,
	run,
	set
};

/**
 * Run a function on an object property.
 * 
 * @param { Object } obj - object to seek a property from
 * @param { Number | String | Array } path - path to property
 * @param { Function(obj, path) } fn - fn to run on each path
 * @param { Boolean } populate - when using a function that sets a value, populate missing parts of the path
 */
function run(obj, path, fn, populate = false) {

	if (!obj || !fn || path == null) { return; }

	// number
	if (typeof path == 'number') {
		return fn(obj, path);
	}

	// string, split on period
	if (typeof path == 'string') {
		path = path.split('.');
	}

	// array
	if (Array.isArray(path)) {
		if (path.length == 0) {
			return fn(obj);
		} else if (path.length == 1) {
			return fn(obj, path[0]);
		} else {

			// create object or array if the root object is missing this part of the path
			if (populate && (!obj[path[0]] || typeof obj[path[0]] != 'object')) {
				obj[path[0]] = {};
			}

			return run(obj[path[0]], path.slice(1), fn, populate);
		}
	}
}

/**
 * Delete an object property.
 * 
 * @param { Object } obj - object to seek a property from
 * @param { Number | String | Array } path - path to property
 */
function del(obj, path) {
	return run(obj, path, (obj, key) => {
		delete obj[key];
		return obj;
	});
}

/**
 * Get an object property.
 * 
 * @param { Object } obj - object to seek a property from
 * @param { Number | String | Array } path - path to property
 */
function get(obj, path) {
	return run(obj, path, (obj, key) => key ? obj[key] : obj);
}

/**
 * Push to an object property.
 * 
 * @param { Object } obj - object to seek a property from
 * @param { Number | String | Array } path - path to property
 * @param { * } value - value to push
 */
function push(obj, path, value) {
	return run(obj, path, (obj, key) => {

		if (key) {
			obj[key].push(value);
		} else {
			obj.push(value);
		}

		return obj;
	});
}

/**
 * Set an object property.
 * 
 * @param { Object } obj - object to seek a property from
 * @param { Number | String | Array } path - path to property
 * @param { * } value - value to set property to
 */
function set(obj, path, value) {
	return run(obj, path, (obj, key) => {

		if (key) {
			obj[key] = value;
		}
		
		return obj;
	}, true);
}