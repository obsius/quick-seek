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
 */
function run(obj, path, fn) {

	if (!obj || !path || !fn) { return; }

	// number
	if (typeof path == 'number') {
		fn(obj, path);
	}

	// string, split on period
	if (typeof path == 'string') {
		path = path.split('.');
	}

	// array
	if (Array.isArray(path) && path.length) {
		if (path.length == 1) {
			return fn(obj, path[0]);
		} else {
			return run(obj[path[0]], path.slice(1), fn);
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
	return run(obj, path, (obj, key) => obj[key]);
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
		obj[key].push(value);
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
		obj[key] = value;
		return obj;
	});
}