// Created by Alexey Nikipelov
// Test formulas by Vladimir Dikusar

const checkPknf = require('./check-pknf')
const assert = require('assert')

describe('Check pknf', () => {
    describe('((X\\/Y)/\\(X\\/(!Y)))', () => {
        it('should be pknf', () => {
            assert(checkPknf('((X\\/Y)/\\(X\\/(!Y)))'))
        })
    })
    describe('(((((!X)\\/Y)\\/Z)/\\(((!X)\\/(!Y))\\/Z))/\\((X\\/Y)\\/(!Z)))', () => {
        it('should be pknf', () => {
            assert(checkPknf('(((((!X)\\/Y)\\/Z)/\\(((!X)\\/(!Y))\\/Z))/\\((X\\/Y)\\/(!Z)))'))
        })
    })
    describe('(((A\\/B\\/C)/\\(A\\/B)\\/C)', () => {
        it('should be pknf', () => {
            assert(checkPknf('(((A\\/B\\/C)/\\(A\\/B)\\/C)'))
        })
    })
    describe('(((((A/\\(!B))/\\C)/\\((A/\\B)/\\(!C)))/\\(((!A)/\\B)/\\(!C)))/\\((A/\\(!B))/\\(!C)))', () => {
        it('should be pknf', () => {
            assert(checkPknf('(((((A/\\(!B))/\\C)/\\((A/\\B)/\\(!C)))/\\(((!A)/\\B)/\\(!C)))/\\((A/\\(!B))/\\(!C)))'))
        })
    })
    describe('(((((!B)\\/C)/\\((A/\\B)\\/(!C)))/\\(((!A)\\/B)\\/(!C)))/\\((A\\/(!B))\\/(!C)))', () => {
        it('should not be pknf', () => {
            assert.throws(checkPknf('(((((!B)\\/C)/\\((A/\\B)\\/(!C)))/\\(((!A)\\/B)\\/(!C)))/\\((A\\/(!B))\\/(!C)))'))
        })
    })
    describe('(((!A)\\/(B\\/C))/\\(C\\/((!A)\\/B)))', () => {
        it('should not be pknf', () => {
            assert.throws(checkPknf('(((!A)\\/(B\\/C))/\\(C\\/((!A)\\/B)))'))
        })
    })
    describe('(((((A\\/B)\\/C)\\/(!D))/\\((A\\/(B\\/(!C)))\\/D))/\\(((A\\/B)\\/C)\\/(!D)))', () => {
        it('should not be pknf', () => {
            assert.throws(checkPknf('(((((A\\/B)\\/C)\\/(!D))/\\((A\\/(B\\/(!C)))\\/D))/\\(((A\\/B)\\/C)\\/(!D)))'))
        })
    })
})