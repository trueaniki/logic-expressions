const {
    TOKENS,
    VARS,
    UNARY_OPERATORS,
    BINARY_OPERATORS,
    ARITY,
    OPERATORS,
} = require('./grammar')

const {
    UnexpectedOperatorError,
    UnexpectedVariableError,
} = require('./errors')

const Parser = () => {
    const parseTree = {}

    let pointer = parseTree

    const parseToken = token => {
        if (token.type === TOKENS.LPAREN) {
            const parent = pointer
            if(!pointer.childs) pointer.childs = []
            const formula = {parent, type: 'formula'}
            pointer.childs.push(formula)
            pointer = formula

        } else if (VARS.includes(token.type)) {
            if(!pointer.childs) pointer.childs = []
            if(pointer.childs.length === 2) throw new UnexpectedVariableError(token)
            pointer.childs.push({type: 'var', value: token.value})

        } else if (OPERATORS.includes(token.type)) {
            if (pointer.operator) throw new UnexpectedOperatorError(token)

            if(BINARY_OPERATORS.includes(token.type))
                pointer.operator = {arity: ARITY.BINARY, ...token}
            else if(UNARY_OPERATORS.includes(token.type))
                pointer.operator = {arity: ARITY.UNARY, ...token}

        } else if (token.type === TOKENS.RPAREN) {
            pointer = pointer.parent
        }
    }

    const getParseTree = () => parseTree

    return [parseToken, getParseTree]
}

module.exports = Parser
