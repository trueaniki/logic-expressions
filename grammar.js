const TOKENS = {
    CONST: Symbol('const'),
    SYMBOL: Symbol('symbol'),
    // NOT: Symbol('not'),
    NOT: 'NOT',
    // AND: Symbol('and'),
    AND: 'AND',
    // OR: Symbol('or'),
    OR: 'OR',
    // IMPL: Symbol('impl'),
    IMPL: 'IMPL',
    // EQ: Symbol('EQ'),
    EQ: 'EQ',
    LPAREN: Symbol('lparen'),
    RPAREN: Symbol('rparen'),
}

const VARS = [
    TOKENS.SYMBOL,
    TOKENS.CONST,
]

const UNARY_OPERATORS = [
    TOKENS.NOT,
]

const BINARY_OPERATORS = [
    TOKENS.AND,
    TOKENS.OR,
    TOKENS.IMPL,
    TOKENS.EQ,
]

const ARITY = {
    UNARY: Symbol('unary'),
    BINARY: Symbol('binary'),
}

const OPERATORS = [
    ...UNARY_OPERATORS,
    ...BINARY_OPERATORS,
]

module.exports = {
    TOKENS,
    VARS,
    UNARY_OPERATORS,
    BINARY_OPERATORS,
    ARITY,
    OPERATORS,
}