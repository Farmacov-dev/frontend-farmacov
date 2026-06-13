import React from "react";

type ContentWrapperProps = {
  children: React.ReactNode;
};

const ContentWrapper = ({ children }: ContentWrapperProps) => {
  return (
    <div className="w-full px-6 py-6">
      {children}
    </div>
  );
};

export default ContentWrapper;
