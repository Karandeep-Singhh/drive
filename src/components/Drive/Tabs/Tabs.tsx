import {
  Tabs as ShadcnTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/components/ui/tabs";
import { Trash } from "lucide-react";
import { type FC, useState } from "react";
import { tabs } from "./utils";
import Recents from "./Recents";
import type { TTabs } from "./types";
import Shared from "./Shared";
import Starred from "./Starred";
import Storage from "./Storage";
import MyDrive from "./MyDrive";

type Props = {
  currentFolderId?: number;
};

const Tabs: FC<Props> = ({ currentFolderId }) => {
  const [activeTab, setActiveTab] = useState<TTabs>("my-drive");

  return (
    <main className="flex-1">
      <div className="container mx-auto p-6 pt-4">
        <ShadcnTabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as TTabs)}
          className="w-full"
        >
          <TabsList className="mb-6 grid w-full grid-cols-6">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                <tab.icon className="mr-2 h-4 w-4" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="my-drive" className="mt-0">
            <MyDrive currentDirectoryId={currentFolderId} />
          </TabsContent>

          <TabsContent value="recent" className="mt-0">
            <Recents />
          </TabsContent>

          <TabsContent value="shared" className="mt-0">
            <Shared />
          </TabsContent>

          <TabsContent value="starred" className="mt-0">
            <Starred />
          </TabsContent>

          <TabsContent value="trash" className="mt-0">
            <Trash />
          </TabsContent>

          <TabsContent value="storage" className="mt-0">
            <Storage />
          </TabsContent>
        </ShadcnTabs>
      </div>
    </main>
  );
};

export default Tabs;
