const readline = require('readline-sync')
const checkPknf = require('./check-pknf')

// const str = readline.question('Enter formula:\n')
const str = '(A/\\(B/\\(C\\/(!D))))'

console.log(checkPknf(str))
