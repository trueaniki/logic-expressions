const postOrderTraversal = (node, cb) => {
    if(node?.childs) {
        for(let child of node.childs) {
            preOrderTraversal(child, cb)
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