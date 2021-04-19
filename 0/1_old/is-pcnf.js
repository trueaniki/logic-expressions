const _ = require('lodash')
const {types, operators} = require('./grammar')
const elementaryDisjChecker = require('./elementary-disj-checker')
const conjChecker = require('./conj-checker')

const chunkArray = (array, chunkSize) => {
    // console.log(array)
    const res = []
    let i,j
    for (i = 0, j = array.length; i < j; i += chunkSize) {
        res.push(array.slice(i, i + chunkSize))
    }
    console.log(res)
    return res
}

const isCnf = tokens => {
    const tokenTypes = tokens.map(t => t.type)
    if(tokenTypes.includes(types.IMPL) || tokenTypes.includes(types.EQ)) return false

     conjChecker(tok)
}

const getLetters = symbols => symbols.map(s => s.replace('!',''))

const removeNesting = tokens => {
    const tokensCopy = [...tokens]
    let parenCounter = 0
    for(let i = 0; i < tokensCopy.length; i++) {
        if(tokensCopy[i].type === types.LPAREN) parenCounter++
        if(parenCounter === 3) {
            tokensCopy.splice(i,1)
            parenCounter = 0
            i = 0
        }
    }

    for(let i = tokensCopy.length - 1; i >= 0; i--) {
        if(tokensCopy[i].type === types.RPAREN) parenCounter++
        if(parenCounter === 3) {
            tokensCopy.splice(i,1)
            parenCounter = 0
            i = tokensCopy.length - 1
        }
    }
    // console.log(tokensCopy.map(t=>t.value).join(''))
    return tokensCopy
}

const getSubFormulas = tokens => {
    const subformulas = []
    // const tokensCopy = [...tokens]
    const rootTokens = []
    const parenthesis = tokens
        .map((t,i) => ({index: i, ...t}))
        .filter(t => t.type === types.LPAREN || t.type === types.RPAREN)
    if(parenthesis.length === 0) return {subformulas: [], rootTokens: tokens}
    // const parenthesisPairs = chunkArray(parenthesis)
    const parenthesisPairs = _.chunk(parenthesis, 2)

    // if(parenthesisPairs.every(pair => JSON.stringify(pair.map(t=>t.type)) === JSON.stringify(['LPAREN', 'RPAREN']))) {
    for(let pair of parenthesisPairs) {
        subformulas.push(tokens.slice(pair[0].index + 1, pair[1].index))
    }
    // }
    // else {
    //     return false
    // }
    return {
        subformulas,
        rootTokens: _.xor(tokens, subformulas.flat()).filter(t => t.type !== types.LPAREN && t.type !== types.RPAREN)
    }
}

const isPcnf = tokens => {
    tokens = removeNesting(tokens)
    if(!getSubFormulas(tokens)) return false
    let {subformulas, rootTokens} = getSubFormulas(tokens)
    // console.log(rootTokens.filter(t => t.type === types.SYMBOL))
    if(subformulas.length !== 0 && rootTokens.filter(t => t.type === types.SYMBOL).length !== 0) return false

    if(subformulas.length === 0 ) {
        subformulas = rootTokens.filter(t => t.type === types.SYMBOL).map(t => [t])
        rootTokens = rootTokens.filter(t => t.type !== types.SYMBOL)
    }
    // console.log(rootTokens.filter(t => operators.BINARY_OPERATOR.includes(t.type)))
    // console.log(rootTokens.filter(t => operators.BINARY_OPERATOR.includes(t.type)).some(t => t.type !== types.AND))
    // console.log(subformulas)
    if(rootTokens.filter(t => operators.BINARY_OPERATOR.includes(t.type)).some(t => t.type !== types.AND)) return false
    // console.log(1)
    if(subformulas.flat().filter(t => operators.BINARY_OPERATOR.includes(t.type)).some(t => t.type !== types.OR)) return false
    const vars = Array.from(new Set([
            ...subformulas.flat().filter(t => t.type === types.SYMBOL).map(t => t.value),
            ...rootTokens.filter(t => t.type === types.SYMBOL)
    ]))
    for(let subformula of subformulas) {
        const subformulaVars = subformula.filter(t => t.type === types.SYMBOL).map(v => v.value)

        // console.log('check 1')
        // проверка пункт 1
        for(let anotherSubformula of subformulas.filter(s=>s!==subformula)) {
            const anotherSubformulaVars = anotherSubformula.filter(t => t.type === types.SYMBOL).map(v => v.value)
            if(_.xor(subformulaVars, anotherSubformulaVars).length === 0) return false
        }

        // console.log('check 2')
        // проверка пункт 2
        const subformulaLetters = getLetters(subformulaVars)
        if(subformulaLetters.length !== _.uniq(subformulaLetters).length) return false

        // console.log(getLetters(subformulaVars))
        // console.log(_.difference(getLetters(vars), getLetters(subformulaVars)))
        // console.log(getLetters(vars))
        // console.log(getLetters(subformulaVars))
        // console.log('check 3')
        // проверка пункт 3
        if(_.difference(getLetters(vars), getLetters(subformulaVars)).length !== 0) return false
    }
    return true
}

module.exports = {
    getSubFormulas,
    isPcnf
}