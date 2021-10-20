"use strict"

const app = require('./app')
const request = require('supertest')
let token
let listing = {}

beforeAll(async function(){
    let signup = await request(app).post('/users/login').send({
        username:'test',
        password:'test'
    })
    token=signup.body.token

    listing = await request(app).post('/listings/new').send({
        title:"testListing",
        picture:"data:image/jpeg;base64,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",
        price:"100",
        details:"Item is a book",
        sold:false
    }).set('Authorization', `Bearer ${token}`)
})
/** POST a sale */
describe('POST/ sales', function(){
    console.log(token)
    let newSale = {
        "listingId": listing.body.id,
        "seller": "peakyblinder3",
        "buyer": "michael",
        "returned": false
    }
    let badSale = {
        "listingId":listing.body.id,
        "seller":"peakyblinder3",
    }

    test('works with good data', async function(){
        let res = await request(app).post('/sales/new').send(newSale).set("Authorization", `Bearer ${token}`)
        
        expect(res.statusCode).toBe(201)
        expect(typeof res.body.id).toBe('number')
        expect(res.body.listing).toEqual(5)
        expect(res.body.seller).toEqual('peakyblinder3')
    })
    test('returns error on selling already sold item', async function(){
        let res = await request(app).post('/sales/new').send(newSale).set("Authorization", `Bearer ${token}`)

        expect(res.statusCode).toBe(400)
        expect(res.body).toEqual({
            "error": {
              "message": "Item Already Sold: 5",
              "status": 400
            }
        })

    })
    test('does not work with incomeplete data', async function(){
        let res = await request(app).post('/sales/new').send(badSale).set("Authorization", `Bearer ${token}`)

        expect(res.statusCode).toBe(400)
        expect(res.body).toEqual({
            "error": {
              "message": [
                "instance requires property \"buyer\"",
                "instance requires property \"returned\""
              ],
              "status": 400
            }
        })
    })
    test('does not work without token', async function(){
        let res = await request(app).post('/sales/new').send(newSale)

        expect(res.statusCode).toBe(400)
        expect(res.body).toEqual({
            "error": {
              "message": "Please Log In",
              "status": 400
            }
        })
    })
})