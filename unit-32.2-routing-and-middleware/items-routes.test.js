process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
let items = require("./fakeDb");

let phone = { name: "phone", price: 1000 };

beforeEach(function() {
    items.push(phone);
});
  
afterEach(function() {
    items.length = 0;
});

describe("GET /items", function() {
    test("Gets a list of items", async function() {
      const resp = await request(app).get(`/items`);
      expect(resp.statusCode).toBe(200);
  
      expect(resp.body).toEqual({items: [phone]});
    });
});

describe("GET /items/:name", function() {
    test("Gets a single item", async function() {
      const resp = await request(app).get(`/items/${phone.name}`);
      expect(resp.statusCode).toBe(200);
  
      expect(resp.body).toEqual(phone);
    });
  
    test("Responds with 404 if item can't be found", async function() {
      const resp = await request(app).get(`/items/iphone`);
      expect(resp.statusCode).toBe(404);
    });
});

describe("POST /items", function() {
    test("Creates a new item", async function() {
      const resp = await request(app)
        .post(`/items`)
        .send({
          name: "toothbrush",
          price : 10
        });
      expect(resp.statusCode).toBe(201);
      expect(resp.body).toEqual({
        added: { name: "toothbrush", price: 10 }
      });
    });

    test("Responds with 400 if item name field is missing", async function() {
        const resp = await request(app)
        .post('/items')
        .send({
            price: 10000
        });
        expect(resp.statusCode).toBe(400)
    });

    test("Responds with 400 if price field is missing", async function() {
        const resp = await request(app)
        .post('/items')
        .send({
            name: "iphone"
        });
        expect(resp.statusCode).toBe(400)
    });
});

describe("PATCH /items/:name", function() {
    test("Updates a single item", async function() {
      const resp = await request(app)
        .patch(`/items/${phone.name}`)
        .send({
          name: "iphone14"
        });
      expect(resp.statusCode).toBe(200);
      expect(resp.body).toEqual({
        updated: { name: "iphone14", price: phone.price}
      });
    });
  
    test("Responds with 404 if name is invalid", async function() {
      const resp = await request(app).patch(`/items/toothbrush`);
      expect(resp.statusCode).toBe(404);
    });
});

describe("DELETE /items/:name", function() {
    test("Deletes a single item", async function() {
      const resp = await request(app).delete(`/items/${phone.name}`);
      expect(resp.statusCode).toBe(200);
      expect(resp.body).toEqual({ message: "Deleted" });
    });

    test("Responds with 404 if item not found", async function(){
        const resp = await request(app).delete(`/items/toothbrush`);
        expect(resp.statusCode).toBe(404)
    });
  });