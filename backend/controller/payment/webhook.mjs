
import Stripe from 'stripe'
import dotenv from 'dotenv'
import OrderModel from '../../models/orders.mjs';
dotenv.config()

const stripe = Stripe(process.env.STRIPE_KEY)


const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY;


async function getLineItems(lineItems){
  let ProductItems = []

  console.log("lineItems  >>>....>>>>>>>", lineItems)

  if(lineItems?.data?.length){
    for(const item of lineItems.data){
      const product = await stripe.products.retrieve(item.price.product)

      
      const productId = product.metadata.productId 
      // console.log("productId/////,,,,,,>>>>>", productId)
      

      const ProductData = {
            productId: productId,
            name : product.name,
            price: item.price.unit_amount/100,
            quantity: item.quantity,
      }

      ProductItems.push(ProductData)

      // console.log("ProductData ....>>>>>", ProductData)
    }
  }

  return ProductItems
}


const webhook = async(req, res) => {
    const sig = req.headers['stripe-signature'];

    const PayloadString = JSON.stringify(req.body)

    const header = stripe.webhooks.generateTestHeaderString({
        payload: PayloadString,
        secret: endpointSecret,
    });

    let event;

  try {
    event = stripe.webhooks.constructEvent(PayloadString, header, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  //Hande event 
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;

      console.log("session" , session)

      const lineItems = await stripe.checkout.sessions.listLineItems(session.id)

      const ProductDetails  = await getLineItems(lineItems)


      const orderDetails = {
        userId: session.metadata.userId,
        items: ProductDetails,
        totalAmount: session.amount_total/100,
        // delivery: "Pending",
        paymentMethod: session.payment_method_types[0],
        shippingAddress: session.shipping_details.address,
        name: session.shipping_details.name
      }

      const order = new OrderModel(orderDetails)
      const saveOrder = await order.save() 
     
      console.log("orderDetails", orderDetails)

      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send()
}

export default webhook

 