// Общий код для лабораторных работ 1 и 2 по дисциплине ЛОИС
// Выполнено студентом группы 821701 БГУИР Никипеловым Алексеем Дмитриевичем
// Функции обхода дерева

//https://levelup.gitconnected.com/how-to-traverse-a-tree-using-javascript-c9a79826e819

const postOrderTraversal = (node, cb) => {
    if(node?.childs) {
        for(let child of node.childs) {
            postOrderTraversal(child, cb)
        }
    }
    cb(node)
}

const preOrderTraversal = (node, cb, parent) => {
    if(parent) cb(node, parent)
    // if(meta !== undefined) meta = cb(node, parent)
    // else meta = cb(node)
    if(node?.childs) {
        for(let child of node.childs) {
            preOrderTraversal(child, cb, node)
        }
    }
}

module.exports = {
    postOrderTraversal,
    preOrderTraversal,
}
