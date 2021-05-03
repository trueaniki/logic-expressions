// Лабораторная работа 2 по дисциплине ЛОИС
// Выполнено студентом группы 821701 БГУИР Никипеловым Алексеем Дмитриевичем
// Функция проверки на общезначимость

const Lexer = require('../lexer')
const Parser = require('../parser')
const syntaxCheck = require('../syntax-check')
const execute = require('./execute')
const getAllVars = require('./get-all-variables')
const generateInput = require('./generate-input')

const checkTautology = str => {
    const [parseToken, getParseTree] = Parser()
    const tokens = Lexer(str)
    syntaxCheck(tokens)
    tokens.forEach(t => parseToken(t))

    const vars = getAllVars(getParseTree())

    const input = generateInput(vars)
    const truthTable = []

    for (let inputVector of input) {
        truthTable.push({
            input: inputVector,
            output: execute(getParseTree(), inputVector)
        })
    }
    return [truthTable.map(el => el.output).every(el => el === 1), truthTable]
}

module.exports = checkTautology
