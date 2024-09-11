import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import React from "react";

const AllergiesAndConditions = () => {
   return (
      <Card>
         <CardHeader className="flex flex-row items-center space-x-2">
            <AlertCircle className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-semibold text-yellow-400">Allergies and Conditions</h2>
         </CardHeader>
         <CardContent>
            <ul className="list-disc list-inside space-y-2">
               <li>Penicillin allergy</li>
               <li>Asthma</li>
               <li>Hypertension</li>
            </ul>
         </CardContent>
      </Card>
   );
};

export default AllergiesAndConditions;
