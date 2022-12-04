const express = require("express")
const router = express.Router()
const db = require("../db")
const ExpressError = require("../expressError")

router.get('/', async (req,res,next)=>{
    try{
        const results = await db.query('SELECT * FROM companies');
        return res.json({companies : results.rows})
    }
    catch(err){
        next(err)
    }
})

router.get('/:code', async(req,res,next)=>{
    try{
        const code = req.params.code
        const results = await db.query('SELECT * FROM companies WHERE code=$1', [code])
        if (results.rows.length === 0){
            throw new ExpressError(`Cannot find company with code ${code}`, 404)
        }
        else{
            return res.json({company : results.rows[0]})
        }
    }
    catch(err){
        next(err)
    }
})

router.post('/', async(req,res,next)=>{
    try{
        const {code, name, description} = req.body
        if (!code || !name || !description){
            throw new ExpressError ("Missing parameters. Code, name and description is required", 400)
        }
        const results = await db.query(`INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING *`, [code,name,description])
        return res.json({company : results.rows[0]})
    }
    catch(err){
        next(err)
    }
})

router.put('/:code', async function (req,res,next){
    try{
        const {name, description} = req.body
        if (!name || !description){
            throw new ExpressError ("Missing parameters. Code, name and description is required", 400)
        }
        const results = await db.query(`UPDATE companies SET name=$1, description=$2 WHERE code=$3 RETURNING *`, [name, description, req.params.code])
        if (results.rowCount === 0){
            throw new ExpressError (`Company with code ${req.params.code} does not exists.`, 404)
        }
        return res.json({company : results.rows[0]})
    }
    catch(err){
        next(err)
    }
})

router.delete('/:code', async function (req,res,next){
    try{
        const results = await db.query(`DELETE FROM companies WHERE code=$1`, [req.params.code])
        if (results.rowCount === 0){
            throw new ExpressError (`Company with code ${req.params.code} does not exists.`, 404)
        }
        return res.json({status: "deleted"})
    }
    catch(err){
        next(err)
    }
})

module.exports = router