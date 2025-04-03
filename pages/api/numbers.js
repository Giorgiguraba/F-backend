// pages/api/numbers.js
import Cors from 'cors';
import connectToDatabase from "../../src/lib/connectDB";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

// Initialize CORS middleware
const cors = Cors({
  origin: "http://localhost:3000", // Allow your main front end
  methods: ["GET", "OPTIONS"],
  credentials: true,
});

// Helper to run middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

const handler = async (req, res) => {
  // Run CORS
  await runMiddleware(req, res, cors);

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Get token from Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return res.status(401).json({ error: "Invalid token" });
  }
  
  // decoded should contain the userId (assuming you signed your token with { userId } )
  const userId = decoded.userId;
  if (!userId) {
    return res.status(401).json({ error: "Token did not contain user information" });
  }

  try {
    const db = await connectToDatabase();
    // Convert userId (string) to ObjectId and find the user
    const user = await db.collection("users").findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Assume your user document has btc and usd fields
    const numbers = { btc: user.btc, usd: user.usd };
    return res.status(200).json({ numbers });
  } catch (error) {
    console.error("Error fetching numbers:", error);
    return res.status(500).json({ error: "Internal Server Error", details: error.toString() });
  }
};

export default handler;
