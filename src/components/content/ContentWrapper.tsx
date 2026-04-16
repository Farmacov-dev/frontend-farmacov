import React from "react";

type ContentWrapperProps = {
  children: React.ReactNode;
};

const ContentWrapper = ({ children }: ContentWrapperProps) => {
  return (
    <div className="w-full max-w-[1200px]">
      {children}
    </div>
  );
};

export default ContentWrapper;