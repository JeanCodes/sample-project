// Full Documentation - https://docs.turbo360.co
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const express = require('express')

const app = express() // initialize app


vertex.configureApp(app)
app.use(vertex.setContext(process.env))


const timestamp = ((req, res, next) => {
	const timestamp = new Date();
	req.timestamp = timestamp.toString();
	next();
})

app.use(timestamp);
// import routes
const index = require('./routes/index')
const register = require('./routes/register')
const api = require('./routes/api')

// set routes
app.use('/', index)
app.use('/register', register)
app.use('/api', api) // sample API Routes


module.exports = app