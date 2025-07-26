"use client";

import { type FC } from "react";
import Navbar from "./Navbar/Navbar";
import Tabs from "./Tabs/Tabs";
import DriveProvider from "~/components/Drive/DriveProvider";
import UploadProvider from "~/components/Drive/UploadProvider";

type Props = {
    currentFolderId?: number;
};

const Drive: FC<Props> = ({ currentFolderId }) => {
    return (
        <div className="bg-background flex min-h-screen flex-col">
            <DriveProvider>
                <UploadProvider>
                    <Navbar />
                    <Tabs currentFolderId={currentFolderId} />
                </UploadProvider>
            </DriveProvider>
        </div>
    );
};

export default Drive;
