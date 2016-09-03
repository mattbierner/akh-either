/**
 * Either monad transformer.
 */
"use strict"
const spec = require('akh.core.spec')
const EitherMonad = require('../spec/either')

const Right = x => ({ right: true, value: x})

const Left = x => ({ left: true, value: x})

/* Transformer
 ******************************************************************************/
const runEitherT = m => m._run

/**
 * Either monad transformer.
 * 
 * @param m Base monad.
 */
const EitherT = m => {
    const Instance = function(run) {
        this._run = run
    }
    
    spec.Monad(Instance,
        x => new Instance(m.of(Right(x))),
        
        function(f) {
            return new Instance(
                runEitherT(this).chain(x =>
                    x.right
                        ?runEitherT(f(x.value))
                        :m.of(Left(x.value))))
        })
    
    spec.Monoid(Instance,
        new Instance(
            m.of(Left(m.zero))),
        
        function(b) {
            return new Instance(
                runEitherT(this).chain(x =>
                    x.right
                        ?m.of(Right(x.value))
                        :runEitherT(b)))
        })
    
    spec.Transformer(Instance, m,
        t =>
            new Instance(
                t.chain(x => m.of(Right(x)))))
    
    EitherMonad(Instance, {
        left: x => new Instance(m.of(Left(x))),
        right: Instance.of
    })

    Instance.prototype.run = function() {
        return EitherT.run(this)
    }

    Instance.prototype.either = function(l, r) {
        return EitherT.either(this, l, r)
    }

    return Instance
}

/**
 * Get an inner monad of an `Either` value.
 * 
 * @param m EitherT computation.
 */
EitherT.run = runEitherT

/**
 * Perform an either computation with mapping functions.
 * 
 * @param m EitherT computation.
 * @param l Left completion function that maps left value to inner monad.
 * @param r Right completion function that maps right value to inner monad.
 */
EitherT.either = (m, l, r) =>
    runEitherT(m)
        .chain(x => x.right ? r(x.value) : l(x.value))


module.exports = EitherT
