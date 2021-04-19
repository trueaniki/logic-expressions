const readline = require('readline-sync')
const Lexer = require('./lexer')
const syntaxCheck = require('./syntax-check')
const {isPcnf, getSubFormulas} = require('./is-pcnf')

const formula = readline.question('Enter formula:\n')

const tokens = Lexer(formula)
syntaxCheck(tokens)
// console.log(getSubFormulas(tokens).subformulas)
// console.log(getSubFormulas(tokens).rootTokens)
console.log(isPcnf(tokens))