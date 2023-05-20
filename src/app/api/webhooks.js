import { buffer } from 'micro'
import * as admin from "firebase-admin"

//connection between firebase from backend
const serviceAccount = require("../../../permissions.json")

const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}) : admin.app();

const fulfilOrder = async(session) => {

  return app
    .firestore()
    .collection('users')
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      console.log(`SUCCESS: Order ${session.id} had been added to DB `)
    })
}

//connection to Stripe
const stripe = require('stripe')(`${process.env.STRIPE_WEBHOOK_SECRET}`);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET

export  default async (req , res) => {
    if(req.method === "POST"){
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers["stripe-signature"];

        let event ;

        //verify that EVENT posted come from stripe
        try {
            event = stripe.webhooks.constructEvent(
              payload,
              sig,
              endpointSecret
            );
          } catch (err) {
            console.log(`⚠️  Webhook signature verification failed.`, err.message);
            return res.status(400)
          }

          //Event Handler
          if (event.type === "checkout.session.completed") {
            const session = event.data.object;

            return fulfilOrder(session)
              .then(() => res.status(200))
              .catch((err) => res.status(400).send(`Webhook Error ${err.message}`))
          }else {
            console.log(`Unhandled event type ${event.type}.`);
          }
    }
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true
  }
}