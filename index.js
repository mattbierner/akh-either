"use strict"
const EitherT = require('./trans/either');
const Either = require('./type/either');

module.exports = {
    EitherT: EitherT,
    Either: Either,

    trans: { either: EitherT },
    type: { either: Either }
};
