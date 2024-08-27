// for generating OTP
export const generateOTP = (length: number)=> {
   let otp = "";
   const digits = "0123456789";

   for (let i = 0; i < length; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
   }

   return parseInt(otp,10);
}
