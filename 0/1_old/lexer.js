const {terminals, types} = require('./grammar')

const Lexer = formula => {
    if(formula === '') return []
    const inputArray = formula.split('')
    let negotiationFlag = false
    return inputArray.map((char, index) => {
        if(terminals[types.NOT].includes(char)) {
            negotiationFlag = true
            return null
        }
        for(let type in terminals) {
            if(terminals[type].includes(char)) {
                if(negotiationFlag) char = '!' + char
                negotiationFlag = false
                return {
                    type,
                    value: char
                }
            }
        }
        throw new Error(`Illegal char ${char} at ${index}`)
    }).filter(t => t !== null)
}

module.exports = Lexer