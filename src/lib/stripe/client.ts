import Stripe from "stripe";

let stripeClient: Stripe | null = null;

// Lazily constructed so importing this module doesn't throw at build time
// (e.g. during Next.js's page-data collection) when STRIPE_SECRET_KEY isn't
// set yet — it only throws if a route actually tries to call Stripe.
export function getStripe(): Stripe {
  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }
  return stripeClient;
}
