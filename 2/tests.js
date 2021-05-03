// Лабораторная работа 2 по дисциплине ЛОИС
// Выполнено студентом группы 821701 БГУИР Никипеловым Алексеем Дмитриевичем
// Тесты

/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
const {assert} = require('chai')

const execute = require('./execute')
const Lexer = require('../lexer')
const Parser = require('../parser')
const syntaxCheck = require('../syntax-check')
const checkTautology = require('./check-tautology')
const {
    not,
    and,
    or,
    impl,
    eq,
} = require('./functions')

describe('Testing boolean functions', () => {
    describe('->', () => {
        it('0 0 should be 1', () => {
            assert.equal(impl(0,0), 1)
        })
        it('0 1 should be 1', () => {
            assert.equal(impl(0,1), 1)
        })
        it('1 0 should be 0', () => {
            assert.equal(impl(1,0), 0)
        })
        it('1 1 should be 1', () => {
            assert.equal(impl(1,1), 1)
        })
    })
})


describe('Testing formula execution', () => {
    describe('(A->B)', () => {
        const [parseToken, getParseTree] = Parser()
        const tokens = Lexer('(A->B)')
        syntaxCheck(tokens)
        tokens.forEach(t => parseToken(t))

        it('0 0 should be 1', () => {
            assert.equal(execute(getParseTree(), {'A': 0, 'B': 0}), 1)
        })
        it('0 1 should be 1', () => {
            assert.equal(execute(getParseTree(), {'A': 0, 'B': 1}), 1)
        })
        it('1 0 should be 0', () => {
            assert.equal(execute(getParseTree(), {'A': 1, 'B': 0}), 0)
        })
        it('1 1 should be 1', () => {
            assert.equal(execute(getParseTree(), {'A': 1, 'B': 1}), 1)
        })
    })
})

describe('Testing formula execution with constants', () => {
    describe('(1\\/A)', () => {
        const [parseToken, getParseTree] = Parser()
        const tokens = Lexer('(1\\/A)')
        syntaxCheck(tokens)
        tokens.forEach(t => parseToken(t))

        it('when A = 0, it should be 1', () => {
            assert.equal(execute(getParseTree(), {'A': 0}), 1)
        })
        it('when A = 1, it should be 1', () => {
            assert.equal(execute(getParseTree(), {'A': 0}), 1)
        })
    })
})

describe('Testing tautologies', () => {
    describe('(A->A)', () => {
        it('should be tautology', () => {
            assert(checkTautology(('(A->A)'))[0])
        })
    })
    describe('(A\\/(!A))', () => {
        it('should be tautology', () => {
            assert(checkTautology(('(A\\/(!A))'))[0])
        })
    })
    describe('(!(P/\\(!P)))', () => {
        it('should be tautology', () => {
            assert(checkTautology(('(!(P/\\(!P)))'))[0])
        })
    })
    describe('((!(!P))->P)', () => {
        it('should be tautology', () => {
            assert(checkTautology(('((!(!P))->P)'))[0])
        })
    })
    describe('(A->(B->A))', () => {
        it('should be tautology', () => {
            assert(checkTautology(('(A->(B->A))'))[0])
        })
    })
    describe('((P/\\P)~P)', () => {
        it('should be tautology', () => {
            assert(checkTautology(('((P/\\P)~P)'))[0])
        })
    })
    describe('((P\\/P)~P)', () => {
        it('should be tautology', () => {
            assert(checkTautology(('((P\\/P)~P)'))[0])
        })
    })
    describe('((P/\\P)~P)', () => {
        it('should be tautology', () => {
            assert(checkTautology(('((P/\\P)~P)'))[0])
        })
    })
    describe('((1/\\1)~1)', () => {
        it('should be tautology', () => {
            assert(checkTautology(('((1/\\1)~1)'))[0])
        })
    })
    describe('((0/\\0)~0)', () => {
        it('should be tautology', () => {
            assert(checkTautology(('((0/\\0)~0)'))[0])
        })
    })

    describe('((1/\\1)~0)', () => {
        it('should not be tautology', () => {
            assert.isNotOk(checkTautology(('((1/\\1)~0)'))[0])
        })
    })
    describe('(A/\\B)', () => {
        it('should not be tautology', () => {
            assert.isNotOk(checkTautology(('(A/\\B)'))[0])
        })
    })
    describe('((1/\\A)->B)', () => {
        it('should not be tautology', () => {
            assert.isNotOk(checkTautology(('((1/\\A)->B)'))[0])
        })
    })
    // describe('formula with 21 varibles - maximum', () => {
    //     it('should not be tautology', () => {
    //         assert.isNotOk(checkTautology('(((((((((((((((((((A/\\B)/\\C)/\\D)/\\E)/\\F)/\\G)/\\H)/\\J)/\\K)/\\L)/\\M)/\\N)/\\O)/\\P)/\\Q)/\\R)/\\S)/\\T)/\\U)'))
    //     })
    // })
})
