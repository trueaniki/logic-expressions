// Общий код для лабораторных работ 1 и 2 по дисциплине ЛОИС
// Выполнено студентом группы 821701 БГУИР Никипеловым Алексеем Дмитриевичем
// Функция, упрощающая обход дерева разбора

const {preOrderTraversal} = require('./traversal')
const {
    TOKENS,
    VARS,
    UNARY_OPERATORS,
    BINARY_OPERATORS,
    ARITY,
    OPERATORS,
} = require('./grammar')

const Visitor = () => {
    let anyCb;
    let conjunctionCb;
    let disjunctionCb;
    let negotiationCb;
    let variableCb;
    let rootCb;
    let beforeCb;
    let afterCb;

    const ctx = {}

    const run = (formulaTree) => {
        ctx.visiting = formulaTree
        beforeCb && beforeCb(ctx)
        preOrderTraversal(formulaTree, (node) => {
            anyCb && anyCb(node, ctx)
            if(node.type === 'var'){
                variableCb && variableCb(node, ctx)
                return
            }
            if(node?.operator.type === TOKENS.AND) {
                conjunctionCb && conjunctionCb(node, ctx)
                return
            }
            if(node?.operator.type === TOKENS.OR) {
                disjunctionCb && disjunctionCb(node, ctx)
                return
            }
            if(node?.operator.type === TOKENS.NOT) {
                negotiationCb && negotiationCb(node, ctx)
            }
        })
        afterCb && afterCb(ctx)
    }

    return {
        any: (cb) => anyCb = cb,
        conjunction: (cb) => conjunctionCb = cb,
        disjunction: (cb) => disjunctionCb = cb,
        negotiation: (cb) => negotiationCb = cb,
        variable: (cb) => variableCb = cb,
        root: (cb) => rootCb = cb,
        run,
        before: (cb) => beforeCb = cb,
        after: (cb) => afterCb = cb,
    }
}

module.exports = Visitor
