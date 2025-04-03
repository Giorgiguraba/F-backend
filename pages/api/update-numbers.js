// import Cors from "cors";
// import connectDB from "@/lib/connectDB";
// import NumberModel from "../../src/models/numbers";

// // Allow requests from both your frontend and admin panel
// const cors = Cors({
//   origin: ["http://localhost:3000", "http://localhost:3002"],
//   methods: ["GET", "PUT", "OPTIONS"],
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

//   // Handle preflight OPTIONS request
//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }

//   await connectDB();

//   if (req.method === "GET") {
//     try {
//       const numberDoc = await NumberModel.findOne();
//       return res.status(200).json({ value: numberDoc ? numberDoc.value : 0 });
//     } catch (error) {
//       return res.status(500).json({ error: "Failed to fetch number", details: error.message });
//     }
//   } else if (req.method === "PUT") {
//     try {
//       const { value } = req.body;
//       let numberDoc = await NumberModel.findOne();
//       if (!numberDoc) {
//         numberDoc = new NumberModel({ value });
//       } else {
//         numberDoc.value = value;
//       }
//       await numberDoc.save();
//       return res.status(200).json({ value: numberDoc.value });
//     } catch (error) {
//       return res.status(500).json({ error: "Failed to update number", details: error.message });
//     }
//   } else {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }
// }







// import Cors from "cors";
// import connectDB from "@/lib/connectDB";
// import NumberModel from "../../src/models/numbers"; // Ensure this model exists
// import { NextResponse } from "next/server";

// // Configure CORS
// // const cors = Cors({
// //   methods: ["GET", "POST"],
// //   origin: "http://localhost:3002", // Adjust for production
// //   credentials: true,
// // });

// const cors = Cors({
//   methods: ["GET", "POST", "PUT"],  // Add PUT or any other methods your app may use
//   origin: "http://localhost:3002",  // Ensure this is your frontend's URL
//   credentials: true,
// });

// // // Configure CORS to allow requests from your frontend/admin panel
// // const cors = Cors({
// //   origin: ["http://localhost:3000", "http://localhost:3002"],
// //   methods: ["GET", "PUT", "OPTIONS"],
// //   allowedHeaders: ["Content-Type"],
// //   credentials: true,
// // });


// // Middleware helper function
// const runMiddleware = (req, res, fn) =>
//   new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) return reject(result);
//       return resolve(result);
//     });
//   });

// export default async function handler(req, res) {
//   await runMiddleware(req, res, cors);
//   await connectDB();

//   if (req.method === "GET") {
//     try {
//       const numbers = await NumberModel.findOne(); // Get stored values
//       res.status(200).json(numbers);
//     } catch (error) {
//       res.status(500).json({ message: "Error fetching numbers", error });
//     }
//   } else if (req.method === "POST") {
//     try {
//       const { btc, usd } = req.body;
//       let numbers = await NumberModel.findOne();

//       if (!numbers) {
//         numbers = new NumberModel({ btc, usd });
//       } else {
//         numbers.btc = btc;
//         numbers.usd = usd;
//       }

//       await numbers.save();
//       res.status(200).json({ message: "Numbers updated successfully" });
//     } catch (error) {
//       res.status(500).json({ message: "Error updating numbers", error });
//     }
//   } else {
//     res.status(405).end(); // Method Not Allowed
//   }
// }



// import Cors from "cors";
// import connectDB from "@/lib/connectDB";
// import NumberModel from "../../src/models/numbers"; // Ensure this model exists
// import { NextResponse } from "next/server";

// // Configure CORS
// const cors = Cors({
//   methods: ["GET", "POST", "PUT"],  // Allow PUT method
//   origin: "http://localhost:3002",  // Ensure this is your frontend's URL
//   credentials: true,
// });

// // Middleware helper function
// const runMiddleware = (req, res, fn) =>
//   new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) return reject(result);
//       return resolve(result);
//     });
//   });

// export default async function handler(req, res) {
//   await runMiddleware(req, res, cors);
//   await connectDB();

//   if (req.method === "GET") {
//     try {
//       const numbers = await NumberModel.findOne(); // Get stored values
//       res.status(200).json(numbers);
//     } catch (error) {
//       res.status(500).json({ message: "Error fetching numbers", error });
//     }
//   } else if (req.method === "POST") {
//     try {
//       const { btc, usd } = req.body;
//       let numbers = await NumberModel.findOne();

//       if (!numbers) {
//         numbers = new NumberModel({ btc, usd });
//       } else {
//         numbers.btc = btc;
//         numbers.usd = usd;
//       }

