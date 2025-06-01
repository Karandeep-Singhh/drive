import FileTable from "../FileTable/FileTable";

const Trash = () => {
    return <>
        <div className="mb-6">
            <h1 className="text-2xl font-bold">Trash</h1>
            <p className="text-muted-foreground text-sm">
                Files you've deleted
            </p>
        </div>
        <div className="relative overflow-auto">
            <FileTable parentId={null} />
        </div>
    </>;
};

export default Trash;


