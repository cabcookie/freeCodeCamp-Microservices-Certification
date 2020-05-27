// higher order functions
const flowFn = (...fns) => fns.reduce((result, fn) => (...args) => fn(result(...args)))

// string functions
const strReplacer = replArr => str => replArr.reduce((res, item) => res.replace("${"+item[0]+"}", item[1]), str)
const strAppend = app => str => str + app
const strPrefix = pre => str => pre + str

// general functions
const passOn = (obj) => () => obj

module.exports = {
    flow: flowFn,
    
    replacer: strReplacer,
    prefix: strPrefix,
    append: strAppend,

    passOn: passOn
}