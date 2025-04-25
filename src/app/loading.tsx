"use client";
import type { FC } from "react";

const Loading: FC = () => {
  return (
    <div className="bg-background/80 fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6">
        <div className="relative h-20 w-20">
          {/* Animated Drive logo */}
          <div className="border-primary bg-background absolute inset-0 animate-pulse rounded-md border-2"></div>
          <div className="absolute top-1/2 left-1/2 h-8 w-12 -translate-x-1/2 -translate-y-1/2">
            <div className="bg-primary/80 mb-1.5 h-2 w-full animate-pulse"></div>
            <div className="bg-primary/60 mb-1.5 h-2 w-3/4 animate-pulse"></div>
            <div className="bg-primary/40 h-2 w-1/2 animate-pulse"></div>
          </div>

          {/* Spinning circle */}
          <div className="border-primary absolute inset-0 animate-spin rounded-full border-t-2"></div>
          <div
            className="border-primary/30 absolute inset-0 animate-spin rounded-full border-r-2"
            style={{ animationDuration: "1.5s" }}
          ></div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <h2 className="text-foreground text-lg font-medium">
            Loading your Drive
          </h2>
          <p className="text-muted-foreground text-sm">
            Preparing your files...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
