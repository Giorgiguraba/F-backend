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
// import bcrypt from "bcryptjs"
// import jwt from "jsonwebtoken"
// import connectDB from "../../src/lib/connectDB"
// import User from "../../src/models/User"
// import { cors, runMiddleware } from "../../src/middlewares/cors"

// export default async function handler(req, res) {
//   // Run CORS middleware
//   await runMiddleware(req, res, cors)

//   // Handle CORS preflight
//   if (req.method === "OPTIONS") {
//     return res.status(200).end()
//   }

//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method Not Allowed" })
//   }

//   try {
//     const { email, password } = req.body

//     // Validate required fields
//     if (!email || !password) {
//       return res.status(400).json({
//         error: "Email and password are required",
//       })
//     }

//     console.log("Login attempt for:", email)

//     // Connect to database
//     await connectDB()
//     console.log("✅ Database connected!")

//     // Find user by email
//     const user = await User.findOne({ email })
//     if (!user) {
//       console.log("❌ User not found:", email)
//       return res.status(401).json({ error: "Invalid credentials" })
//     }

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, user.password)
//     if (!isMatch) {
//       console.log("❌ Invalid password for:", email)
//       return res.status(401).json({ error: "Invalid credentials" })
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       {
//         userId: user._id,
//         email: user.email,
//         username: user.username,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "24h" },
//     )

//     console.log("✅ Login successful:", email)

//     // Return success with token and user info
//     return res.status(200).json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         username: user.username,
//       },
//     })
//   } catch (error) {
//     console.error("❌ Authentication error:", error)
//     return res.status(500).json({
//       error: "Authentication failed",
//       message: error.message,
//     })
//   }
// }