// Created by Alexey Nikipelov

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

class NotPknfError extends Error {
    constructor(...args) {
        super(...args)
    }
}

const checkUnique = arr => arr.length === new Set(arr).length

const checkPknf = str => {
    const [parseToken, getParseTree] = Parser()
    const tokens = Lexer(str)
    syntaxCheck(tokens)
    tokens.forEach(t => parseToken(t))
    const parseTree = getParseTree()
    let parentDisjunctions = []
    let parentDisjunction;
    try {
        if(tokens.some(t => t.type === TOKENS.CONST)) throw new NotKnfError('Constants not allowed')
        preOrderTraversal(parseTree, (node, parent) => {
            if (node?.operator?.arity === ARITY.BINARY) {
                // console.log(node.operator.type)
                if (node.operator.type === TOKENS.IMPL || node.operator.type === TOKENS.EQ) {
                    throw new NotKnfError('Implication and equation are not allowed')
                }
                // if (node.operator.type === TOKENS.OR) return true
                if (parent?.operator?.type === TOKENS.OR && node.operator.type !== TOKENS.OR) {
                    throw new NotKnfError('There should be only disjunctions after disjunctions')
                }
                if ((parent?.operator?.type === TOKENS.AND && node.operator.type !== TOKENS.OR) || (node.operator.type === TOKENS.OR && !parent)) {
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
                parentDisjunctions.push(parentDisjunction)
            } else if (node?.type === 'var' && parent?.type !== TOKENS.NOT) {
                if(!parentDisjunction) parentDisjunction = parent
                if (!parentDisjunction?.vars) {
                    parentDisjunction.vars = []
                }
                parentDisjunction.vars.push({
                    type: node.type,
                    value: node.value,
                })
                parentDisjunctions.push(parentDisjunction)
            }
        })

        const varsSet = new Set()

        parentDisjunctions.forEach(d => {
            d.vars.forEach(v => varsSet.add(v.value))
        })

        parentDisjunctions.forEach(d1 => {
            if(d1.vars.length !== varsSet.length) throw new NotPknfError('Not all vars')

            if(!checkUnique(d1.vars.map(d => d.value))) throw new NotPknfError('Not unique vars')

            parentDisjunctions.forEach(d2 => {
                if(JSON.stringify(d1.vars.map(d => d.value).sort()) === JSON.stringify(d2.vars.map(d => d.value).sort()))
                    throw new Error('Not unique disj')
            })

        })
    } catch (err) {
        // if (err instanceof NotKnfError || err instanceof NotPknfError) return false
        // else
        throw err
    }

    console.log(JSON.stringify(parseTree, (key, value) => key === 'parent' ? 'mock' : value))

    return true
}

module.exports = checkPknf
