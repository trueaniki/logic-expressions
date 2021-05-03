// Лабораторная работа 1 по дисциплине ЛОИС
// Выполнено студентом группы 821701 БГУИР Никипеловым Алексеем Дмитриевичем
// Точка входа

const readline = require('readline-sync')
const checkPknf = require('./check-pknf')

const str = readline.question('Enter formula:\n')
// const str = '((A\\/(B\\/C))/\\(((!C)\\/B)\\/A))'

// try {
    console.log(checkPknf(str))
// } catch (e) {
//     console.log(false)
    // console.log(e)
// }
