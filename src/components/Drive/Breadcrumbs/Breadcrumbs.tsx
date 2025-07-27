"use client";

import type { FC } from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { useDrive } from "~/components/Drive/DriveProvider/useDrive";
import React from "react";

interface BreadcrumbsProps {
    currentDirId: string;
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ currentDirId }) => {
    const { getBreadCrumbOrderDirs } = useDrive();
    const breadcrumbPath = getBreadCrumbOrderDirs(currentDirId).map((e) => ({
        ...e,
        type: "directory",
        owner: "Me",
    }));

    return (
        <div className="text-muted-foreground mb-4 flex items-center text-sm">
            {breadcrumbPath.map((item, index) => (
                <React.Fragment key={item.id}>
                    {index === 0 ? (
                        <Link href="/" className="hover:text-foreground flex items-center">
                            <Home className="mr-1 h-4 w-4" />
                            <span>My Drive</span>
                        </Link>
                    ) : (
                        <div key={item.id} className="flex items-center">
                            <ChevronRight className="mx-1 h-4 w-4" />
                            {index === breadcrumbPath.length - 1 ? (
                                <span className="text-foreground">{item.name}</span>
                            ) : (
                                <Link
                                    href={`/folder/${item.id}`}
                                    className="hover:text-foreground"
                                >
                                    {item.name}
                                </Link>
                            )}
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default Breadcrumbs;
