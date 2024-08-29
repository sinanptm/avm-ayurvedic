"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const MedicalNotes = () => {
   const [newNote, setNewNote] = useState("");

   return (
      <Card>
         <CardHeader>
            <h2 className="text-xl font-semibold text-green-500">Medical Notes</h2>
         </CardHeader>
         <CardContent>
            <div className="space-y-4 mb-4">
               {[
                  {
                     date: "May 1, 2023",
                     note: "Patient reported mild headaches. Recommended to monitor and report if symptoms persist.",
                  },
                  {
                     date: "April 15, 2023",
                     note: "Annual check-up completed. All vitals normal. Advised to maintain current diet and exercise routine.",
                  },
               ].map((note, index) => (
                  <div key={index} className="p-3 bg-gray-800 rounded-lg">
                     <p className="text-sm text-gray-400 mb-1">{note.date}</p>
                     <p>{note.note}</p>
                  </div>
               ))}
            </div>
            <form className="space-y-4">
               <div>
                  <label htmlFor="newNote" className="block text-sm font-medium text-gray-300 mb-1">
                     Add New Note
                  </label>
                  <Textarea
                     id="newNote"
                     value={newNote}
                     onChange={(e) => setNewNote(e.target.value)}
                     placeholder="Enter a new medical note..."
                     className="w-full"
                  />
               </div>
               <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Add Note</Button>
            </form>
         </CardContent>
      </Card>
   );
};

export default MedicalNotes;
