import mongoose from "mongoose";

const connectionString = "mongodb://localhost:27017/pharmatic";

export async function configDatabase() {
  await mongoose.connect(connectionString);
  console.log("database connected");
}
