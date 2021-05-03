// Общий код для лабораторных работ 1 и 2 по дисциплине ЛОИС
// Выполнено студентом группы 821701 БГУИР Никипеловым Алексеем Дмитриевичем
// Тесты

/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
const {assert} = require('chai')

const {NotKnfError, NotPknfError} = require('../errors')
const checkPknf = require('./check-pknf')

describe('Check pknf', () => {
    // 1
    const formula1 = '((X\\/Y)/\\(X\\/(!Y)))'
    describe('1) ' + formula1, () => {
        it('should be pknf', () => {
            assert(checkPknf(formula1))
        })
    })
    // 2
    const formula2 = '(((((!X)\\/Y)\\/Z)/\\(((!X)\\/(!Y))\\/Z))/\\((X\\/Y)\\/(!Z)))'
    describe('2) ' + formula2, () => {
        it('should be pknf', () => {
            assert(checkPknf(formula2))
        })
    })
    // 3
    const formula3 = '((A\\/(B\\/C))/\\(((!A)\\/B)\\/C))'
    describe('3) ' + formula3, () => {
        it('should be pknf', () => {
            assert(checkPknf(formula3))
        })
    })
    // 4
    const formula4 = '(((((A/\\(!B))/\\C)/\\((A/\\B)/\\(!C)))/\\(((!A)/\\B)/\\(!C)))/\\((A/\\(!B))/\\(!C)))'
    describe('4) ' + formula4, () => {
        it('should be pknf', () => {
            assert(checkPknf(formula4))
        })
    })
    // 5
    const formula5 = '(((((!B)\\/C)/\\((A/\\B)\\/(!C)))/\\(((!A)\\/B)\\/(!C)))/\\((A\\/(!B))\\/(!C)))'
    describe('5) ' + formula5, () => {
        it('should not be pknf', () => {
            assert.throws(() => checkPknf(formula5), NotKnfError)
        })
    })
    // 6
    const formula6 = '(((!A)\\/(B\\/C))/\\(C\\/((!A)\\/B)))'
    describe('6) ' + formula6, () => {
        it('should not be pknf', () => {
            assert.throws(() => checkPknf(formula6), NotPknfError)
        })
    })
    // 7
    const formula7 = '(((((A\\/B)\\/C)\\/(!D))/\\((A\\/(B\\/(!C)))\\/D))/\\(((A\\/B)\\/C)\\/(!D)))'
    describe('7) ' + formula7, () => {
        it('should not be pknf', () => {
            assert.throws(() => checkPknf(formula7), NotPknfError)
        })
    })
    // 8
    const formula8 = 'A/\\B)'
    describe('8) ' + formula8, () => {
        it('should throw Error: Wrong parenthesis', () => {
            assert.throws(() => checkPknf(formula8))
        })
    })
    // 9
    const formula9 = '(AB)'
    describe('9) ' + formula9, () => {
        it('should throw lexer error', () => {
            assert.throws(() => checkPknf(formula9))
        })
    })
    // 10
    const formula10 = '(((!Z)\\/X)//\C)'
    describe('10) ' + formula10, () => {
        it('should not be pknf', () => {
            assert.throws(() => checkPknf(formula10))
        })
    })
})
