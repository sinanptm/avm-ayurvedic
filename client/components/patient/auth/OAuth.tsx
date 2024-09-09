"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { app } from "@/config/firebaseConfig";
import { useAuth } from "@/lib/hooks/useAuth";
import { useOAuthSigninPatient } from "@/lib/hooks/patient/usePatientAuth";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Link } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function GoogleSignInButton() {
   const { mutate: oAuthSignin, isPending } = useOAuthSigninPatient();
   const { setCredentials } = useAuth();
   const router = useRouter();
   const handleGoogleSignIn = async () => {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      try {
         const result = await signInWithPopup(auth, provider);
         const user: any = result.user.providerData[0];
         oAuthSignin(
            { email: user.email, name: user.displayName, profile: user.photoURL },
            {
               onSuccess: ({ accessToken }) => {
                  toast({
                     title: "Authentication Completed ✅",
                     description: "Google Authentication Completed!. let's book your first appointment",
                     variant: "success"
                  });

                  router.push("/");
                  setTimeout(() => {
                     setCredentials("patientToken", accessToken);
                  }, 220);
               },
               onError: (error) => {
                  toast({
                     title: "Google Authentication Failed ❌",
                     description: error.response?.data.message,
                     variant: "destructive",
                  });
               },
            }
         );
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
