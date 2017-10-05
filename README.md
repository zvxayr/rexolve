# rexolve
A lightweight Promise.all for Objects

## Installation

```sh
npm install rexolve --save
```

## API
```javascript
const rexolve = require('rexolve');
```

## Usage

```javascript
// Object can be nested with arrays and objects indefinitely
rexolve({
    foo: Promise.resolve('bar')
}).then(result => {
    // result == { foo: 'bar' }
});

// Value caught would be the first error thrown
rexolve({
    foo: Promise.reject('bar')
}).catch(error => {
    // error == 'bar'
});
```

## License

MIT
