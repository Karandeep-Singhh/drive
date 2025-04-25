"use client";

import type { FC, ReactNode } from "react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  HardDrive,
  Clock,
  Share2,
  Star,
  Trash2,
  FileQuestion,
} from "lucide-react";

type Props = {
  children: ReactNode;
};

const TabNavigation: FC<Props> = ({ children }) => {
  const [activeTab, setActiveTab] = useState("search");
  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-6 grid w-full grid-cols-7">
        <TabsTrigger value="search">Search Results</TabsTrigger>
        <TabsTrigger value="my-drive">
          <HardDrive className="mr-2 h-4 w-4" />
          My Drive
        </TabsTrigger>
        <TabsTrigger value="recent">
          <Clock className="mr-2 h-4 w-4" />
          Recent
        </TabsTrigger>
        <TabsTrigger value="shared">
          <Share2 className="mr-2 h-4 w-4" />
          Shared
        </TabsTrigger>
        <TabsTrigger value="starred">
          <Star className="mr-2 h-4 w-4" />
          Starred
        </TabsTrigger>
        <TabsTrigger value="trash">
          <Trash2 className="mr-2 h-4 w-4" />
          Trash
        </TabsTrigger>
        <TabsTrigger value="storage">
          <FileQuestion className="mr-2 h-4 w-4" />
          Storage
        </TabsTrigger>
      </TabsList>

      <TabsContent value="search" className="mt-0">
        {childrenArray[0]}
      </TabsContent>
      <TabsContent value="my-drive" className="mt-0">
        {childrenArray[1]}
      </TabsContent>
      <TabsContent value="recent" className="mt-0">
        {childrenArray[2]}
      </TabsContent>
      <TabsContent value="shared" className="mt-0">
        {childrenArray[3]}
      </TabsContent>
      <TabsContent value="starred" className="mt-0">
        {childrenArray[4]}
      </TabsContent>
      <TabsContent value="trash" className="mt-0">
        {childrenArray[5]}
      </TabsContent>
      <TabsContent value="storage" className="mt-0">
        {childrenArray[6]}
      </TabsContent>
    </Tabs>
  );
};

export default TabNavigation;
