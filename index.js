require('dotenv').config()  // get vars from .env

const express = require('express')    // fast and minimalist web framework
const app = express()     // instance of express

const bodyParser = require('body-parser') // mid which parse incoming req bodies before handle
const cors = require('cors') // mid that enable CORS

const mailRouter = require('./routes/mailRouter') // add route mid

app.use(cors()) // enable cors for all routes

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json()) 

app.use('/api/mail', mailRouter) // add routes after path between '...'

// Return Not Found
app.use((req, res, next) => {
    return next({
        status: 404,
        message: 'Not Found'
    })
})
// Return Server Error
app.use(function (error, req, res, next) {
    if (error instanceof SyntaxError) {
        return res.status(500).send({
            data: "Invalid data"
        });
    } else {
        next();
    }
});

// Start server and print in console
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('App is listening on port ' + listener.address().port)
})
