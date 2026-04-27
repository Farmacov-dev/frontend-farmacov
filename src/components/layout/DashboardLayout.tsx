import React from "react";


type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#F4F7FB] flex">


      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;