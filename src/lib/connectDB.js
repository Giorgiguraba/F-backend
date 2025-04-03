// import mongoose from "mongoose";

// const connectDB = async () => {
//   if (mongoose.connections[0].readyState) {
//     console.log("Already connected to MongoDB");
//     return;
//   }
  
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("MongoDB Connected Successfully");
//   } catch (error) {
//     console.error("MongoDB Connection Failed:", error);
//     process.exit(1);
//   }
// };

// export default connectDB;
// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error("MONGODB_URI is not defined in .env.local");
// }

// const connectDB = async () => {
//   if (mongoose.connection.readyState >= 1) return;
//   try {
//     await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
//     console.log("✅ Connected to MongoDB");
//   } catch (error) {
//     console.error("❌ MongoDB Connection Error:", error);
//     process.exit(1);
//   }
// };

// export default connectDB;





// backend/pages/api/update-numbers.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 50000, // Increase timeout to 50 seconds
    socketTimeoutMS: 45000, // Increase socket timeout
  });

  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

const connectToDatabase = async () => {
  const db = (await clientPromise).db();
  return db;
};

export default connectToDatabase;
