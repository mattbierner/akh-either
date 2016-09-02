Either monad transformer for [Akh Javascript Monad library](https://github.com/mattbierner/akh)


The EitherT transformer, `EitherT`, adds either values to a monad. The base type, `Either`, provides either computation logic on its own.

The `EitherT` and `Either` is a monad, functor, and applicative functor.

```js
// Either monad
require('akh.either').Either
require('akh').Either

// Either monad transformer
require('akh.either').EitherT
require('akh').EitherT
```

## Running

#### `Either::run(m)`
Perform a continuation computation `m` and get the result as an `Either`. `Either` has a `value` property plus either a `left` or `right` property to show its type

```js
const Either = requre('akh.either').Either

Either.run(Either.right(4)) === { right: true, value: 4 }
Either.run(Either.left(-1)) === { left: true, value: -1 }
```

#### `EitherT::run(m)`
Same as `Either.run` but for a monad transformer. Returns an `Either` value inside of the inner monad.


#### `Either::either(m, leftCallback, rightCallback)`
Perform a continuation computation `m` and invoke `leftCallback` for `left` results and `rightCallback` for `right` results.

```js
const Either = requre('akh.either').Either

const c = Either.of(3)
        .map((x) => -x);

Either.either(c, console.error, console.log); // logs: -3
```

#### `EitherT::either(m, leftCallback, rightCallback)`
Same as `Either::either` but for transformed types


## Either Interface

#### `Either.right(x)`
#### `EitherT(m).right(x)`
Construct a right value. 

This is the same as `of` since right values are considered the normal case. 

#### `Either.left(x)`
#### `EitherT(m).left(x)`
Construct a left value.

Left values are considered the error case and do not have `map` or `chain` applied to them.

```js
const c = Either.left(3)
        .map((x) => -x);

Either.either(c, console.error, console.log); // errors: 3
```
