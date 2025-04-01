import mongoose from "mongoose"

// Number Schema (for storing btc and usd)
const NumberSchema = new mongoose.Schema({
  btc: { type: Number, default: 0 },
  usd: { type: Number, default: 0 },
})

// Export the model
export default mongoose.models.Number || mongoose.model("Number", NumberSchema)

// import mongoose from "mongoose";

// const NumberSchema = new mongoose.Schema({
//   btc: { type: Number, default: 0 },
//   usd: { type: Number, default: 0 },
// });

// const Number = mongoose.models.Number || mongoose.model("Number", NumberSchema);

// // Function to get the number
// export const getNumber = async () => {
//   return await Number.findOne().sort({ _id: -1 });
// };

// // Function to update the number
// export const updateNumber = async (btc, usd) => {
//   return await Number.updateOne({}, { btc, usd });
// };

// export default Number;
