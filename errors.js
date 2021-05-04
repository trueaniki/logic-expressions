// Общий код для лабораторных работ 1 и 2 по дисциплине ЛОИС
// Выполнено студентом группы 821701 БГУИР Никипеловым Алексеем Дмитриевичем
// Классы ошибок обработки формул

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

class NotKnfError extends Error {
    constructor(...args) {
        super(...args)
    }
}

class NotPknfError extends Error {
    constructor(...args) {
        super(...args)
    }
}

module.exports = {
    UnexpectedSymbolError,
    IllegalCharacterError,
    UnexpectedOperatorError,
    UnexpectedVariableError,
    NotKnfError,
    NotPknfError
}