//       await numbers.save();
//       res.status(200).json({ message: "Numbers updated successfully" });
//     } catch (error) {
//       res.status(500).json({ message: "Error updating numbers", error });
//     }
//   } else if (req.method === "PUT") {
//     try {
//       const { userId, btc, usd } = req.body;

//       // Here you would find the specific user and update their data (if that's the logic)
//       const numbers = await NumberModel.findOne(); // Find the numbers document

//       if (!numbers) {
//         return res.status(404).json({ message: "Numbers data not found" });
//       }

//       // Update the numbers (You might want to update specific user data instead if this is for users)
//       numbers.btc = btc;
//       numbers.usd = usd;

//       await numbers.save();
//       res.status(200).json({ message: "User's BTC & USD updated successfully" });
//     } catch (error) {
//       res.status(500).json({ message: "Error updating numbers", error });
//     }
//   } else {
//     res.status(405).end(); // Method Not Allowed
//   }
// }

// import Cors from "cors";
// import connectDB from "@/lib/connectDB";
// import User from "../../src/models/User";

// // CORS Setup
// const cors = Cors({
//   methods: ["GET", "POST", "PUT"],
//   origin: ["http://localhost:3000", "http://localhost:3002"], // Allow both origins
//   credentials: true,
// });

// // Middleware helper function
// const runMiddleware = (req, res, fn) =>
//   new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) return reject(result);
//       return resolve(result);
//     });
//   });

// export default async function handler(req, res) {
//   await runMiddleware(req, res, cors);
//   await connectDB();

//   if (req.method === "GET") {
//     try {
//       // Fetch all users' BTC & USD values
//       const users = await User.find({}, { name: 1, email: 1, btc: 1, usd: 1 });
//       res.status(200).json(users); // Return all users with BTC & USD values
//     } catch (error) {
//       res.status(500).json({ message: "Error fetching users", error });
//     }
//   } else if (req.method === "PUT") {
//     try {
//       const { userId, btc, usd } = req.body;

//       // Validate input
//       if (!userId || isNaN(btc) || isNaN(usd)) {
//         return res.status(400).json({ message: "Invalid input" });
//       }

//       // Find the user by userId
//       const user = await User.findById(userId);
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }

//       // Update the user's BTC and USD values
//       user.btc = btc;
//       user.usd = usd;

//       // Save the user data
//       await user.save();

//       // Return updated user values
//       res.status(200).json({
//         _id: user._id,
//         btc: user.btc,
//         usd: user.usd,
//         name: user.name,
//         email: user.email,
//       });
//     } catch (error) {
//       res.status(500).json({ message: "Error updating user's numbers", error });
//     }
//   } else {
//     res.status(405).end(); // Method Not Allowed
//   }
// }





// // tvini mometynasavit es kodi mushaobs
// import Cors from "cors";
// import connectDB from "@/lib/connectDB";
// import NumberModel from "../../src/models/numbers";

// // Configure CORS to allow requests from your frontend/admin panel
// const cors = Cors({
//   origin: ["http://localhost:3000", "http://localhost:3002"],
//   methods: ["GET", "PUT", "OPTIONS"],
//   allowedHeaders: ["Content-Type"],
//   credentials: true,
// });

// // Helper to run middleware
// function runMiddleware(req, res, fn) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) {
//         console.error("CORS middleware error:", result);
//         return reject(result);
//       }
//       return resolve(result);
//     });
//   });
// }

// export default async function handler(req, res) {
//   // Run CORS middleware
//   try {
//     await runMiddleware(req, res, cors);
//   } catch (err) {
//     console.error("Error running CORS middleware:", err);
//     return res.status(500).json({ error: "CORS middleware error", details: err.message });
//   }

//   // Handle preflight OPTIONS request
//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }

//   // Connect to the database
//   try {
//     await connectDB();
//   } catch (err) {
//     console.error("Database connection error:", err);
//     return res.status(500).json({ error: "Database connection error", details: err.message });
//   }

