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

const str = readline.question('Enter formula:\n')
// const str = '(((((((((((((((((((A/\\B)/\\C)/\\D)/\\E)/\\F)/\\G)/\\H)/\\J)/\\K)/\\L)/\\M)/\\N)/\\O)/\\P)/\\Q)/\\R)/\\S)/\\T)/\\U)'
// const str = 'A'

const [result, truthtable] = checkTautology(str)

console.table(truthtable)

console.log(result)
