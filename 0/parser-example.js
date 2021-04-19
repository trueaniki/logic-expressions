const Lexer = require('./lexer')

const {
    TOKENS,
    VARS,
    UNARY_OPERATORS,
    BINARY_OPERATORS,
    OPERATORS,
} = require('./grammar')


const parseTree = {}

let pointer = parseTree

const parseToken = token => {
    if(token === '(') {
        const parent = pointer
        pointer.formula = {parent}
        pointer = pointer.formula
    } else if(token === 'A') {
        if(!pointer.vars) pointer.vars = []
        pointer.vars.push('A')
    } else if(token === '*') {
        if(!pointer.operators) pointer.operators = []
        pointer.operators.push('*')
    } else if(token === ')') {
        pointer = pointer.parent
    }
}

('(A*(A*A)*(A*A*(A*A)))').split('').forEach(t => parseToken(t))

console.log(JSON.stringify(parseTree, (key, value) => key === 'parent' ? 'mock' : value ))