import { createHmac, randomBytes } from "crypto";
import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  salt: { type: String },
  password: { type: String, required: true },
});

// Function to generate salt and hashed password
export function generateHashedPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hashedPassword = createHmac("sha256", salt).update(password).digest("hex");
  return { salt, hashedPassword };
}

const Admin = mongoose.model("Admin", AdminSchema);
export { Admin }; // Named export
export default Admin; // Default export
