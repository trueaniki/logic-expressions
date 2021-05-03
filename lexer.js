// Общий код для лабораторных работ 1 и 2 по дисциплине ЛОИС
// Выполнено студентом группы 821701 БГУИР Никипеловым Алексеем Дмитриевичем
// Функция лексера

/*!
 * alphabet <https://github.com/jonschlinkert/alphabet>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT license.
 */
const alphabet = require('alphabet')

const {
    TOKENS,
    VARS,
    UNARY_OPERATORS,
    BINARY_OPERATORS,
    OPERATORS,
} = require('./grammar')

const {IllegalCharacterError} = require('./errors')

const Lexer = str => {
    const tokens = []
    const chars = str.split('')
    if(chars.length === 0) throw Error('Zero length input')
    for(let i = 0; i < chars.length; i++) {
        let char = chars[i]
        let nextChar = chars[i+1]
        if(char === '(') tokens.push({type: TOKENS.LPAREN})
        else if(char === ')') tokens.push({type: TOKENS.RPAREN})
        else if(char === '!') tokens.push({type: TOKENS.NOT})

        else if(char === '/' && nextChar === '\\') {
            tokens.push({type: TOKENS.AND})
            i++
        }
        else if(char === '\\' && nextChar === '/') {
            tokens.push({type: TOKENS.OR})
            i++
        }
        else if(char === '-' && nextChar === '>') {
            tokens.push({type: TOKENS.IMPL})
            i++
        }
        else if(char === '~') tokens.push({type: TOKENS.EQ})

        else if(alphabet.upper.includes(char)) tokens.push({
            type: TOKENS.SYMBOL,
            value: char
        })
        else if(['1', '0'].includes(char)) tokens.push({
            type: TOKENS.CONST,
            value: char
        })
        else {
            throw new IllegalCharacterError(char, i)
        }
    }
    return tokens
}

module.exports = Lexer
