process.env.NODE_ENV = "test"

const request = require("supertest")

const app = require('../app')
const db = require('../db')

let testInvoice;

beforeAll(async function (){
    await db.query(`
        INSERT INTO
        companies (code, name, description)
        VALUES ('TestCompany', 'Test Company', 'This is a test')
    `);
})
beforeEach(async ()=>{
    results = await db.query(`
        INSERT INTO
        invoices (comp_code, amt)
        VALUES ('TestCompany', 500)
        RETURNING *
        `);
    testInvoice = results.rows[0]
})

afterEach(async()=>{
    await db.query(`DELETE FROM invoices;`)
})

afterAll(async function() {
    await db.query(`DELETE FROM companies;`)
    await db.end();
  });

describe('GET /invoices', ()=>{
    test('Gets a list of 1 invoice', async ()=>{
        const response = await request(app).get(`/invoices`)
        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({invoices: [{
            id : testInvoice.id,
            comp_code : 'TestCompany',
            amt : 500,
            paid : expect.any(Boolean),
            add_date : expect.any(String),
            paid_date : null
        }]})
    })
})

describe('GET /invoices/:id', ()=>{
    test('Gets a single invoice', async()=>{
        const response = await request(app).get(`/invoices/${testInvoice.id}`)
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({invoice: {
            id : testInvoice.id,
            comp_code : 'TestCompany',
            amt : 500,
            paid : expect.any(Boolean),
            add_date : expect.any(String),
            paid_date : null
        }})
    })

    test('Respond with 404 if invoice id is invalid', async()=>{
        const response = await request(app).get('/companies/0')
        expect(response.statusCode).toBe(404)
    })
})

describe('POST /invoices', ()=>{
    test('Create a single invoice', async()=>{
        const response = await request(app).post(`/invoices`).send({comp_code : "TestCompany", amt : 1000})
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({invoice:{
            id : expect.any(Number),
            comp_code : "TestCompany",
            amt : 1000,
            paid : expect.any(Boolean),
            add_date : expect.any(String),
            paid_date : null
        }})
    })
})

describe('PUT /invoices/:id', ()=>{
    test('Updates a single invoice, not paid', async()=>{
        const response = await request(app).put(`/invoices/${testInvoice.id}`).send({amt : 3000, paid : false})
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({invoice:{
            id : expect.any(Number),
            comp_code : "TestCompany",
            amt : 3000,
            paid : false,
            add_date : expect.any(String),
            paid_date : null
        }})
    })

    test('Updates a single invoice, paid', async()=>{
        const response = await request(app).put(`/invoices/${testInvoice.id}`).send({amt : 3000, paid : true})
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({invoice:{
            id : expect.any(Number),
            comp_code : "TestCompany",
            amt : 3000,
            paid : true,
            add_date : expect.any(String),
            paid_date : expect.any(String)
        }})
    })

    test('Returns 404 invalid id', async()=>{
        const response = await request(app).put('/invoices/0').send({amt : 1000, paid : false})
        expect(response.statusCode).toBe(404)
    })
})

describe('DELETE /invoices/:id', ()=>{
    test('Delete a single invoice', async()=>{
        const response = await request(app).delete(`/invoices/${testInvoice.id}`)
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({status: "deleted"})
    })

    test('Returns 404 invalid id', async()=>{
        const response = await request(app).delete('/invoices/0')
        expect(response.statusCode).toBe(404)
    })
})

describe('GET /invoices/companies/:code', ()=>{
    test('Get invoices of a single company', async()=>{
        const response = await request(app).get('/invoices/companies/TestCompany')
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
            company : {
                code : 'TestCompany',
                name :  'Test Company',
                description : 'This is a test',
                invoices : [
                    {
                        id : expect.any(Number),
                        comp_code : "TestCompany",
                        amt : 500,
                        paid : expect.any(Boolean),
                        add_date : expect.any(String),
                        paid_date : null
                    }
                ]
            }
        })
    })

    test('Respond with 404 if invalid comp_code', async()=>{
        const response = await request(app).get('/invoices/companies/InvalidCode')
        expect(response.statusCode).toBe(404)
    })
})