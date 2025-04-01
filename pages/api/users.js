// import Cors from 'cors';  // Import cors
// import connectDB from '../../src/lib/connectDB';  // Connect to DB
// import User from '../../src/models/User';  // User model

// // Initialize CORS
// const cors = Cors({
//   methods: ['GET', 'POST', 'OPTIONS'],
//   origin: 'http://localhost:3000',  // Frontend URL
//   credentials: true,  // Allow credentials for cookies or headers
// });

// // Helper function to run middleware
// const runMiddleware = (req, res, fn) => new Promise((resolve, reject) => {
//   fn(req, res, (result) => {
//     if (result instanceof Error) {
//       return reject(result);
//     }
//     return resolve(result);
//   });
// });

// export default async function handler(req, res) {
//   await runMiddleware(req, res, cors);  // Use CORS middleware

//   if (req.method === 'GET') {
//     try {
//       // Connect to the database
//       await connectDB();

//       // Fetch all users
//       const users = await User.find();

//       // Send users data as a response
//       res.status(200).json(users);
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching users', error });
//     }
//   } else {
//     res.status(405).end();  // Method Not Allowed for non-GET requests
//   }
// }

// import Cors from 'cors';  // Import cors
// import connectDB from '../../src/lib/connectDB';  // Connect to DB
// import User from '../../src/models/User'; // Ensure correct import

// // Initialize CORS
// const cors = Cors({
//   methods: ['GET', 'OPTIONS'],
//   origin: ['http://localhost:3000', 'http://localhost:3002'], // Allow frontend and admin panel
//   credentials: true,
// });

// // Helper function to run middleware
// const runMiddleware = (req, res, fn) => new Promise((resolve, reject) => {
//   fn(req, res, (result) => {
//     if (result instanceof Error) {
//       console.error('CORS Middleware Error:', result);
//       return reject(result);
//     }
//     return resolve(result);
//   });
// });

// export default async function handler(req, res) {
//   try {
//     await runMiddleware(req, res, cors); // Use CORS middleware

//     if (req.method === 'OPTIONS') {
//       return res.status(200).end(); // Handle preflight
//     }

//     if (req.method === 'GET') {
//       await connectDB(); // Ensure DB connection
//       const users = await User.find({}, 'id name email createdAt'); // Fetch selected fields
//       return res.status(200).json(users);
//     }

//     res.status(405).json({ error: 'Method Not Allowed' });
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).json({ error: 'Internal Server Error', details: error.message });
//   }
// }



// import Cors from "cors";
// import connectDB from "../../src/lib/connectDB";  // Adjust path if necessary
// import User from "../../src/models/User";  // Ensure correct model path

// // Initialize CORS
// const cors = Cors({
//   methods: ["GET", "OPTIONS"],
//   origin: ["http://localhost:3000", "http://localhost:3002"],  // Allow frontend and admin panel
//   credentials: true,
// });

// // Helper function to run middleware
// const runMiddleware = (req, res, fn) =>
//   new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) {
//         console.error("CORS Middleware Error:", result);
//         return reject(result);
//       }
//       return resolve(result);
//     });
//   });

// export default async function handler(req, res) {
//   try {
//     await runMiddleware(req, res, cors); // Use CORS middleware

//     if (req.method === "OPTIONS") {
//       return res.status(200).end();  // Handle preflight
//     }

//     if (req.method === "GET") {
//       await connectDB();  // Ensure DB connection
//       const users = await User.find({}, "id name email createdAt");  // Fetch selected fields
//       return res.status(200).json(users);
//     }

//     res.status(405).json({ error: "Method Not Allowed" });  // Handle unsupported methods
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({ error: "Internal Server Error", details: error.message });
//   }
// }



// import Cors from "cors";
// import connectDB from "../../src/lib/connectDB";
// import User from "../../src/models/User";

// // CORS Setup
// const cors = Cors({
//   methods: ["GET", "OPTIONS"],
//   origin: ["http://localhost:3000", "http://localhost:3002"],
//   credentials: true,
// });

// // Middleware Helper
// const runMiddleware = (req, res, fn) =>
//   new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) {
//         console.error("CORS Middleware Error:", result);
//         return reject(result);
//       }
//       return resolve(result);
//     });
//   });

// export default async function handler(req, res) {
//   try {
//     await runMiddleware(req, res, cors);

//     if (req.method === "OPTIONS") {
//       return res.status(200).end();
//     }

//     if (req.method === "GET") {
//       await connectDB();
//       const user = await User.findOne({}, "id name email createdAt"); // Fetch only one user
//       if (!user) return res.status(404).json({ error: "User not found" });

//       return res.status(200).json(user);
//     }

//     res.status(405).json({ error: "Method Not Allowed" });
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({ error: "Internal Server Error", details: error.message });
//   }
// }



// // vercel
// import Cors from "cors"
// import connectDB from "../../src/lib/connectDB"
// import User from "../../src/models/User"

// // CORS Setup
// const cors = Cors({
//   methods: ["GET", "OPTIONS"],
//   origin: ["http://localhost:3000", "http://localhost:3002"],
//   credentials: true,
// })

// // Middleware Helper
// const runMiddleware = (req, res, fn) =>
//   new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) {
//         console.error("CORS Middleware Error:", result)
//         return reject(result)
//       }
//       return resolve(result)
//     })
//   })

// export default async function handler(req, res) {
//   try {
//     await runMiddleware(req, res, cors)

//     if (req.method === "OPTIONS") {
//       return res.status(200).end()
//     }

//     if (req.method === "GET") {
//       await connectDB()
//       const user = await User.findOne({}) // Fetch only one user
//       if (!user) return res.status(404).json({ error: "User not found" })

//       return res.status(200).json({
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         createdAt: user.createdAt,
//       })
//     }

//     res.status(405).json({ error: "Method Not Allowed" })
//   } catch (error) {
//     console.error("Error fetching users:", error)
//     res.status(500).json({ error: "Internal Server Error", details: error.message })
//   }
// }



// modified gpt
// File: pages/api/users.js
import Cors from "cors";
import connectDB from "../../src/lib/connectDB";
import User from "../../src/models/User";

// CORS Setup
const cors = Cors({
  methods: ["GET", "OPTIONS"],
  origin: ["http://localhost:3000", "http://localhost:3002"], // your frontend URLs
  credentials: true,
});

// Middleware Helper
const runMiddleware = (req, res, fn) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        console.error("CORS Middleware Error:", result);
        return reject(result);
      }
      return resolve(result);
    });
  });

export default async function handler(req, res) {
  try {
    await runMiddleware(req, res, cors);

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    if (req.method === "GET") {
      await connectDB();
      const users = await User.find({}); // Fetch all users
      if (!users || users.length === 0) return res.status(404).json({ error: "No users found" });

      return res.status(200).json(users); // Return the array of users
    }

    res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
