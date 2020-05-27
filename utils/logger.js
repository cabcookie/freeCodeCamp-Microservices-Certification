const _ = require("./functional")

const logger = obj => {
    const dateISO = (new Date()).toISOString()
    
    _.flow(
        _.passOn("[${date}]: ${msg}"),
        _.replacer([
            ["date", (new Date()).toISOString()],
            ["msg", obj]
        ]),
        console.log
    )()
    
    return obj
}

module.exports = logger