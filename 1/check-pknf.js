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

const checkPknf = str => {
    const [parseToken, getParseTree] = Parser()
    const tokens = Lexer(str)
    syntaxCheck(tokens)
    tokens.forEach(t => parseToken(t))
    const parseTree = getParseTree()
    let parentDisjunction;
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
                if (parent?.operator?.type === TOKENS.AND && node.operator.type !== TOKENS.OR) {
                    parentDisjunction = node;
                    if(!parentDisjunction.vars) parentDisjunction.vars = [];
                }
                if(node.operator.type === TOKENS.OR) {
                    node.childs[0].type === 'var' && parentDisjunction.vars.push(node.childs[0])
                    node.childs[1].type === 'var' && parentDisjunction.vars.push(node.childs[1])
                }
            } else if (node?.operator?.arity === ARITY.UNARY) {
                if(node?.childs[0].type === 'formula') throw new NotKnfError('Negotiation to subformulas is not allowed')
                if (!parentDisjunction?.vars) {
                    parentDisjunction.vars = []
                }
                parentDisjunction.vars.push({
                    type: node.childs[0].type,
                    value: node.childs[0].value,
                    neg: true,
                })
            } else if (node?.type === 'var' && parent?.type !== TOKENS.NOT) {
                if (!parentDisjunction?.vars) {
                    parentDisjunction.vars = []
                }
                parentDisjunction.vars.push({
                    type: node.type,
                    value: node.value,
                })
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
