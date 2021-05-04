// Лабораторная работа 1 по дисциплине ЛОИС
// Выполнено студентом группы 821701 БГУИР Никипеловым Алексеем Дмитриевичем
// Функция проверки на КНФ

const Visitor = require('../visitor')
const {TOKENS} = require('../grammar')

const {NotKnfError} = require('../errors')

const KnfChecker = Visitor()

KnfChecker.any(node => {
    if(node.const) throw NotKnfError()
    if (node.operator?.type === TOKENS.IMPL || node.operator?.type === TOKENS.EQ) {
        throw new NotKnfError('Implication and equation are not allowed')
    }
})

KnfChecker.conjunction(conj => {
    if(conj.parent && conj.parent.operator) {
        if(conj.parent.operator.type !== TOKENS.AND) {
            throw new NotKnfError()
        }
    }
})

KnfChecker.disjunction(disj => {
    if(disj.parent && disj.parent.operator) {
        if(disj.parent.operator.type !== TOKENS.OR && disj.parent.operator.type !== TOKENS.AND) {
            console.log(disj.parent.operator.type === TOKENS.AND)
            throw new NotKnfError()
        }
    }
})

KnfChecker.negotiation(neg => {
    if(neg.parent && neg.parent.operator) {
        if(neg.parent.operator.type !== TOKENS.OR && neg.parent.operator.type !== TOKENS.AND) {
            throw new NotKnfError()
        }
    }
})

KnfChecker.variable(v => {
    if(v.parent && v.parent.operator) {
        if(v.parent.operator.type !== TOKENS.OR && v.parent.operator.type !== TOKENS.AND && v.parent.operator.type !== TOKENS.NOT) {
            throw new NotKnfError()
        }
    }
})

module.exports = KnfChecker
