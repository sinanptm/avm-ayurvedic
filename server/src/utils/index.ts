export const generateOTP = (length: number): string => {
   let otp = "";
   const digits = "0123456789";

   for (let i = 0; i < length; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
   }

   return otp;
};
