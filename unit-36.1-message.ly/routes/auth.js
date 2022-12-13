const express = require(`express`)
const router = new express.Router()
const User = require("../models/user")
const { SECRET_KEY } = require('../config')
const jwt = require("jsonwebtoken")
const ExpressError = require("../expressError")
/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/


/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 * 
 *
 *  Make sure to update their last-login!
 */

router.post('/login', async (req, res, next) => {
    try{
        const {username, password} = req.body;
        const results = await User.authenticate(username, password)
        if (results === true){
            User.updateLoginTimestamp(username)
            let token = jwt.sign({username, password}, SECRET_KEY)
            return res.json({token})
        }
        else {
            throw new ExpressError('Invalid username/password', 400)
        }
    }
    catch(err){
        next(err)
    }
})

router.post('/register', async (req, res, next) =>{
    try{
        const {username, password, first_name, last_name, phone} = req.body;
        const results = await User.register({username, password, first_name, last_name, phone})
        let payload = {username, password, first_name, last_name, phone}
        let token = jwt.sign(payload, SECRET_KEY)
        return res.status(201).json({token})
    }
    catch(error){
        next(error)
    }
})

module.exports = router


