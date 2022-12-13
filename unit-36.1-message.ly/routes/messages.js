const express = require(`express`)
const router = new express.Router()
const User = require("../models/user")
const Message = require("../models/message")
const { authenticateJWT } = require("../middleware/auth")
const { ensureLoggedIn } = require("../middleware/auth")
const { ensureCorrectUser } = require("../middleware/auth")
const ExpressError = require("../expressError")
/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/

router.get("/:id", ensureLoggedIn, async (req, res, next)=>{
    try{
        const id = req.params.id
        const message = await Message.get(id)
        const from_username = message.from_user.username
        const to_username = message.to_user.username
        const curr_user = req.user.username
        console.log(curr_user)
        if (curr_user == from_username || curr_user == to_username) {
            return res.json({message : message})
        }
        throw new ExpressError("Unauthorized", 401)
    }
    catch(err){
        next(err)
    }
})


/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/

router.post("/", ensureLoggedIn, async (req, res, next)=>{
    try{
        const from_username = req.user.username
        console.log(from_username)
        const {to_username, body} = req.body
        console.log(to_username,body)
        if (!to_username || !body) {
            throw new ExpressError("Missing required parameter.", 400)
        }
        const message = await Message.create({from_username, to_username, body})
        return res.status(201).json({message : message})
    }
    catch(err){
        next(err)
    }
})



/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/

router.post('/:id/read', ensureLoggedIn, async(req, res, next)=>{
    try{
        const id = req.params.id
        const curr_user = req.user.username
        const message = await Message.get(id)
        const to_user = message.to_user.username
        if (curr_user === to_user){
            const marked_message = await Message.markRead(id)
            return res.json({marked_message})
        }
        throw new ExpressError("Unauthorized", 401)
    }
    catch(err){
        next(err)
    }
})
 
module.exports = router

