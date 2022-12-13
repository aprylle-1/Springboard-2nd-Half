const express = require(`express`)
const router = new express.Router()
const User = require("../models/user")
const ExpressError = require('../expressError')
const { authenticateJWT } = require("../middleware/auth")
const { ensureLoggedIn } = require("../middleware/auth")
const { ensureCorrectUser } = require("../middleware/auth")
/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/

router.get('/', ensureLoggedIn, async (req,res,next)=>{
    const results = await User.all()
    console.log(results)
    return res.json({users : results})
})

/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/

router.get('/:username', ensureCorrectUser, async (req,res,next)=>{
    try{
        const username = req.params.username
        const results = await User.get(username)
        if (!results) {
            throw new ExpressError('User not found', 404)
        }
        return res.json({results})
    }
    catch(e){
        next(e)
    }
})


/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

router.get('/:username/to', ensureCorrectUser, async (req, res, next)=>{
    try{
        const username = req.params.username
        const results = await User.messagesTo(username)
        return res.json({messages : results})
    }
    catch(err){
        next(err)
    }
})


/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

router.get('/:username/from', ensureCorrectUser, async (req, res, next)=>{
    try{
        const username = req.params.username
        const results = await User.messagesFrom(username)
        return res.json({messages : results})
    }
    catch(err){
        next(err)
    }
})

module.exports = router