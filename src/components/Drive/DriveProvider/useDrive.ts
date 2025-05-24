import { useContext } from "react";
import { DriveContext } from "~/components/Drive/DriveProvider/DriveProvider";
import type { APIDirectory } from "~/service/types";

export const useDrive = () => {
  const { allDirectories, setAllDirectories } = useContext(DriveContext);

  // TODO optimize using map
  const getBreadCrumbOrderDirs = (currentDirId: number): APIDirectory[] => {
    const currentDir = allDirectories.find((d) => d.id === currentDirId);
    if (!currentDir) return [];

    const path = [currentDir];

    let pointer = currentDir.parentDirId;

    while (pointer != undefined) {
      const pointerDir = allDirectories.find((d) => d.id === pointer);
      if (!pointerDir) return path;
      path.unshift(pointerDir);
      pointer = pointerDir.parentDirId;
    }
    return path;
  };

  const addDir = (dir: APIDirectory) => {
    if (allDirectories.find((d) => d.id === dir.id)) return;

    setAllDirectories((prev) => [...prev, dir]);
  };

  return { allDirectories, getBreadCrumbOrderDirs, addDir };
};
