process.env.NODE_ENV = "test"

const request = require("supertest")
const app = require("../app")
const db = require("../db")

let isbn;

beforeEach(async()=>{
    let result = await db.query(`
    INSERT INTO books (isbn, amazon_url, author, language, pages, publisher, title, year)
    VALUES ('isbntest', 'https://test.com', 'testAuthor', 'testLanguage', 100, 'testPublisher', 'testTitle', 2022)
    RETURNING isbn;`)
    isbn = result.rows[0].isbn
})

afterEach(async() =>{
    await db.query('DELETE FROM books;')
})

afterAll(async function () {
    await db.end()
});

describe("GET /books", ()=>{
    test("Get all books", async()=>{
        const response = await request(app).get("/books")
        expect(response.body).toEqual({
            "books" : [
                {
                    "isbn" : "isbntest",
                    "amazon_url" : "https://test.com",
                    "author" : "testAuthor",
                    "language" : "testLanguage",
                    "pages" : 100,
                    "publisher" : "testPublisher",
                    "title" : "testTitle",
                    "year" : 2022
                }
            ]
        })
        expect(response.statusCode).toEqual(200)
    })
})

describe("GET /books/:isbn", ()=>{
    test("Get one book", async()=>{
        const response = await request(app).get(`/books/${isbn}`)
        expect(response.body).toEqual({
            "book" : 
                {
                    "isbn" : "isbntest",
                    "amazon_url" : "https://test.com",
                    "author" : "testAuthor",
                    "language" : "testLanguage",
                    "pages" : 100,
                    "publisher" : "testPublisher",
                    "title" : "testTitle",
                    "year" : 2022
                }
        })
        expect(response.statusCode).toEqual(200)
    })
    test("Respond with 404 if isbn does not exist in database", async()=>{
        const response = await request(app).get("/books/invalidId")
        expect(response.statusCode).toEqual(404)
    })
})

describe("POST /books", ()=>{
    test("Create one book entry", async()=>{
        const book = {
            "isbn" : "isbntest0",
            "amazon_url" : "https://test.com",
            "author" : "testAuthor",
            "language" : "testLanguage",
            "pages" : 100,
            "publisher" : "testPublisher",
            "title" : "testTitle",
            "year" : 2022
        }
        const response = await request(app).post("/books").send(book)
        expect(response.body).toEqual({book : book})
    })
    test("Respond with 400 if missing amazon_url", async ()=>{
        const book = {
            "isbn" : "isbntest0",
            "author" : "testAuthor",
            "language" : "testLanguage",
            "pages" : 100,
            "publisher" : "testPublisher",
            "title" : "testTitle",
            "year" : 2022
        }
        const response = await request(app).post("/books").send(book)
        expect(response.statusCode).toEqual(400)
    })
    test("Respond with 400 if missing author", async ()=>{
        const book = {
            "isbn" : "isbntest0",
            "amazon_url" : "https://test.com",
            "language" : "testLanguage",
            "pages" : 100,
            "publisher" : "testPublisher",
            "title" : "testTitle",
            "year" : 2022
        }
        const response = await request(app).post("/books").send(book)
        expect(response.statusCode).toEqual(400)
    })
    test("Respond with 400 if missing language", async ()=>{
        const book = {
            "isbn" : "isbntest0",
            "author" : "testAuthor",
            "amazon_url" : "https://test.com",
            "pages" : 100,
            "publisher" : "testPublisher",
            "title" : "testTitle",
            "year" : 2022
        }
        const response = await request(app).post("/books").send(book)
        expect(response.statusCode).toEqual(400)
    })
    test("Respond with 400 if missing pages", async ()=>{
        const book = {
            "isbn" : "isbntest0",
            "author" : "testAuthor",
            "language" : "testLanguage",
            "amazon_url" : "https://test.com",
            "publisher" : "testPublisher",
            "title" : "testTitle",
            "year" : 2022
        }
        const response = await request(app).post("/books").send(book)
        expect(response.statusCode).toEqual(400)
    })
    test("Respond with 400 if missing publisher", async ()=>{
        const book = {
            "isbn" : "isbntest0",
            "author" : "testAuthor",
            "language" : "testLanguage",
            "amazon_url" : "https://test.com",
            "pages" : 100,
            "title" : "testTitle",
            "year" : 2022
        }
        const response = await request(app).post("/books").send(book)
        expect(response.statusCode).toEqual(400)
    })
    test("Respond with 400 if missing title", async ()=>{
        const book = {
            "isbn" : "isbntest0",
            "author" : "testAuthor",
            "language" : "testLanguage",
            "amazon_url" : "https://test.com",
            "pages" : 100,
            "publisher" : "testPublisher",
            "year" : 2022
        }
        const response = await request(app).post("/books").send(book)
        expect(response.statusCode).toEqual(400)
    })
    test("Respond with 400 if missing year", async ()=>{
        const book = {
            "isbn" : "isbntest0",
            "author" : "testAuthor",
            "language" : "testLanguage",
            "amazon_url" : "https://test.com",
            "pages" : 100,
            "publisher" : "testPublisher",
            "title" : "testTitle"
        }
        const response = await request(app).post("/books").send(book)
        expect(response.statusCode).toEqual(400)
    })
})

