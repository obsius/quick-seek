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

get(x, 'y'); // returns y: { ... }

set(x, 'key', 'value'); // x now has property "key" with value "value"

get(x, 'y.z'); // returns 20

set(x, ['y', 'z'], true); // returns true

get(x, 'yy.0'); // returns 1

get(x, ['yy', '1']); // returns 2

```

## Contributing
Feel free to make changes and submit pull requests whenever.

## License
Quick Seek uses the [MIT](https://opensource.org/licenses/MIT) license.