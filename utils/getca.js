const f = require('util').format
const fs = require('fs')
const ca = (dir, name) => [fs.readFileSync(dir + "/" + name)]
module.exports = ca