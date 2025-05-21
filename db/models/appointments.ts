import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userShema = new Schema<User>(
  {
    email: { type: String, required: false },
    last_name: { type: String, required: true },
    first_name: { type: String, required: true },
    phone_number: { type: String, required: false },
    date: { type: Date, default: Date.now },
    time: { type: String, required: true },
    service_type: { type: String, required: true },
  },
  { timestamps: true }
);

const UserModel =
  mongoose.models.user || mongoose.model<User>("user", userShema);

export default UserModel;
