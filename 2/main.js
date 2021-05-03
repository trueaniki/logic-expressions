// Лабораторная работа 2 по дисциплине ЛОИС
// Выполнено студентом группы 821701 БГУИР Никипеловым Алексеем Дмитриевичем
// Точка входа

/*
 * readlineSync
 * https://github.com/anseki/readline-sync
 *
 * Copyright (c) 2019 anseki
 * Licensed under the MIT license.
 */
const readline = require('readline-sync')

const checkTautology = require('./check-tautology')

// const str = readline.question('Enter formula:\n')
const str = '(!(1/\\(!1)))'

const [result, truthtable] = checkTautology(str)

console.table(truthtable)

console.log(result)
