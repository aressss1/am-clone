
const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);


export default async function handler (req, res)  {

  if (req.method === "POST") {
    const { items, email } = req.body;

    const transformedItems = items?.map((item) => ({
      description: item.description,
      price_data: {
        currency: "usd",
        unit_amount: item.price,
        product_data: {
          name: item.title,
          images: [item.mages],
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
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
