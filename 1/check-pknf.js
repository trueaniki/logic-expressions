const Lexer = require('../lexer')
const Parser = require('../parser')
const syntaxCheck = require('../syntax-check')
const {preOrderTraversal} = require('../traversal')
const {
    TOKENS,
    VARS,
    UNARY_OPERATORS,
    BINARY_OPERATORS,
    ARITY,
    OPERATORS,
} = require('../grammar')

class NotKnfError extends Error {
    constructor(...args) {
        super(...args)
    }
}

const uniqueDisjunctions = []

const checkUnique = arr => arr.length === new Set(arr).length

const checkElementary = formula => formula?.childs.every(ch => ch.type !== 'formula')

const exportSubformula = subformula => {
    return JSON.stringify(subformula, (key, value) => key === 'parent' ? 'mock' : value)
}

const checkPknf = str => {
    const [parseToken, getParseTree] = Parser()
    const tokens = Lexer(str)
    syntaxCheck(tokens)
    tokens.forEach(t => parseToken(t))
    const parseTree = getParseTree()

    try {
        preOrderTraversal(parseTree, (node, parent) => { // meta says about parent node operator: true if OR, false if smth else
            if (node?.operator?.arity === ARITY.BINARY) {
                // console.log(node.operator.type)
                if (node.operator.type === TOKENS.IMPL || node.operator.type === TOKENS.EQ) {
                    throw new NotKnfError('Implication and equation are not allowed')
                }
                // if (node.operator.type === TOKENS.OR) return true
                if (parent?.operator?.type === TOKENS.OR && node.operator.type !== TOKENS.OR) {
                    throw new NotKnfError('There should be only disjunctions after disjunctions')
                }
                if (node?.operator?.type === TOKENS.OR) {
                    uniqueDisjunctions.push(exportSubformula(node))
                }
            } else if (node?.operator?.arity === ARITY.UNARY) {
                if(node?.childs[0].type === 'formula') throw new NotKnfError('Negotiation to subformulas is not allowed')
                if (!parent?.vars) {
                    parent.vars = []
                }
                parent.vars.push({
                    type: node.childs[0].type,
                    value: node.childs[0].value,
                    neg: true,
                })
            } else if (node?.type === 'var' && parent?.type !== TOKENS.NOT) {
                if (!parent?.vars) {
                    parent.vars = []
                }
                parent.vars.push({
                    type: node.type,
                    value: node.value,

                })
            }
        })
        preOrderTraversal(parseTree, (node) => {
            if (node?.operator?.type === TOKENS.OR) {
                if(checkElementary(node)) {
                    if(!checkUnique(node.vars))
                        throw new NotKnfError('Not unique vars in disjunction')
                }
            }
        })
    } catch (err) {
        if (err instanceof NotKnfError) return false
        else throw err
    }

    console.log(JSON.stringify(parseTree, (key, value) => key === 'parent' ? 'mock' : value))

    return true
}

module.exports = checkPknf