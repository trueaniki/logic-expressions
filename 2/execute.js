// Лабораторная работа 2 по дисциплине ЛОИС
// Выполнено студентом группы 821701 БГУИР Никипеловым Алексеем Дмитриевичем
// Функции для выполнения логических формул

const {postOrderTraversal} = require('../traversal')

const {
    TOKENS,
    VARS,
    UNARY_OPERATORS,
    BINARY_OPERATORS,
    ARITY,
    OPERATORS,
} = require('../grammar')

const {
    not,
    and,
    or,
    impl,
    eq,
} = require('./functions')

const execute = node => {
    switch (node.operator.type) {
        case TOKENS.NOT:
            return not(node.childs[0].value)
        case TOKENS.AND:
            return and(node.childs[0].value, node.childs[1].value)
        case TOKENS.OR:
            return or(node.childs[0].value, node.childs[1].value)
        case TOKENS.IMPL:
            return impl(node.childs[0].value, node.childs[1].value)
        case TOKENS.EQ:
            return eq(node.childs[0].value, node.childs[1].value)
        default:
            return node.value
    }
}

const execFormula = (formulaTree, values) => {
    postOrderTraversal(formulaTree, (node) => {
        if (node.type === 'var') {
            if(!node.const)
                node.value = values[node.value]
            node.value = Number(node.value)
        }
        else if(node.operator) {
            node.value = execute(node)
        }
    })
    return Number(execute(formulaTree.childs[0]))
}

module.exports = execFormula
