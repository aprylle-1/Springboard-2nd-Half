const express = require("express")
const router = express.Router()
const db = require("../db")
const ExpressError = require("../expressError")

router.get('/', async (req,res,next)=>{
    try{
        let ind_results = await db.query('SELECT * FROM industries');
        let industries = ind_results.rows
        for (let industry of industries){
            const companies = await db.query('SELECT c.name FROM companies_industries ci LEFT JOIN companies c ON ci.comp_code = c.code WHERE ind_code = $1', [industry.code])
            industry.companies = companies.rows.map(company=>company.name);
        }
        return res.json({industries : industries})
    }
    catch(err){
        next(err)
    }
})

router.post('/', async (req,res,next)=>{
    try{
        let {code, industry} = req.body
        if (!code || !industry){
            throw new ExpressError("Missing paramater. code and industry are required", 400)
        }
        const result = await db.query(`INSERT INTO industries (code, industry) VALUES ($1, $2) RETURNING *`, [code, industry])
        return res.status(201).json({industry : result.rows[0]})
    }
    catch(err){
        next(err)
    }
})

router.put('/:ind_code/companies/:comp_code', async(req,res,next)=>{
    try{
        let ind_code = req.params.ind_code
        let comp_code = req.params.comp_code
        const result = await db.query(`INSERT INTO companies_industries (comp_code, ind_code) VALUES ($1, $2) RETURNING *`, [comp_code, ind_code])
        return res.status(201).json({added : result.rows[0]})
    }
    catch(err){
        next(err)
    }
})

// router.get('/:code', async(req,res,next)=>{
//     try{
//         let company;
//         const code = req.params.code
//         const comp_results = await db.query('SELECT * FROM companies WHERE code=$1', [code])
//         if (comp_results.rows.length === 0){
//             throw new ExpressError(`Cannot find company with code ${code}`, 404)
//         }
//         company = comp_results.rows[0]
//         const ind_results = await db.query(`SELECT i.industry FROM industries i LEFT JOIN companies_industries ci ON i.code = ci.ind_code WHERE ci.comp_code = $1`, [code])
//         const industries = ind_results.rows.map(ind => ind["industry"])
//         company.industries = industries
//         return res.json({company : company})
//     }
//     catch(err){
//         next(err)
//     }
// })

// router.post('/', async(req,res,next)=>{
//     try{
//         const {name, description} = req.body
//         if (!name || !description){
//             throw new ExpressError ("Missing parameters. name and description is required", 400)
//         }
//         const code = slugify(name, {replacement : "_", lower: true})
//         const results = await db.query(`INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING *`, [code,name,description])
//         return res.status(201).json({company : results.rows[0]})
//     }
//     catch(err){
//         next(err)
//     }
// })

// router.put('/:code', async function (req,res,next){
//     try{
//         const {name, description} = req.body
//         if (!name || !description){
//             throw new ExpressError ("Missing parameters. Code, name and description is required", 400)
//         }
//         const results = await db.query(`UPDATE companies SET name=$1, description=$2 WHERE code=$3 RETURNING *`, [name, description, req.params.code])
//         if (results.rowCount === 0){
//             throw new ExpressError (`Company with code ${req.params.code} does not exists.`, 404)
//         }
//         return res.json({company : results.rows[0]})
//     }
//     catch(err){
//         next(err)
//     }
// })

// router.delete('/:code', async function (req,res,next){
//     try{
//         const results = await db.query(`DELETE FROM companies WHERE code=$1`, [req.params.code])
//         if (results.rowCount === 0){
//             throw new ExpressError (`Company with code ${req.params.code} does not exists.`, 404)
//         }
//         return res.json({status: "deleted"})
//     }
//     catch(err){
//         next(err)
//     }
// })

module.exports = router