"use client";

import type { FC } from "react";
import { use } from "react";
import { searchFiles } from "~/lib/mock-data";
import SearchLayout from "./SearchLayout";
import SearchResults from "./SearchResults";
import { MyDrive, Recent, Shared, Starred, Storage, Trash } from "./TabContent";
import TabNavigation from "./TabNavigation";

type Props = {
  searchParams: Promise<{ q: string }>;
};

const Search: FC<Props> = ({ searchParams }) => {
  const { q } = use(searchParams);
  const searchResults = searchFiles(q);

  return (
    <SearchLayout>
      <TabNavigation>
        <SearchResults q={q} searchResults={searchResults} />
        <MyDrive />
        <Recent />
        <Shared />
        <Starred />
        <Trash />
        <Storage />
      </TabNavigation>
    </SearchLayout>
  );
};

export default Search;
