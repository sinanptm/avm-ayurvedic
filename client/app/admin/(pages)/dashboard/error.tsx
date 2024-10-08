"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ButtonColorVariant, ButtonV2 } from "@/components/button/ButtonV2";
import { toast } from "@/components/ui/use-toast";


const Error = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
   useEffect(() => {
      toast({
         title: "Something went wrong!",
         variant: "destructive",
         description: error.message
      });
   }, [error]);



   return (
      <Card className="border-none">
         <CardHeader className="pb-2">
            <CardTitle className="text-lg">
               Something went wrong!
            </CardTitle>
         </CardHeader>
         <CardContent className="p-3 m-4 flex justify-center">
            <ButtonV2
               variant={"ringHover"}
               color={"danger" as ButtonColorVariant}
               onClick={() => reset()}
            >
               Try again
            </ButtonV2>
         </CardContent>
      </Card>
   );
};

export default Error;
