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


<!-- {/* <Carousel slide>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="data:image/jpeg;base64,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"
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="data:image/jpeg;base64,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"
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt03TDa9C4FIE9CpnZ6SqrsAPdxtkli76-59J6ptT6xNtuv-MF&s"
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel> */} -->