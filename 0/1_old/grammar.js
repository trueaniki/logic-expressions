const alphabet = require('alphabet')

const types = {
    CONST: 'CONST',
    SYMBOL: 'SYMBOL',
    NOT: 'NOT',
    AND: 'AND',
    OR: 'OR',
    IMPL: 'IMPL',
    EQ: 'EQ',
    LPAREN: 'LPAREN',
    RPAREN: 'RPAREN'
}

const terminals = {
    [types.CONST]: ['1','0'],
    [types.SYMBOL]: alphabet.upper,
    [types.NOT]: ['!'],
    [types.AND]: ['&'],
    [types.OR]: ['|'],
    [types.IMPL]: ['->'],
    [types.EQ]: ['~'],
    [types.LPAREN]: ['('],
    [types.RPAREN]: [')'],
}

const operators = {
    UNARY_OPERATOR: [...terminals[types.NOT]],
    BINARY_OPERATOR: [types.AND, types.OR, types.IMPL, types.EQ]
}

module.exports = {
    types,
    operators,
    terminals
}