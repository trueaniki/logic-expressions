// Лабораторная работа 1 по дисциплине ЛОИС
// Выполнено студентом группы 821701 БГУИР Никипеловым Алексеем Дмитриевичем
// Функция проверки на СКНФ

const Lexer = require('../lexer')
const Parser = require('../parser')
const syntaxCheck = require('../syntax-check')
const KnfChecker = require('./knf-checker')
const PknfChecker = require('./pknf-checker')

const checkPknf = (str) => {
    const [parseToken, getParseTree] = Parser()
    try {
        const tokens = Lexer(str)
        syntaxCheck(tokens)
        tokens.forEach(t => parseToken(t))
        const parseTree = getParseTree()
        KnfChecker.run(parseTree)
        PknfChecker.run(parseTree)
    } catch (err) {
        console.log(err)
        return false
    }
    return true
}

module.exports = checkPknf
