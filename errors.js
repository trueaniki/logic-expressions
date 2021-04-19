class UnexpectedSymbolError extends Error {
    constructor(symbol, index) {
        super(`Unexpected symbol ${symbol} at ${index}`)
    }
}

class IllegalCharacterError extends Error {
    constructor(char, index) {
        super(`Illegal character ${char} at ${index}`)
    }
}

class UnexpectedOperatorError extends Error {
    constructor(operator) {
        super(`Unexpected operator ${operator.type}`)
    }
}

class UnexpectedVariableError extends Error {
    constructor(variable) {
        super(`Unexpected ${variable.type === 'var' ? 'variable' : 'const'} ${variable.value}`)
    }
}

module.exports = {
    UnexpectedSymbolError,
    IllegalCharacterError,
    UnexpectedOperatorError,
    UnexpectedVariableError,
}