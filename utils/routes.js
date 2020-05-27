var express = require('express')
var app = express()
var _ = require("./functional")
var bodyParser = require("body-parser")

const sendIndex = dir => (req,res) => res.sendFile(dir + "/views/index.html")
const sendJson = (req,res) => {
    var obj = {"message": "Hello json"}
    if (process.env.MESSAGE_STYLE == "uppercase") {
        obj.message = obj.message.toUpperCase()
    }
    res.json(obj)
}
const serveStaticContent = dir => express.static(dir + "/public")
const addTimeToRequest = (req,res,next) => {
    req.time = new Date().toString()
    next()
} 
const sendTimeAsJson = (req,res) => res.json({time: req.time})
const repeatTheWord = (req, res) => res.json({echo: req.params.word})
const sendNameAsJson = (body,res) => res.json({name: _.flow(
    _.passOn(body.first),
    _.append(" "),
    _.append(body.last)
)()})

const routes = home => {
    // Routes
    app.get("/", sendIndex(home))
    app.get("/json", sendJson)
    app.get("/now", addTimeToRequest, sendTimeAsJson)
    app.get("/:word/echo", repeatTheWord)

    app.use(bodyParser.urlencoded({extended: false}))

    app.route("/name")
        .get((req,res) => sendNameAsJson(req.query, res))
        .post((req, res) => sendNameAsJson(req.body, res))
    app.use(serveStaticContent(home))

    return app
}

// --> 11)  Mount the body-parser middleware  here


/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>

  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */



// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = routes

