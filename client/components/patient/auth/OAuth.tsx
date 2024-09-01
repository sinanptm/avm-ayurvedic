"use client";

import { Button } from "@/components/ui/button";
import { app } from "@/config/firebaseConfig";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Image from "next/image";

export default function GoogleSignInButton() {
   const handleGoogleSignIn = async () => {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();

      try {
         const result = await signInWithPopup(auth, provider);
         const user = result.user.providerData;
         console.log(user);
      } catch (error) {
         console.error("Error during sign-in with Google: ", error);
      }
   };

   return (
      <Button
         onClick={handleGoogleSignIn}
         variant="outline"
         className="w-full mt-5 bg-white text-gray-900 hover:bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 py-2 px-4 rounded-lg shadow-md transition-colors duration-200 flex items-center justify-center">
         <Image src="/assets/icons/social/google.svg" alt="Google logo" width={24} height={24} className="mr-2" />
         Sign in with Google
      </Button>
   );
}
