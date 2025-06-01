import FileTable from "../FileTable/FileTable";

const Shared = () => {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Shared with me</h1>
        <p className="text-muted-foreground text-sm">
          Files shared with you by others
        </p>
      </div>
      <div className="relative overflow-auto">
        <FileTable tableData={[]} />
      </div>
    </>
  );
};

export default Shared;
