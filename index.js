module.exports = {
	get,
	set
};

/**
 * Get an object property.
 * 
 * @param { Object } obj - object to seek a property from
 * @param { Number | String | Array } path - path to property
 */
function get(obj, path) {

	// no path, return object
	if (!path) {
		return obj;
	}

	// number
	if (typeof path == 'number') {
		return obj[path];
	}

	// string, split on period
	if (typeof path == 'string') {
		path = path.split('.');
	}

	// array
	if (Array.isArray(path) && path.length) {
		return get(obj[path[0]], path.slice(1));
	}

	return obj;
}

/**
 * Set an object property.
 * 
 * @param { Object } obj - object to seek a property from
 * @param { Number | String | Array } path - path to property
 * @param { * } value - value to set property to
 */
function set(obj, path, value) {

	// no path, return
	if (!path) { return; }

	// number
	if (typeof path == 'number') {
		obj[path] = value;
		return;
	}

	// string, split on period
	if (typeof path == 'string') {
		path = path.split('.');
	}

	// array
	if (Array.isArray(path) && path.length) {
		if (path.length == 1) {
			obj[path[0]] = value;
		} else {
			set(obj[path[0]], path.slice(1), value);
		}
	}
}