//   // Process GET and PUT requests
//   if (req.method === "GET") {
//     try {
//       const numberDoc = await NumberModel.findOne();
//       console.log("Fetched number:", numberDoc);
//       return res.status(200).json({ 
//         btc: numberDoc ? numberDoc.btc : 0,
//         usd: numberDoc ? numberDoc.usd : 0 
//       });
//     } catch (error) {
//       console.error("Error fetching number:", error);
//       return res.status(500).json({ error: "Failed to fetch number", details: error.message });
//     }
//   } else if (req.method === "PUT") {
//     try {
//       const { btc, usd } = req.body;
//       let numberDoc = await NumberModel.findOne();
//       if (!numberDoc) {
//         numberDoc = new NumberModel({ btc, usd });
//       } else {
//         numberDoc.btc = btc;
//         numberDoc.usd = usd;
//       }
//       await numberDoc.save();
//       console.log("Updated numbers:", { btc: numberDoc.btc, usd: numberDoc.usd });
//       return res.status(200).json({ btc: numberDoc.btc, usd: numberDoc.usd });
//     } catch (error) {
//       console.error("Error updating number:", error);
//       return res.status(500).json({ error: "Failed to update number", details: error.message });
//     }
//   } else {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }
// }


// es mushaaa
// import Cors from "cors";
// import connectDB from "@/lib/connectDB";
// import UserModel from "../../src/models/User"; // Import User model

// // Configure CORS to allow requests from your frontend/admin panel
// const cors = Cors({
//   origin: ["http://localhost:3000", "http://localhost:3002"],
//   methods: ["GET", "PUT", "OPTIONS"],
//   allowedHeaders: ["Content-Type"],
//   credentials: true,
// });

// // Helper to run middleware
// function runMiddleware(req, res, fn) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) {
//         console.error("CORS middleware error:", result);
//         return reject(result);
//       }
//       return resolve(result);
//     });
//   });
// }

// export default async function handler(req, res) {
//   // Run CORS middleware
//   try {
//     await runMiddleware(req, res, cors);
//   } catch (err) {
//     console.error("Error running CORS middleware:", err);
//     return res.status(500).json({ error: "CORS middleware error", details: err.message });
//   }

//   // Handle preflight OPTIONS request
//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }

//   // Connect to the database
//   try {
//     await connectDB();
//   } catch (err) {
//     console.error("Database connection error:", err);
//     return res.status(500).json({ error: "Database connection error", details: err.message });
//   }

//   const { userId } = req.query; // Extract userId from query params

//   if (!userId) {
//     return res.status(400).json({ error: "User ID is required" });
//   }

//   // Fetch user-specific BTC & USD values
//   if (req.method === "GET") {
//     try {
//       const user = await UserModel.findById(userId);
//       if (!user) {
//         return res.status(404).json({ error: "User not found" });
//       }

//       console.log(`Fetched numbers for user ${userId}:`, { btc: user.btc, usd: user.usd });

//       return res.status(200).json({ 
//         btc: user.btc || 0, 
//         usd: user.usd || 0 
//       });
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       return res.status(500).json({ error: "Failed to fetch user data", details: error.message });
//     }
//   } 
  
//   // Update user-specific BTC & USD values
//   else if (req.method === "PUT") {
//     try {
//       const { btc, usd } = req.body;

//       const user = await UserModel.findById(userId);
//       if (!user) {
//         return res.status(404).json({ error: "User not found" });
//       }

//       user.btc = btc;
//       user.usd = usd;
//       await user.save();

//       console.log(`Updated numbers for user ${userId}:`, { btc: user.btc, usd: user.usd });

//       return res.status(200).json({ btc: user.btc, usd: user.usd });
//     } catch (error) {
//       console.error("Error updating user numbers:", error);
//       return res.status(500).json({ error: "Failed to update numbers", details: error.message });
//     }
//   } 
  
//   // Invalid method
//   else {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }
// }

// // es mushaobs
// import Cors from "cors"
// import connectDB from "../../src/lib/connectDB"
// import Number from "../../src/models/numbers"
// import User from "../../src/models/User"

// // Configure CORS
// const cors = Cors({
//   origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"],
//   methods: ["GET", "OPTIONS"],
//   allowedHeaders: ["Content-Type"],
//   credentials: true,
// })

// // Middleware helper
// function runMiddleware(req, res, fn) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) {
//         console.error("CORS middleware error:", result)
//         return reject(result)
//       }
//       return resolve(result)
//     })
//   })
// }

// export default async function handler(req, res) {
//   console.log("API Request to /api/numbers:", req.method)

//   // Run CORS middleware
//   await runMiddleware(req, res, cors)

//   // Handle preflight OPTIONS request
//   if (req.method === "OPTIONS") {
//     return res.status(200).end()
//   }

//   // Connect to the database
//   try {
//     await connectDB()
//     console.log("Database connected successfully")
//   } catch (err) {
//     console.error("Database connection error:", err)
//     return res.status(500).json({ error: "Database connection error" })
//   }

