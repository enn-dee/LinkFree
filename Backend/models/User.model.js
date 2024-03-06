import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
  },
  { timestamps: true }
);
const User = new mongoose.model("User", UserSchema);
export default User;