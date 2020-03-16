// Full Documentation - https://docs.turbo360.co
const express = require('express')
const router = express.Router()

//const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
//const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
//const router = vertex.Router()


const profiles = {
	Elon: {
		username: 'Elon'
		,image: '/images/elon.jpg'
		,name: 'Elon Musk'
		,company: 'Tesla' 
		,favLanguage: ['javascript','C','python']

	},
	Steve: {
		username: 'Steve'
		,image: '/images/steve.jpg'
		,name: 'Steve Jobs'
		,company: 'Apple'
		,favLanguage: ['C++','C','python']

	},
	Bill: {
		username: 'Bill'
		,image: '/images/bill.jpg'
		,name: 'Bill Gates'
		,company: 'Microsoft'
		,favLanguage: ['C#','C','Java']

	}
}

router.get('/', (req, res, next) => {
	res.render('index', {text: 'This is the dynamic data. Open index.js from the routes directory to see.'})
})

router.get('/profiles', (req, res, next) => {
	const keys = Object.keys(profiles)
	const list = []
	keys.forEach(key => {
		list.push(profiles[key])
	})


	const data = {
		profiles: list
		,timestamp: req.timestamp
	}
	res.render('profiles', data)
})

router.post('/addProfile', (req, res, next) =>{
	const body = req.body
	body['favLanguage'] = req.body.favLanguage.split(',')
	profiles[body.username] = body;
	res.redirect('/profile/'+body.username);
})

router.post('/post', (req, res, next) =>{

	const body = req.body;

	res.json({
		confirmation: 'success'
		,data: body
	})
})

router.get('/query', (req, res, next) =>{

	const name = req.query.name;
	const occupation = req.query.occupation;

	const data = {
		query: 'test'
		,name: name
		,occupation
	}

	res.render('profile', data);

})

router.get('/:path', (req, res, next) => {

	const path = req.params.path;
	const data = {
		path: path
	}

	res.json(data)

})

router.get('/:profile/:username', (req, res, next) => {

	const profile = req.params.profile;
	const username = req.params.username;
	const selected = profiles[username];

	if (selected == null){
		res.json({
			confirmation: 'Fail'
			,message: 'User with '+ username+' not found'
		})
	}
	const data = {
		confirmation: 'Confirmed'
		,selected
	}

	selected.timestamp = req.timestamp

	res.render('profile',selected);

})


module.exports = router
