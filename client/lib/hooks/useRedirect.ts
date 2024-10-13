import { useRouter } from "next/navigation";
import { useCallback } from "react";

const useRedirect = () => {
   const router = useRouter();
   const redirect = useCallback(
      (path: string = "/new-appointment") => {
         router.push(path);
      },
      [router]
   );
   return redirect;
};

export default useRedirect;
