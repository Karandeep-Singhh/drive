"use client";

import { use } from "react";
import type { FC } from "react";
import { searchFiles } from "~/lib/mock-data";
import TabNavigation from "./TabNavigation";
import SearchResults from "./SearchResults";
import { MyDrive, Recent, Shared, Starred, Trash, Storage } from "./TabContent";
import SearchLayout from "./SearchLayout";

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
