const {operators, types} = require('./grammar')

const elementaryDisjChecker = tokens => {
    const isAllDisjunction = tokens
        .filter(t => operators.BINARY_OPERATOR.includes(t.type))
        .every(op => op.type === types.OR)
    if(!isAllDisjunction) return false
    return tokens.filter(t => !operators.BINARY_OPERATOR.includes(t.type))
}

module.exports = elementaryDisjChecker