//   // Only handle GET requests
//   if (req.method === "GET") {
//     try {
//       // Option 1: Get the most recently updated Number document
//       const latestNumber = await Number.findOne().sort({ updatedAt: -1 })

//       if (latestNumber) {
//         console.log("Found latest number:", latestNumber)
//         return res.status(200).json({
//           btc: latestNumber.btc || 0,
//           usd: latestNumber.usd || 0,
//         })
//       }

//       // Option 2: If no Number document exists, try to get from the first user
//       const firstUser = await User.findOne()

//       if (firstUser && firstUser.numbers) {
//         // Try to populate the numbers reference
//         try {
//           const numberDoc = await Number.findById(firstUser.numbers)
//           if (numberDoc) {
//             console.log("Found numbers from first user:", numberDoc)
//             return res.status(200).json({
//               btc: numberDoc.btc || 0,
//               usd: numberDoc.usd || 0,
//             })
//           }
//         } catch (err) {
//           console.error("Error fetching user's number document:", err)
//         }
//       }

//       // If no data found, return defaults
//       console.log("No number data found, returning defaults")
//       return res.status(200).json({ btc: 0, usd: 0 })
//     } catch (error) {
//       console.error("Error fetching number data:", error)
//       return res.status(500).json({ error: "Failed to fetch number data", details: error.message })
//     }
//   } else {
//     return res.status(405).json({ error: "Method Not Allowed" })
//   }
// }



// mushaobs
// import Cors from "cors";
// import connectDB from "@/lib/connectDB";
// import User from "../../src/models/User";

// // CORS Setup
// const cors = Cors({
//   methods: ["GET", "POST", "PUT"],
//   origin: ["http://localhost:3000", "http://localhost:3002"], // Allow both origins
//   credentials: true,
// });

// // Middleware helper function
// const runMiddleware = (req, res, fn) =>
//   new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) return reject(result);
//       return resolve(result);
//     });
//   });

// export default async function handler(req, res) {
//   await runMiddleware(req, res, cors);
//   await connectDB();

//   if (req.method === "GET") {
//     try {
//       // Fetch all users' BTC & USD values
//       const users = await User.find({}, { name: 1, email: 1, btc: 1, usd: 1 });
//       res.status(200).json(users); // Return all users with BTC & USD values
//     } catch (error) {
//       res.status(500).json({ message: "Error fetching users", error });
//     }
//   } else if (req.method === "PUT") {
//     try {
//       const { userId, btc, usd } = req.body;

//       // Validate input
//       if (!userId || isNaN(btc) || isNaN(usd)) {
//         return res.status(400).json({ message: "Invalid input" });
//       }

//       // Find the user by userId
//       const user = await User.findById(userId);
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }

//       // Update the user's BTC and USD values
//       user.btc = btc;
//       user.usd = usd;

//       // Save the user data
//       await user.save();

//       // Return updated user values
//       res.status(200).json({
//         _id: user._id,
//         btc: user.btc,
//         usd: user.usd,
//         name: user.name,
//         email: user.email,
//       });
//     } catch (error) {
//       res.status(500).json({ message: "Error updating user's numbers", error });
//     }
//   } else {
//     res.status(405).end(); // Method Not Allowed
//   }
// }



// backend/pages/api/update-numbers.js
// backend/pages/api/update-numbers.js
// backend/pages/api/update-numbers.js
import Cors from 'cors';
import { ObjectId } from "mongodb";
import connectToDatabase from "../../src/lib/connectDB";

// Initialize CORS
const cors = Cors({
  origin: "http://localhost:3002", // Allow frontend
  methods: ["PUT"],
  credentials: true,
});

// Middleware helper
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

const handler = async (req, res) => {
  await runMiddleware(req, res, cors); // Apply CORS middleware

  if (req.method === "PUT") {
    try {
      const { userId, btc, usd } = req.body;
      console.log("Received Data:", req.body); // Debugging

      if (!userId || isNaN(btc) || isNaN(usd)) {
        return res.status(400).json({ error: "Invalid input data" });
      }

      const db = await connectToDatabase();
      const usersCollection = db.collection("users");

      // Convert userId to ObjectId
      const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Update user BTC and USD values
      await usersCollection.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { btc, usd } }
      );

      return res.status(200).json({ message: "User numbers updated successfully" });
    } catch (err) {
      console.error("Error updating numbers:", err);
      return res.status(500).json({ error: "Server error: " + err.message });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;
