// import Cors from "cors";

// // CORS Middleware
// const cors = Cors({
//   origin: "*", // დროებით ყველასგან დაუშვი მოთხოვნა
//   methods: ["POST", "GET"],
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
//   await runMiddleware(req, res, cors); // Middleware-ის გაშვება

//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   res.status(200).json({ message: "CORS Test Successful" });
// }

// import connectDB from "@/lib/connectDB";
// import User from "@/models/User";
// import bcrypt from "bcryptjs";
// import Cors from "cors";

// // Initialize CORS middleware
// const cors = Cors({
//   origin: "http://localhost:3000", // Allow requests from your frontend
//   methods: ["GET", "POST", "OPTIONS"],
//   allowedHeaders: ["Content-Type"],
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
//   await runMiddleware(req, res, cors);

//   // ✅ Handle CORS preflight (OPTIONS request)
//   if (req.method === "OPTIONS") {
//     return res.status(200).end(); // Send OK response for preflight request
//   }

//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }

//   try {
//     await connectDB();
//     console.log("✅ Database connected!");

//     const { name, email, password, username } = req.body;
//     if (!username) return res.status(400).json({ error: "Username is required" });

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = await User.create({ name, email, password: hashedPassword, username });

//     return res.status(201).json({ message: "User registered successfully", user: newUser });
//   } catch (error) {
//     console.error("❌ Registration Error:", error);
//     return res.status(500).json({ error: "Server error" });
//   }
// }







import connectDB from "@/lib/connectDB";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import Cors from "cors";

// Initialize CORS middleware
const cors = Cors({
  origin: "http://localhost:3000", // Allow requests from your frontend
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  // ✅ Handle CORS preflight (OPTIONS request)
  if (req.method === "OPTIONS") {
    return res.status(200).end(); // Send OK response for preflight request
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    await connectDB();
    console.log("✅ Database connected!");

    const { name, email, username, password } = req.body;

    // Check if the username is provided
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user in the database
    const newUser = await User.create({ name, email, password: hashedPassword, username });

    return res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    return res.status(500).json({ error: "Server error", details: error.message });
  }
}
