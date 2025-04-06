// // pages/api/numbers.js
// import Cors from 'cors';
// import connectToDatabase from "../../src/lib/connectDB";
// import { ObjectId } from "mongodb";
// import jwt from "jsonwebtoken";

// // Initialize CORS middleware
// const cors = Cors({
//   origin: "http://localhost:3000", // Allow your main front end
//   methods: ["GET", "OPTIONS"],
//   credentials: true,
// });

// // Helper to run middleware
// function runMiddleware(req, res, fn) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) return reject(result);
//       return resolve(result);
//     });
//   });
// }

// const handler = async (req, res) => {
//   // Run CORS
//   await runMiddleware(req, res, cors);

//   if (req.method !== "GET") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   // Get token from Authorization header
//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//     return res.status(401).json({ error: "No token provided" });
//   }
//   const token = authHeader.split(" ")[1];
//   let decoded;
//   try {
//     decoded = jwt.verify(token, process.env.JWT_SECRET);
//   } catch (e) {
//     return res.status(401).json({ error: "Invalid token" });
//   }
  
//   // decoded should contain the userId (assuming you signed your token with { userId } )
//   const userId = decoded.userId;
//   if (!userId) {
//     return res.status(401).json({ error: "Token did not contain user information" });
//   }

//   try {
//     const db = await connectToDatabase();
//     // Convert userId (string) to ObjectId and find the user
//     const user = await db.collection("users").findOne({ _id: new ObjectId(userId) });
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Assume your user document has btc and usd fields
//     const numbers = { btc: user.btc, usd: user.usd };
//     return res.status(200).json({ numbers });
//   } catch (error) {
//     console.error("Error fetching numbers:", error);
//     return res.status(500).json({ error: "Internal Server Error", details: error.toString() });
//   }
// };

// export default handler;

// pages/api/numbers.js (or /api/user-numbers.js)
// pages/api/numbers.ts

// pages/api/numbers.js








// import jwt from "jsonwebtoken";
// import connectToDatabase from "../../src/lib/connectDB";

// export default async function handler(req, res) {
//   if (req.method === "OPTIONS") {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//     res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
//     return res.status(200).end();
//   }

//   if (req.method === "GET") {
//     return getNumbers(req, res);
//   }

//   if (req.method === "POST") {
//     return updateNumbers(req, res);
//   }

//   res.status(405).json({ error: "Method Not Allowed" });
// }

// async function getNumbers(req, res) {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     const token = authHeader.split(" ")[1];
//     const secret = process.env.JWT_SECRET || "your-secret-key";
//     const decoded = jwt.verify(token, secret);

//     const db = await connectToDatabase();
//     const user = await db.collection("users").findOne({ _id: decoded.userId });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.status(200).json({ numbers: user.numbers });
//   } catch (error) {
//     console.error("Error fetching numbers:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// async function updateNumbers(req, res) {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     const token = authHeader.split(" ")[1];
//     const secret = process.env.JWT_SECRET || "your-secret-key";
//     const decoded = jwt.verify(token, secret);

//     const { usd, btc } = req.body;
//     if (typeof usd !== "number" || typeof btc !== "number") {
//       return res.status(400).json({ error: "Invalid data. Both usd and btc must be numbers." });
//     }

//     const db = await connectToDatabase();
//     const result = await db.collection("users").updateOne(
//       { _id: decoded.userId },
//       { $set: { "numbers.usd": usd, "numbers.btc": btc } }
//     );

//     if (result.matchedCount === 0) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.status(200).json({ message: "Numbers updated successfully" });
//   } catch (error) {
//     console.error("Error updating numbers:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }
import Cors from 'cors';
import connectToDatabase from '../../src/lib/connectDB';
import User from '../../src/models/User';
import jwt from 'jsonwebtoken';

const cors = Cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'PUT'],
  credentials: true,
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

// 🔐 Helper: Get userId from Authorization header
function getUserIdFromToken(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId; // This assumes your token contains userId
  } catch (err) {
    console.error("Invalid token:", err.message);
    return null;
  }
}

const handler = async (req, res) => {
  await runMiddleware(req, res, cors);

  const userId = getUserIdFromToken(req);
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or missing token' });
  }

  await connectToDatabase();

  if (req.method === 'PUT') {
    try {
      const { btc, usd } = req.body;
      console.log('Received Data:', req.body);

      if (isNaN(btc) || isNaN(usd)) {
        return res.status(400).json({ error: 'Invalid input data' });
      }

      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ error: 'User not found' });

      if (!user.numbers) {
        user.numbers = { btc: 0, usd: 0 };
      }

      user.numbers.btc = btc;
      user.numbers.usd = usd;

      await user.save();

      return res.status(200).json({ message: 'User numbers updated successfully' });
    } catch (err) {
      console.error('Error updating numbers:', err);
      return res.status(500).json({ error: 'Server error: ' + err.message });
    }
  } else if (req.method === 'GET') {
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ error: 'User not found' });

      return res.status(200).json({
        usd: user.numbers?.usd || 0,
        btc: user.numbers?.btc || 0,
      });
    } catch (err) {
      console.error('Error fetching numbers:', err);
      return res.status(500).json({ error: 'Server error: ' + err.message });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;
