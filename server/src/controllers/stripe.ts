import Stripe from "stripe";
import { Request, Response } from "express";
import { Order } from "../models/orderModels";
import { AuthRequest } from "../middleware/authMiddleware";
import { User } from "../models/userModels";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

const YOUR_DOMAIN = "https://e-commmerch2-0.vercel.app";


export const stripePayment = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId
    const { cart } = req.body;

    if (!cart || cart.length === 0) {
      res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
      return;
    }
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User is not found"
      });
      return;
    }


    const line_items = cart.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: item.images ? [item.images] : [],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "BD"],
      },
      success_url: `${YOUR_DOMAIN}/success`,
      cancel_url: `${YOUR_DOMAIN}`,
      metadata: {
        user: JSON.stringify(user._id),
        cart: JSON.stringify(cart),
      },
    });

    res.status(200).json({
      success: true,
      url: session.url,
    });
  } catch (error: any) {
    console.log("Stripe Error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const webhook = async (
  req: Request,
  res: Response
): Promise<void> => {
  const signature = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature as string,
      endpointSecret
    );
  } catch (error: any) {
    console.log(
      "Webhook Error:",
      error.message
    );

    res.sendStatus(400);
    return;
  }


  if (event.type === "checkout.session.completed") {

    const session = event.data.object;

    const cart = JSON.parse(
      session.metadata?.cart || "[]"
    );
    const user = await JSON.parse(session.metadata?.user || "")



    const order = await Order.create({

      user: user,
      products: cart.map((item: any) => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price,
      })),

      totalPrice: cart.reduce(
        (total: number, item: any) =>
          total + item.price * item.quantity,
        0
      ),

      shippingAddress: {
        fullName: session.customer_details?.name || "",
        email: session.customer_details?.email || "",
        address: session.customer_details?.address?.line1 || "",
        city: session.customer_details?.address?.city || "",
        country: session.customer_details?.address?.country || "",
        postalCode: session.customer_details?.address?.postal_code || "",
      },
      paymentStatus: "Paid",
      orderStatus: "Pending"
    });
  }


  res.status(200).json({
    received: true,
  });
};