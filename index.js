module.exports = {
	del,
	get,
	has,
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
 * @param { Boolean } detectArray - detect array type if a path part is strictly a number
 */
function run(obj, path, fn, populate = false, detectArray = false) {

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
				if (detectArray && isStrInt(path[1])) {
					obj[path[0]] = [];
				} else {
					obj[path[0]] = {};
				}
			}

			return run(obj[path[0]], path.slice(1), fn, populate, detectArray);
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
 * @param { Boolean } throwError - throw an error if the key does not exist
 */
function get(obj, path, throwError) {
	if (throwError) {
		return run(obj, path, (obj, key) => {

			if (key == null || !(key in obj)) {
				throw new Error('Path not found');
			}

			return obj[key];
		});
	} else {
		return run(obj, path, (obj, key) => key ? obj[key] : obj);
	}
}

/**
 * Check if an object has a property.
 * 
 * @param { Object } obj - object to seek a property from
 * @param { Number | String | Array } path - path to property
 */
function has(obj, path) {
	return run(obj, path, (obj, key) => key ? key in obj : false);
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
 * @param { Boolean } detectArray - detect array type if a path part is strictly a number
 */
function set(obj, path, value, detectArray = false) {
	return run(obj, path, (obj, key) => {

		if (key) {
			obj[key] = value;
		}
		
		return obj;
	}, true, detectArray);
}

/* internal */

function isStrInt(str) {

	if (typeof str == 'string') {
		for (let i = 0; i < str.length; ++i) {

			let char = str[i];

			if (
				char != '0' &&
				char != '1' &&
				char != '2' &&
				char != '3' &&
				char != '4' &&
				char != '5' &&
				char != '6' &&
				char != '7' &&
				char != '8' &&
				char != '9'
			) {
				return false;
			}
		}

		return true;
	}

	return false;
}