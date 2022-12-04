const express = require("express")
const router = express.Router()
const db = require("../db")
const ExpressError = require("../expressError")

router.get('/', async (req,res,next)=>{
    try{
        const results = await db.query('SELECT * FROM invoices');
        return res.json({invoices : results.rows})
    }
    catch(err){
        next(err)
    }
})

router.get('/:id', async(req,res,next)=>{
    try{
        const id = req.params.id
        const results = await db.query('SELECT * FROM invoices WHERE id=$1', [id])
        if (results.rows.length === 0){
            throw new ExpressError(`Cannot find invoice with id ${id}`, 404)
        }
        else{
            return res.json({invoice: results.rows[0]})
        }
    }
    catch(err){
        next(err)
    }
})

router.post('/', async(req,res,next)=>{
    try{
        const {comp_code, amt} = req.body
        if (!comp_code || !amt){
            throw new ExpressError ("Missing parameters. comp_code and amt is required", 400)
        }
        if (amt < 0){
            throw new ExpressError ("Amt must not be less than 0", 400)
        }
        const results = await db.query(`INSERT INTO invoices (comp_code, amt) VALUES ($1, $2) RETURNING *`, [comp_code, amt])
        return res.json({invoice : results.rows[0]})
    }
    catch(err){
        next(err)
    }
})

router.put('/:id', async function (req,res,next){
    try{
        const {amt} = req.body
        if (!amt){
            throw new ExpressError ("Missing parameters. Amount is required", 400)
        }
        const results = await db.query(`UPDATE invoices SET amt=$1 WHERE id=$2 RETURNING *`, [amt, req.params.id])
        if (results.rowCount === 0){
            throw new ExpressError (`Invoice with id ${req.params.id} does not exists.`, 404)
        }
        return res.json({invoice : results.rows[0]})
    }
    catch(err){
        next(err)
    }
})

router.delete('/:id', async function (req,res,next){
    try{
        const results = await db.query(`DELETE FROM invoices WHERE id=$1`, [req.params.id])
        if (results.rowCount === 0){
            throw new ExpressError (`Invoice with id ${req.params.id} does not exists.`, 404)
        }
        return res.json({status: "deleted"})
    }
    catch(err){
        next(err)
    }
})

router.get("/companies/:code", async function(req,res,next){
    try{
        const code = req.params.code
        const comp = await db.query('SELECT * FROM companies WHERE code=$1',[code])
        if (comp.rows.length === 0){
            throw new ExpressError (`Company with code ${code} does not exists.`, 404)
        }
        const invoices = await db.query('SELECT * FROM invoices WHERE comp_code=$1', [code])
        const results = {
            company : {
                code : code,
                name : comp.rows[0].name,
                description : comp.rows[0].description,
                invoices : invoices.rows
            }
        }
        return res.json(results)
    }
    catch(err){
        next(err)
    }
})
module.exports = router