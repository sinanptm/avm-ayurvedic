export const isValidEmail = (email: string): boolean => {
   const allowedDomains = ["gmail.com", "outlook.com", "icloud.com", "yahoo.com"];
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!emailRegex.test(email)) {
      return false;
   }
   const domain = email.split("@")[1];
   return allowedDomains.includes(domain);
};

export const isValidatePassword = (password: string): boolean => {
   const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
   return passwordRegex.test(password);
};
