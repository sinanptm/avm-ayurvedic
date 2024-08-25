import React from "react";

const Dashboard = () => {
   return (
      <main className="lex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
         <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
         </div>
         <div className="flex flex-1 items-center justify-center rounded-lg shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center"></div>
         </div>
      </main>
   );
};

export default Dashboard;

