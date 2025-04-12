"use client";

import type { FC } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, HelpCircle, Settings, Grid3X3, User } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

const Navbar: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="border-border border-b">
      <div className="flex h-16 items-center px-4">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <svg height="24" viewBox="0 0 24 24" width="24" focusable="false">
              <path
                d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"
                fill="#5f6368"
              ></path>
              <path
                d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"
                fill="#1967d2"
                fillOpacity=".6"
              ></path>
            </svg>
            <span className="text-xl font-medium">Drive</span>
          </Link>
        </div>

        {/* Center section - Search */}
        <div className="flex-1 px-4">
          <form
            onSubmit={handleSearch}
            className="relative mx-auto w-full max-w-2xl"
          >
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search in Drive"
              className="bg-muted/50 focus-visible:bg-background w-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Grid3X3 className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
