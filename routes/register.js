const express = require('express')
const router = express.Router()

router.post('/user', (req, res, next) =>{
	const body = req.body;

	res.json({
        confirmation: 'success'
        ,route: 'register'
		,data: body
	})

})

module.exports = router
