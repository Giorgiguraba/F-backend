// import connectDB from "@/lib/connectDB";
// import User from "@/models/User";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

//   await connectDB();
//   const { email, password } = req.body;

//   // მომხმარებლის მოძებნა
//   const user = await User.findOne({ email });
//   if (!user) return res.status(400).json({ error: "User not found" });

//   // პაროლის შემოწმება
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

//   // JWT ტოკენი
//   const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

//   res.status(200).json({ message: "Login successful", token, user });
// }
// import Cors from "cors";
// import bcrypt from "bcryptjs";  // To compare hashed passwords
// import jwt from "jsonwebtoken";  // For generating JWT tokens
// import { users } from "../../../data/users"; // Example: Fetch users from DB or use an actual database

// // CORS Middleware
// const cors = Cors({
//   origin: "*", // Allow all origins for now, change this for production
//   methods: ["POST"],
//   credentials: true,
// });

// function runMiddleware(req, res, fn) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) {
//         return reject(result);
//       }
//       return resolve(result);
//     });
//   });
// }

// export default async function handler(req, res) {
//   await runMiddleware(req, res, cors); // Run CORS middleware

//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const { email, password } = req.body;

//   // Find user in the database (or use static data for now)
//   const user = users.find((user) => user.email === email);  // Replace with actual DB logic

//   if (!user) {
//     return res.status(404).json({ error: "User not found" });
//   }

//   // Compare the plain password with the hashed password stored in the database
//   const isPasswordValid = await bcrypt.compare(password, user.password);
//   if (!isPasswordValid) {
//     return res.status(401).json({ error: "Invalid password" });
//   }

//   // Generate JWT token (customize the payload as per your need)
//   const token = jwt.sign({ id: user.id, email: user.email }, "your_jwt_secret", {
//     expiresIn: "1h",  // Token expiration
//   });

//   // Send token as response
//   return res.status(200).json({ message: "Login successful", token });
// }


// import Cors from "cors";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import connectDb from "../../../../lib/connectDB"; // Import the database connection
// import User from "../../src/models/User"; // Assuming you have a User model

// // Initialize CORS middleware
// const cors = Cors({
//   origin: "http://localhost:3000", // Frontend origin
//   methods: ["POST", "OPTIONS"], // Allow POST and OPTIONS methods
//   allowedHeaders: ["Content-Type"], // Ensure that the 'Content-Type' header is allowed
//   credentials: true, // Allow credentials if needed
// });

// function runMiddleware(req, res, fn) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) {
//         return reject(result);
//       }
//       return resolve(result);
//     });
//   });
// }

// export default async function handler(req, res) {
//   await runMiddleware(req, res, cors); // Run CORS middleware

//   // Handle OPTIONS request (CORS preflight)
//   if (req.method === "OPTIONS") {
//     return res.status(200).end(); // Respond with 200 OK for OPTIONS
//   }

//   // Handle POST request for login
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const { email, password } = req.body;

//   // Connect to the database
//   await connectDb();  // Ensure you connect before performing DB operations

//   // Find user in the database
//   const user = await User.findOne({ email });

//   if (!user) {
//     return res.status(404).json({ error: "User not found" });
//   }

//   // Compare the plain password with the hashed password stored in the database
//   const isPasswordValid = await bcrypt.compare(password, user.password);
//   if (!isPasswordValid) {
//     return res.status(401).json({ error: "Invalid password" });
//   }

//   // Generate JWT token
//   const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
//     expiresIn: "1h",
//   });

//   // Send token as response
//   return res.status(200).json({ message: "Login successful", token });
// }
// backend/pages/api/login.js

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/connectDB";
import User from "@/models/User";
import { cors, runMiddleware } from "../../middlewares/cors";
 // Adjust the path based on your project structure


export default async function handler(req, res) {
  await runMiddleware(req, res, cors); // Run CORS middleware

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // ✅ Respond to OPTIONS requests
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, password } = req.body;
  console.log("Login attempt for:", email);

  try {
    await connectDB();
    console.log("✅ Database connected!");
  } catch (dbError) {
    console.error("❌ Database connection error:", dbError);
    return res.status(500).json({ error: "Database connection failed" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Invalid password for:", email);
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("✅ Login successful:", email);
    return res.status(200).json({ token });
  } catch (authError) {
    console.error("❌ Authentication error:", authError);
    return res.status(500).json({ error: "Authentication failed" });
  }
}
