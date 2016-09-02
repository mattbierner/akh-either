"use strict"

/**
 * Either monad interface
 */
const EitherMonad = (Instance, spec) => {
    /**
     * M.right(x)
     * 
     * Right monad value
     */
    Instance.right = Instance.prototype.right = spec.right
    
    /**
     * M.left(x)
     * 
     * Left monad value
     */
    Instance.left = Instance.prototype.left = spec.left
}

module.exports = EitherMonad
