"use client";

import Search from "~/components/Search/Search";

type Props = {
  searchParams: Promise<{ q: string }>;
};

export default function SearchPage({ searchParams }: Props) {
  return <Search searchParams={searchParams} />;
}
