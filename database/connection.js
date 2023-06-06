import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

async function connect() {
  // Create an in-memory MongoDB instance
  const mongod = await MongoMemoryServer.create();
  const getUri = mongod.getUri();

  mongoose.set("strictQuery", true);

  // Connect to it via mongoose
  const db = await mongoose.connect(getUri);
  console.log(`MongoDB successfully connected to ${getUri}`);

  return db;
}

export { connect };
