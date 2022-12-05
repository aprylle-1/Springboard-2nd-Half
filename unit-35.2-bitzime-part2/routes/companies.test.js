process.env.NODE_ENV = "test"

const request = require("supertest")

const app = require('../app')
const db = require('../db')

let testCompany;

beforeAll(async()=>{
    await db.query(`DELETE FROM industries;`)
    await db.query(`INSERT INTO industries(code, industry)
    VALUES ('acct', 'Accounting');`)
})
beforeEach(async ()=>{
    const results = await db.query(`
        INSERT INTO
        companies (code, name, description)
        VALUES ('TestCompany', 'Test Company', 'This is a test')
        RETURNING *;
        `);
    
    const industries = await db.query(`INSERT INTO companies_industries (comp_code, ind_code) VALUES ('TestCompany', 'acct');`)
    testCompany = results.rows[0]
})

afterEach(async()=>{
    await db.query(`DELETE FROM companies;`)
})

afterAll(async function() {
    // close db connection
    await db.end();
  });

describe('GET /companies', ()=>{
    test('Gets a list of 1 company', async ()=>{
        const response = await request(app).get(`/companies`)
        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({companies : [testCompany]})
    })
})

describe('GET /companies/:code', ()=>{
    test('Gets a single company', async()=>{
        const response = await request(app).get('/companies/TestCompany')
        expect(response.statusCode).toBe(200)
        testCompany.industries = ["Accounting"]
        expect(response.body).toEqual({company : testCompany})
    })

    test('Respond with 404 if company code is invalid', async()=>{
        const response = await request(app).get('/companies/invalidCode')
        expect(response.statusCode).toBe(404)
        expect(response.body).toEqual({	"error": {
            "message": "Cannot find company with code invalidCode",
            "status": 404
        },
        "message": "Cannot find company with code invalidCode"})
    })
})

describe('POST /companies', ()=>{
    test('Creates a single company', async()=>{
        const response = await request(app).post('/companies').send({name: "AnotherTest", description : "AnotherTestCompany"})
        expect(response.statusCode).toBe(201)
        expect(response.body).toEqual({company : {code : "anothertest", name: "AnotherTest", description : "AnotherTestCompany"}})
    })

    test('Returns 400 if parameter name is missing', async()=>{
        const response = await request(app).post('/companies').send({code : "ATestComp", description : "AnotherTestCompany"})
        expect(response.statusCode).toBe(400)
    })

    test('Returns 400 if parameter name is missing', async()=>{
        const response = await request(app).post('/companies').send({code : "ATestComp", name: "AnotherTest"})
        expect(response.statusCode).toBe(400)
    })
})

describe('PUT /companies/:code', ()=>{
    test('Updates a single company', async()=>{
        const response = await request(app).put('/companies/TestCompany').send({name: "Updated", description : "UpdatedTestCompany"})
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({company : {code : "TestCompany", name: "Updated", description : "UpdatedTestCompany"}})
    })

    test('Returns 404 invalid coode', async()=>{
        const response = await request(app).put('/companies/InvalidCode').send({name: "Updated", description : "UpdatedTestCompany"})
        expect(response.statusCode).toBe(404)
    })
})

describe('DELETE /companies/code', ()=>{
    test('Delete a single company', async()=>{
        const response = await request(app).delete('/companies/TestCompany')
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({status: "deleted"})
    })

    test('Returns 404 invalid coode', async()=>{
        const response = await request(app).delete('/companies/InvalidCode')
        expect(response.statusCode).toBe(404)
    })
})