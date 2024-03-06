import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      dbName: "LinkFree", 
    });
    console.log("Connected to the database..");
  } catch (err) {
    console.log("Error in connectToDB function: ", err.message);
  }
};
