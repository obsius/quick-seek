# Quick Seek

Quick object property resolution. Seek path supports string, array, or number.
No type of property checks.

## Example

```js

import seek from 'quick-seek';

let x = {
	y: {
		z: 20
	},
	yy: [1, 2]
};

console.log(get(x, 'y')); // returns y: { z: 20 }

console.log(set(x, 'key', 'value')); // x.key = value | returns x

console.log(get(x, 'y.z')); // returns 20

console.log(set(x, ['y', 'z'], true)); // x.y.z = true | returns x.y

console.log(get(x, 'yy.0')); // returns 1

console.log(get(x, ['yy', '1'])); // returns 2

console.log(set(x, 'y.yy.yyy', 'z')); // x.y.yy.yyy = z (will populate empty objects) | returns y.yy.yyy

```

## Contributing
Feel free to make changes and submit pull requests whenever.

## License
Quick Seek uses the [MIT](https://opensource.org/licenses/MIT) license.