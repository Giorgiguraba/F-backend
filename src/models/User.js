// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// const User = mongoose.models.User || mongoose.model("User", UserSchema);

// export default User;


// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   username: { type: String, required: true, unique: true },
// }, { timestamps: true });

// export default mongoose.models.User || mongoose.model("User", UserSchema);



// user.js
import mongoose from "mongoose"

// User Schema with reference to Number schema
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    numbers: { type: mongoose.Schema.Types.ObjectId, ref: "Number" }, // Reference to Number
  },
  { timestamps: true },
)

export default mongoose.models.User || mongoose.model("User", UserSchema)

