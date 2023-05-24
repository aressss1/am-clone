

import { buffer } from "micro";
import { addDoc, collection, doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { removeAllfromBasket} from "@/store/basketSlice";


const fulfilOrder = async (session) => {
  

  try {
    await setDoc(
      doc(collection(db, 'users', session.metadata.email, 'orders'), session.id),
      {
        amount: session.amount_total,
        images: JSON.parse(session.metadata.images),
        timestamp: serverTimestamp(),
      }
    )
    console.log(`SUCCESS: Order ${session.id} has been added to DB`);
  } catch (error) {
    console.error("Error adding order to DB:", error);
  }
};

// Connection to Stripe
const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

const endpointSecret = `${process.env.STRIPE_WEBHOOK_SECRET}`;

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;

    // Verify that the event posted came from Stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log("⚠️ Webhook signature verification failed.", err.message);
      return res.status(400).send("Webhook Error");
    }

    // Event Handler
    if (event.type === "checkout.session.completed") {
      try {
        const session = event.data.object;
        await fulfilOrder(session);
        return res.status(200).send("Success");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(`Unhandled event type ${event.type}.`);
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
