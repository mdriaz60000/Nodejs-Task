import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

async function main() {
  try {
    // MongoDB connect
    await mongoose.connect(config.database_url as string);
    console.log("✅ Database connected successfully");

    app.listen(config.port, () => {
      console.log(`🚀 App running on port ${config.port}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect database", error);
  }
}

main();
