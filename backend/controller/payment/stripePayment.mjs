import Stripe from 'stripe'
import dotenv from 'dotenv'
// import userModel from '../../models/userModel.mjs'
dotenv.config()

const stripe = Stripe(process.env.STRIPE_KEY)


const stripePaymentController = async(req,res) => {
    try {
        const products = req.body

        

        const line_items = products.map((product) => {
            return(
                {
                    price_data: {
                      currency: 'kes',
                      product_data: {
                        name: product?.productId.productName,
                        metadata: {
                          productId: product?.productId._id,
                        },
                        // image: product?.productId.productImage[0],
                      },
                      unit_amount: product?.productId.sellingPrice *100,
                    },
                    quantity: product?.quantity,
                  }
            )
        })


        if(!line_items){
          throw new Error('Your cart is empty!!!')
        }
        
        const session = await stripe.checkout.sessions.create({
          shipping_address_collection: {
            allowed_countries: ['US', 'CA', 'KE'],
          },
          shipping_options: [
            {
              shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                  amount: 0,
                  currency: 'kes',
                },
                display_name: 'Free shipping',
                delivery_estimate: {
                  minimum: {
                    unit: 'business_day',
                    value: 5,
                  },
                  maximum: {
                    unit: 'business_day',
                    value: 7,
                  },
                },
              },
            },
            {
              shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                  amount: 1500,
                  currency: 'kes',
                },
                display_name: 'Next day air',
                delivery_estimate: {
                  minimum: {
                    unit: 'business_day',
                    value: 1,
                  },
                  maximum: {
                    unit: 'business_day',
                    value: 1,
                  },
                },
              },
            },
          ],
            metadata: {
              userId: res.userId
            },
            line_items,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cart`,
          });
        
          res.send({url: session.url});

    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
            error:true
        })
        
    }
}

export default stripePaymentController