        creating a stripe_user in USER model
        // const stripe_profile = await stripe.accounts.create({
        //     type: 'express',
        //     country: 'US',
        //     email: email,
        //     capabilities: {
        //         card_payments: {requested: true},
        //         transfers: {requested: true}
        //     }
        // })

beginnings of stripe sales processing from salesRoutes
// const {STRIPE_KEY} = require('../config')

// const configureStripe = require('stripe')
// const stripe = configureStripe(STRIPE_KEY)

// const postStripeCharge = res => (stripeErr, stripeRes) => {
//   if (stripeErr) {
//     res.status(500).send({error: stripeErr})
//   } else {
//     res.status(200).send({success: stripeRes})
//   }
// }

// const accountLinks = async (buyerAccount) =>  await stripe.accountLinks.create({
//     account: buyerAccount,
//     refresh_url: 'http://localhost:5000/listings',
//     return_url: 'http://localhost:5000/listings',
//     type: 'account_onboarding'
// });

// const paymentIntent = async (sellerAccount, productPrice)=> await stripe.paymentIntents.create({
//     payment_method_types: ['card'],
//     amount: productPrice,
//     currency: 'usd',
//     application_fee_amount: 5,
//     transfer_data: {
//       destination: sellerAccount,
//     },
//   });

// router.get('/secret', async function(req, res, next){
//     const intent = await paymentIntent(req.body.sellerAccount, req.body.productPrice)
//     return res.json({client_secret: intent.client_secret})
// })

// router.post('/checkout', (req, res, next) => {
//   try {
//     await accountLinks(req.body.buyerAccount)
//     stripe.charges.create(req.body, postStripeCharge(res))
//   } catch (error) {
//     next(error)
//   }
// })

from React App.js

const stripePromise = 
loadStripe(
  'pk_live_51JV6qbFPBCoGJFkJmsNkiC6Ypvw3y2esvQvvJDGdH8gI4Hb6rJmZEpDb2GI4vajctS11oaKuozOtGtbuX9pnNTUf00fCvJk5ON'
  )

  import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckOutForm from './Transactions/CheckoutForm';


          <Elements stripe={stripePromise}>
          Had rest of routes here

    <Route exact path='/checkout/:listingId'>
        <CheckOutForm/>
    </Route>
    </Elements>


from listing model
    static async searchShoes(){
        let url = 'the-sneaker-database.p.rapidapi.com'
        let headers= {'x-rapidapi-host': 'the-sneaker-database.p.rapidapi.com',
        'x-rapidapi-key': '3b0d1d1836mshc9833e39623b385p1895ffjsn52a8d822ce9b'}
        const result = await axios({url, method:'get', data:{}, headers })

        return result.data
    }

    static async allFromUser(username){
        const result = await db.query(`
        SELECT * FROM posts
        WHERE userId = $1`, [username])

        if(result.rows.length === 0){
            return 'No Posts Written Yet'
        }else{
            return result.rows
        }
    }

post update
        static async update(postId, {title, body, picture}){
        const result = await db.query(`
        UPDATE posts
        SET title = $1, body = $2, picture = $3
        WHERE id = $4
        RETURNING *`, [title, body, picture, postId])

        return result.rows[0]
    }
    router.patch('/:postId/update',isLoggedIn, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, postSchema)
        if(!validator.valid){
            const errs = validator.errors.map(e => e.stack)
            throw new BadRequestError(errs)
        }

        //check if post exists
        await Post.find(req.params.postId)
        //check if requestor allowed to change post
        await Post.allowedToChange(req.user, req.params.postId)

        const response = await Post.update(req.params.postId, req.body)

        return res.json(response)
    } catch (err) {
        next(err)
    }
})

        static async allFromUser(username){
        const result = await db.query(`
        SELECT * FROM comments
        WHERE userId = $1`, [username])

        return result.rows
    }
    
listing update
        static async update(id, {title, picture, price, details}){
        const result = await db.query(`
        UPDATE listings
        SET title = $1,
            picture = $2,
            price = $3,
            details = $4
        WHERE id = $5
        RETURNING *`, [title, picture, price, details, id])

        return result.rows[0]
    }

    router.patch('/:listingId', async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, updateListingSchema)
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack)
            throw new BadRequestError(errs)
        }

        //check if the listing exists
        await Listing.find(req.params.listingId)
        //check if requestor is allowed to change the listing
        await Listing.allowedToChange(req.user.username, listingId)

        let response = await Listing.update(req.params.listing, req.body)

        return res.json(response)

    } catch (err) {
        next(err)
    }
})

router.get('/:username/posts', async function (req, res, next) {
    try {
        const response = await Post.allFromUser(req.params.username)

        return res.json(response)
    } catch (err) {
        next(err)
    }
})

router.get('/:username/comments', async function (req, res, next) {
    try {
        const response = await Comment.allFromUser(req.params.username)

        return res.json(response)
    } catch (err) {
        next(err)
    }
})