import Stripe from "../config/stripe.js";
import User from "../models/User.js";

export const createCheckout = async (req, res) => {
    return res.json({
      message: "Stripe billing is disabled in dev mode (India)."
    });
  };
  