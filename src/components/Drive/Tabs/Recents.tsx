import FileTable from "../FileTable/FileTable";

const Recents = () => {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Recent</h1>
        <p className="text-muted-foreground text-sm">
          Files you&apos;ve opened recently
        </p>
      </div>
      <div className="relative overflow-auto">
        <FileTable tableData={[]} />
      </div>
    </>
  );
};

export default Recents;
