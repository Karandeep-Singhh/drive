"use client";

import type { FC, ReactNode } from "react";
import Navbar from "~/components/Drive/Navbar/Navbar";

type Props = {
  children: ReactNode;
};

const SearchLayout: FC<Props> = ({ children }) => {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto p-6 pt-4">{children}</div>
      </main>
    </div>
  );
};

export default SearchLayout;
