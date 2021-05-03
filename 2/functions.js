// Лабораторная работа 2 по дисциплине ЛОИС
// Выполнено студентом группы 821701 БГУИР Никипеловым Алексеем Дмитриевичем
// Функции логических операторов

const not = v => !v

const and = (a,b) => a & b

const or = (a,b) => a | b

const impl = (a,b) => !a | b

const eq = (a,b) => (!a | b) & (a | !b)

module.exports = {
    not,
    and,
    or,
    impl,
    eq,
}
