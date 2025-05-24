import type { APIDirectory } from "~/service/types";
import {
  createContext,
  type Dispatch,
  type FC,
  type PropsWithChildren,
  type SetStateAction,
  useEffect,
  useState,
} from "react";
import { getAllDirs } from "~/service/dirService";

type TDriveContext = {
  allDirectories: APIDirectory[];
  setAllDirectories: Dispatch<SetStateAction<APIDirectory[]>>;
};

export const DriveContext = createContext<TDriveContext>({
  allDirectories: [],
  setAllDirectories: (value) => {},
});

const DriveProvider: FC<PropsWithChildren> = ({ children }) => {
  const [allDirs, setAllDirs] = useState<APIDirectory[]>([]);

  useEffect(() => {
    getAllDirs().then(setAllDirs);
  }, []);

  return (
    <DriveContext.Provider
      value={{ allDirectories: allDirs, setAllDirectories: setAllDirs }}
    >
      {children}
    </DriveContext.Provider>
  );
};

export default DriveProvider;
