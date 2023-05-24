const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);


export default async function handler(req, res) {
  
  if (req.method === "POST") {
    const { items, email } = req.body;

    const transformedItems = items?.map((item) => ({
      quantity: 1,
      price_data: {
          currency: "usd",
          unit_amount: item.price*100,
          product_data: {
              name: item.title,
              description: item.description,
              images: [item.image],
          },
      },
  }));
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: transformedItems,
        mode: "payment",
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/checkout`,
        metadata: {
          email,
          images: JSON.stringify(items.map((item) => item.image)),
        },
      });
      res.status(200).json({ checkoutUrl: session.url });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}