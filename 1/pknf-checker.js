// Лабораторная работа 1 по дисциплине ЛОИС
// Выполнено студентом группы 821701 БГУИР Никипеловым Алексеем Дмитриевичем
// Функция проверки на СКНФ

const equal = require('deep-equal')
const Visitor = require('../visitor')
const {TOKENS} = require('../grammar')

const {NotPknfError} = require('../errors')

const checkUniqueVariables = (disjunctions) => {
    for (let d of disjunctions)
        for (let v1 of d)
            for (let v2 of d)
                if (v1.value === v2.value && v1 !== v2) {
                    return false
                }
    return true
}

const checkAllVariables = (disjunctions) => {
    const varsSet = new Set()
    for(let d of disjunctions)
        for(let v of d) {
            varsSet.add(v.value)
        }
    for(let d of disjunctions)
        for(let v of d) {
            if(!varsSet.has(v.value)) return false
        }
    return true
}

const checkUniqueDisjunctions = (disjunctions) => {
    const sorted = disjunctions.map(d => d.sort((v1,v2) => v1.value.charCodeAt(0) - v2.value.charCodeAt(0)))
    console.log(sorted)
    for (let d1 of sorted)
        for (let d2 of sorted)
            if (equal(d1,d2) && d1 !== d2) {
                return false
            }
    return true
}

const PknfChecker = Visitor()

PknfChecker.before(ctx => {
    ctx.rootDisjunctions = []
    ctx.rootDisjunction = null
})

// PknfChecker.any(() => console.log(1))

PknfChecker.disjunction((disj, ctx) => {
    if (!disj.parent) return
    if (disj.parent.operator?.type === TOKENS.AND || disj.parent.root) { // TODO: если нет parent(если parent это рут) либо если parent - конъюнкция
        ctx.rootDisjunctions.push([])
        ctx.rootDisjunction = ctx.rootDisjunctions[ctx.rootDisjunctions.length - 1]
    }
})

PknfChecker.variable((v,ctx) => {
    if (ctx.rootDisjunction) {
        ctx.rootDisjunction.push({
            value: v.value,
            neg: v.parent?.operator?.type === TOKENS.NOT
        })
    }
})

PknfChecker.after(ctx => {
    if(ctx.rootDisjunctions.length === 0 && ctx.visiting.childs[0].type !== 'var') throw new NotPknfError()
    // console.log(rootDisjunctions)
    // console.log(rootDisjunctions.map(d => d.map(v => `${v.neg ? '!' : ''}${v.value}`)))
    if (!checkUniqueVariables(ctx.rootDisjunctions)) throw new NotPknfError()
    if (!checkAllVariables(ctx.rootDisjunctions)) throw new NotPknfError()
    if (!checkUniqueDisjunctions(ctx.rootDisjunctions)) throw new NotPknfError()
})

module.exports = PknfChecker
