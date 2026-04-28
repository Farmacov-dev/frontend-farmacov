import React from "react";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-[#F4F7FB]">
      {children}
    </div>
  );
};

export default DashboardLayout;
