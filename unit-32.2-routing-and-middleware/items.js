const express = require('express')
const app = require('./app')
const router = new express.Router()
const ExpressError = require('./expressError')

let items = require('./fakeDb')

router.get('/', function(req,res,next){
    return res.json({items : items})
})

router.post('/', function(req,res,next){
    try{
        const name = req.body.name
        const price = req.body.price
        if (!name || !price){
            throw new ExpressError("Missing field. Request must have both name and price", 400)
        
        }
        const item = {
            name : req.body.name,
            price : req.body.price
        }
        items.push(item)
        return res.status(201).json({"added" : item})
    }
    catch(error){
        next(error)
    }
})


router.get('/:name', function(req,res,next){
    try{
        const item = items.find(item => item.name === req.params.name)
        if (!item){
            throw new ExpressError("Item does not exist in the database", 404)
        }
        return res.send(item)
    }
    catch(error){
        next(error)
    }
})

router.patch('/:name', function(req,res,next){
    try{
        const item = items.find(item => item.name === req.params.name)
        if (!item){
            throw new ExpressError("Item does not exist", 404)
        }
        if(req.body.name){
            item.name = req.body.name
        }
        if(req.body.price){
            item.price = req.body.price
        }
        return res.json({updated : item})
    }
    catch(error){
        next(error)
    }
})

router.delete('/:name', function(req,res,next){
    try{
        const itemIndex = items.findIndex(item=> item.name == req.params.name)
        if (itemIndex === -1){
            throw new ExpressError("Item does not exist in database", 404)
        }
        items.splice(itemIndex, 1)
        return res.json({message: "Deleted"})
    }
    catch(error){
        next(error)
    }
})
module.exports = router