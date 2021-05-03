// Лабораторная работа 1 по дисциплине ЛОИС
// Выполнено студентом группы 821701 БГУИР Никипеловым Алексеем Дмитриевичем
// Функция проверки на СКНФ

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

const checkUnique = arr => arr.length === new Set(arr).size

const checkPknf = str => {
    const [parseToken, getParseTree] = Parser()
    const tokens = Lexer(str)
    syntaxCheck(tokens)
    tokens.forEach(t => parseToken(t))
    const parseTree = getParseTree()
    let parentDisjunctions = []
    let parentDisjunction;
    if(!parseTree?.childs[0]?.operator) throw new NotPknfError()
    // if(parseTree?.childs[0]?.operator.type === TOKENS.AND) throw new NotPknfError()
    try {
        if(tokens.some(t => t.type === TOKENS.CONST)) throw new NotKnfError('Constants are not allowed')
        preOrderTraversal(parseTree, (node, parent) => {
            if (node?.operator?.arity === ARITY.BINARY) {
                if (node.operator.type === TOKENS.IMPL || node.operator.type === TOKENS.EQ) {
                    throw new NotKnfError('Implication and equation are not allowed')
                }
                if (parent?.operator?.type === TOKENS.OR && node.operator.type !== TOKENS.OR) {
                    throw new NotKnfError('There should be only disjunctions after disjunctions')
                }
                if (parent?.operator?.type === TOKENS.AND) {
                    parentDisjunction = node;
                    if(!parentDisjunction.vars) parentDisjunction.vars = [];
                    parentDisjunctions.push(parentDisjunction)
                }
                if(node?.operator?.type === TOKENS.AND && node === parseTree.childs[0]) {
                    if(!node?.childs[0]?.operator && !node?.childs[1]?.operator) throw new NotPknfError()
                }
                if(node.operator.type === TOKENS.OR) {
                    node.childs[0].type === 'var' && parentDisjunction && parentDisjunction.vars.push(node.childs[0])
                    node.childs[1].type === 'var' && parentDisjunction && parentDisjunction.vars.push(node.childs[1])
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
            }
        })

        const varsSet = new Set()

        parentDisjunctions.forEach(d => {
            d.vars.forEach(v => varsSet.add(v.value))
        })
        // console.log(JSON.stringify(parentDisjunctions, (key, value) => key === 'parent' ? 'mock' : value))
        parentDisjunctions.filter(d => d.operator.type === TOKENS.OR).forEach(d1 => {
            if(new Set(d1.vars.map(v=>v.value)).size !== varsSet.size) {
                console.log('1' + d1.vars)
                console.log('2' + varsSet)
                throw new NotPknfError('Not all vars')
            }

            if(!checkUnique(d1.vars.map(d => d.value))) {
                throw new NotPknfError('Not unique vars')
            }

            parentDisjunctions.forEach(d2 => {
                const firstDisjStr = JSON.stringify(d1.vars.map(d => d.neg ? '!' + d.value : d.value).sort())
                const secondDisjStr = JSON.stringify(d2.vars.map(d => d.neg ? '!' + d.value : d.value).sort())
                if(firstDisjStr === secondDisjStr && d1 !== d2) {
                    throw new NotPknfError('Not unique disjunctions')
                }
            })

        })
    } catch (err) {
        // if (err instanceof NotKnfError || err instanceof NotPknfError) return false
        // else
        throw err
    }
    // console.log(JSON.stringify(parseTree, (key, value) => key === 'parent' ? 'mock' : value))
    return true
}

module.exports = checkPknf
