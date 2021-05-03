// Лабораторная работа 2 по дисциплине ЛОИС
// Выполнено студентом группы 821701 БГУИР Никипеловым Алексеем Дмитриевичем
// Функция генерации массива всевозможных входных векторов дял формулы

const generateInput = (vars) => {
    const input = []
    for(let i = 0; i < 2**vars.length; i++) {
        const numbersVector = i.toString(2).padStart(vars.length, '0').split('').map(c=>+c)
        const valuesVector = {}
        vars.forEach((v,i) => {
            valuesVector[v] = numbersVector[i]
        })
        input.push(valuesVector)
    }
    return input
}

module.exports = generateInput
