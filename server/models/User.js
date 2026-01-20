import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  plan: { type: String, enum: ["free", "pro"], default: "free" },
  stripeCustomerId: { type: String, default: null }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
