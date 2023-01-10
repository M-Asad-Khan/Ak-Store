const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')


const app = express();

app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use(cors({ origin: true, credentials: true }))
YOUR_DOMAIN = 'http://localhost:4242'


const stripe = require('stripe')('sk_test_51MOhc1GlkS9mjP0WSRJJFxdkXszBz0hePKNOyaP7kCg9CzDL3xSTLobYmMK6MmiUq0M7dkHOdvWqC08elRZh3Iw600UCDj1taO');

app.post('/checkout', async (req, res, next) => {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: req.map((item) => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                        image: [item.product]
                    },
                    unit_amount: item.price * 100
                },
                quantity: item.quantity,
            })),
            mode: "payment",
            success_url: `${YOUR_DOMAIN}/success.html`,
            cancel_url: `${YOUR_DOMAIN}/cancel.html`,

        })

        res.status(200).json(session)
    }
    catch (error) {
        next(error)

    }
})

app.listen(4242, () => console.log("app running on 4242"))