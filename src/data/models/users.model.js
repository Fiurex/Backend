import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const collection = "users"
const schema = new Schema(
    {
  avatar: { type: String, default: "https://cdn-icons-png.flaticon.com/512/266/266033.png" },
  first_name: { type: String, required: true },
  last_name:  { type: String, required: true },
  nick_name: {type: String, required: true},
  email:      { type: String, required: true, unique: true },
  age:        { type: Number, required: true },
  password:   { type: String, required: true },
  cart:       { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
  role:       { type: String, default: "user" }
});

const User = model(collection, schema);
export default User


