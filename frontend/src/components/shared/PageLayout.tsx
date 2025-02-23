import React from "react";
import Navigation from "./Navigation";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen w-screen max-w-[100vw] bg-gray-50 dark:bg-gray-900 overflow-x-hidden">
      <Navigation />
      <div className="w-full max-w-full">
        <main className="container mx-auto px-4 pt-20 pb-12 w-full max-w-full overflow-x-hidden">
          <div className="max-w-[100vw] w-full mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default PageLayout;
