// Importing packages
import express, { json, Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';
import { connect } from 'mongoose';
import cors from 'cors';

// Importing routes

// Load environment variables
config();

// Set and validate environment variables
const port = process.env.PORT;
const mongoUri = process.env.DB_URI;

if (!port || !mongoUri) {
  throw new Error('Required environment variables PORT or DB_URI are missing');
}

// Initialize Express app
const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173', // Allow origin from environment variable
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware setup
app.use(json()); // Parse JSON bodies

// Custom error interface
interface ErrorWithStatus extends Error {
  status?: number;
}

// Initialization function
async function init(): Promise<void> {
  try {
    // Connect to MongoDB
    if (mongoUri) {
      console.log('Connecting to MongoDB...');
      await connect(mongoUri);
    } else {
      throw new Error('MongoDB URI is not defined');
    }
    console.log('Connected to MongoDB');

  } catch (error) {
    console.error('Initialization error:', error);
    process.exit(1); // Exit the process if initialization fails
  }

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

// Define routes

// Catch-all for invalid endpoints
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: '404: Not Found' });
});

// Error-handling middleware
app.use((err: ErrorWithStatus, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Initialize the server
init().catch((error) => {
  console.error('Failed to initialize the server:', error);
});