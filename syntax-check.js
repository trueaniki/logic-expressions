// Общий код для лабораторных работ 1 и 2 по дисциплине ЛОИС
// Выполнено студентом группы 821701 БГУИР Никипеловым Алексеем Дмитриевичем
// Функция проверки правильности синтаксиса

const {
    TOKENS,
    VARS,
    UNARY_OPERATORS,
    BINARY_OPERATORS,
    OPERATORS,
} = require('./grammar')

const {
    UnexpectedSymbolError,
        IllegalCharacterError,
        UnexpectedOperatorError,
        UnexpectedVariableError,
        NotKnfError,
        NotPknfError
} = require('./errors')

const syntaxCheck = tokens => {
    const tokenTypes = tokens.map(t => t.type)
    let parenCounter = 0
    tokenTypes.forEach((token, index, tokenArr) => {
        if(index !== tokenArr.length - 1) {
            const nextToken = tokenArr[index + 1]
            if(token === TOKENS.LPAREN) {
                if(!VARS.includes(nextToken) && nextToken !== TOKENS.LPAREN && !UNARY_OPERATORS.includes(nextToken)) throw new UnexpectedSymbolError()
            }
            if(token === TOKENS.SYMBOL) {
                if(OPERATORS.includes(nextToken) && nextToken === TOKENS.RPAREN) throw new UnexpectedSymbolError()
            }
            if(token === TOKENS.SYMBOL) {
                if(nextToken === TOKENS.SYMBOL) throw new UnexpectedSymbolError()
            }
            if(OPERATORS.includes(token)) {
                if(!VARS.includes(nextToken) && nextToken !== TOKENS.LPAREN) throw new UnexpectedSymbolError()
            }
            if(token === TOKENS.RPAREN) {
                if(!OPERATORS.includes(nextToken) && nextToken !== TOKENS.RPAREN) throw new UnexpectedSymbolError()
            }
        }
        if(token === TOKENS.LPAREN) parenCounter++
        if(token === TOKENS.RPAREN) parenCounter--
    })
    if(parenCounter !== 0) throw new Error('Wrong parenthesis')
}

module.exports = syntaxCheck
