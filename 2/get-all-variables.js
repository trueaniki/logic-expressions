// Лабораторная работа 2 по дисциплине ЛОИС
// Выполнено студентом группы 821701 БГУИР Никипеловым Алексеем Дмитриевичем
// Функция получения всех переменных формулы

const {postOrderTraversal} = require('../traversal')

const getAllVariables = (formulaTree) => {
    const vars = new Set()
    postOrderTraversal(formulaTree, node => {
        if (node.type === 'var' && !node.const) vars.add(node.value)
    })
    return Array.from(vars)
}

module.exports = getAllVariables
