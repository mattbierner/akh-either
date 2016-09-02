"use strict"
const Identity = require('akh.identity').Identity
const EitherT = require('../trans/either')

/**
 * Either monad
 */
const Either = EitherT(Identity)

/**
 * Extract to an `Either` value.
 * 
 * @param m Either computation.
 */
Either.run = m => Identity.run(EitherT.run(m))

/**
 * Perform a either computation.
 * 
 * @param m Either computation.
 * @param l Left result completion.
 * @param r Right result completion.
 */
Either.either = (m, l, r) =>
    Identity.run(EitherT.either(m,
        x => Identity.of(l(x)),
        x => Identity.of(r(x))))

module.exports = Either