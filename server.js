import express from "express";
import cors from "cors";
import morgan from "morgan";

// Connection
import { connect } from "./database/connection.js";

// Routes
import router from "./router/route.js";

const PORT = process.env.PORT || 8080;

// Instantiate express
const app = express();

// Middlewares

// Request body as JSON
app.use(express.json());
// Cross Origin Resource Sharing
app.use(cors());
// HTTP request logger
app.use(morgan("tiny"));
// Less hackers know about our stack
app.disable("x-powered-by");

// Routes
app.use("/api/v1", router);

// Start server only when we have valid connection
connect()
  .then(() => {
    try {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    } catch (error) {
      console.log("Cannot connect to Server");
    }
  })
  .catch((error) => {
    console.log("Invalid connection to MongoDB");
  });
