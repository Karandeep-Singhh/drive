import { Button } from "~/components/ui/button";
import { CheckIcon, FolderPlus, X } from "lucide-react";
import { type FC, useState } from "react";
import { Input } from "~/components/ui/input";
import { createDir } from "~/service/dirService";
import { useDrive } from "~/components/Drive/DriveProvider/useDrive";

type Props = {
  currentDirId?: string;
};

const AddDirectoryInput: FC<Props> = ({ currentDirId }) => {
  const [enableDirInput, setEnableDirInput] = useState(false);
  const [newDirName, setNewDirName] = useState("");
  const { addDir } = useDrive();

  const handleCreateDir = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newDirName.length === 0) return;
    console.log(newDirName, currentDirId);

    // TODO need validations on name
    void createDir(newDirName, currentDirId)
      .then(addDir)
      .finally(() => setEnableDirInput(false));
  };

  if (enableDirInput) {
    return (
      <form onSubmit={handleCreateDir}>
        <div className="flex gap-1">
          <Input
            type="text"
            placeholder="Enter new directory"
            onChange={(e) => setNewDirName(e.target.value)}
          />
          <Button variant="secondary" size="icon" type="submit">
            <CheckIcon />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => setEnableDirInput(false)}
          >
            <X />
          </Button>
        </div>
      </form>
    );
  }

  return (
    <Button
      variant="outline"
      className="gap-2"
      onClick={() => setEnableDirInput(true)}
    >
      <FolderPlus className="h-4 w-4" />
      <span>New folder</span>
    </Button>
  );
};

export default AddDirectoryInput;
