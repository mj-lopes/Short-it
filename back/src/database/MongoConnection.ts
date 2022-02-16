import { config } from "../config/Constraints";
import mongoose from "mongoose";

export class MongoConnection {
  async connect(): Promise<void> {
    try {
      await mongoose.connect(config.MONGO_CONNECTION);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }
}

export default new MongoConnection();