describe("PUT /books/:isbn", ()=>{
    test("Update one book entry", async()=>{
        const UpdateBookEntry = {
            "amazon_url" : "https://test.comUpdate",
            "author" : "testAuthorUpdate",
            "language" : "testLanguageUpdate",
            "pages" : 500,
            "publisher" : "testPublisherUpdate",
            "title" : "testTitleUpdate",
            "year" : 2021
        }
        const response = await request(app).put(`/books/${isbn}`).send(UpdateBookEntry)
        UpdateBookEntry.isbn = isbn
        expect(response.body).toEqual({book : UpdateBookEntry})
    })
    test("Respond with 400 if missing amazon_url", async ()=>{
        const book = {
            "author" : "testAuthor",
            "language" : "testLanguage",
            "pages" : 100,
            "publisher" : "testPublisher",
            "title" : "testTitle",
            "year" : 2022
        }
        const response = await request(app).put(`/books/${isbn}`).send(book)
        expect(response.statusCode).toEqual(400)
    })
    test("Respond with 400 if missing author", async ()=>{
        const book = {
            "amazon_url" : "https://test.com",
            "language" : "testLanguage",
            "pages" : 100,
            "publisher" : "testPublisher",
            "title" : "testTitle",
            "year" : 2022
        }
        const response = await request(app).put(`/books/${isbn}`).send(book)
        expect(response.statusCode).toEqual(400)
    })
    test("Respond with 400 if missing language", async ()=>{
        const book = {
            "author" : "testAuthor",
            "amazon_url" : "https://test.com",
            "pages" : 100,
            "publisher" : "testPublisher",
            "title" : "testTitle",
            "year" : 2022
        }
        const response = await request(app).put(`/books/${isbn}`).send(book)
        expect(response.statusCode).toEqual(400)
    })
    test("Respond with 400 if missing pages", async ()=>{
        const book = {
            "author" : "testAuthor",
            "language" : "testLanguage",
            "amazon_url" : "https://test.com",
            "publisher" : "testPublisher",
            "title" : "testTitle",
            "year" : 2022
        }
        const response = await request(app).put(`/books/${isbn}`).send(book)
        expect(response.statusCode).toEqual(400)
    })
    test("Respond with 400 if missing publisher", async ()=>{
        const book = {
            "author" : "testAuthor",
            "language" : "testLanguage",
            "amazon_url" : "https://test.com",
            "pages" : 100,
            "title" : "testTitle",
            "year" : 2022
        }
        const response = await request(app).put(`/books/${isbn}`).send(book)
        expect(response.statusCode).toEqual(400)
    })
    test("Respond with 400 if missing title", async ()=>{
        const book = {
            "author" : "testAuthor",
            "language" : "testLanguage",
            "amazon_url" : "https://test.com",
            "pages" : 100,
            "publisher" : "testPublisher",
            "year" : 2022
        }
        const response = await request(app).put(`/books/${isbn}`).send(book)
        expect(response.statusCode).toEqual(400)
    })
    test("Respond with 400 if missing year", async ()=>{
        const book = {
            "author" : "testAuthor",
            "language" : "testLanguage",
            "amazon_url" : "https://test.com",
            "pages" : 100,
            "publisher" : "testPublisher",
            "title" : "testTitle"
        }
        const response = await request(app).put(`/books/${isbn}`).send(book)
        expect(response.statusCode).toEqual(400)
    })
    test("Respond with 404 if isbn does not exist in database", async()=>{
        const UpdateBookEntry = {
            "amazon_url" : "https://test.comUpdate",
            "author" : "testAuthorUpdate",
            "language" : "testLanguageUpdate",
            "pages" : 500,
            "publisher" : "testPublisherUpdate",
            "title" : "testTitleUpdate",
            "year" : 2021
        }
        const response = await request(app).put("/books/invalidId").send(UpdateBookEntry)
        expect(response.statusCode).toEqual(404)
    })
})

describe("DELETE /books/:isbn", ()=>{
    test("Delete one book", async()=>{
        const response = await request(app).delete(`/books/${isbn}`)
        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({ message: "Book deleted" })
    })
    test("Respond with 404 if isbn does not exist in database", async()=>{
        const response = await request(app).delete("/books/invalidId")
        expect(response.statusCode).toEqual(404)
    })
})