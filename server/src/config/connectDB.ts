import { connect } from "mongoose";
import { MONGODB_URL } from "./env";

export const connectDB = async () => {
   try {
      await connect(`${MONGODB_URL}/AVM`);
   } catch (error) {
      console.log("Error in Connecting MongoDB ", error);
   }
};
