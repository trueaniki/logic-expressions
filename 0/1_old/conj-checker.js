const {operators, types} = require('./grammar')

const conjChecker = tokens => {
    const isAllConjunction = tokens
        .filter(t => operators.BINARY_OPERATOR.includes(t.type))
        .every(op => op.type === types.AND)
    if(!isAllConjuction) return false
    return tokens.filter(t => !operators.BINARY_OPERATOR.includes(t.type))
}

module.exports = conjChecker