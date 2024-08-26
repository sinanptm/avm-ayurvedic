import { connect } from "mongoose";

export const connectDB = async () => {
   try {
      await connect(`${process.env.MONGODB_URL}/AVM`);
   } catch (error) {
      console.log("Error in Connecting MongoDB ", error);
   }
};
