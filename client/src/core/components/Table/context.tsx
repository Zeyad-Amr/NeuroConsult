import React, {
    createContext,
    useContext,
    useState,
} from "react";



// Define the type for TableContext
interface TableContextType {
    selected: string[]
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
    rowsPerPage: number
    setRowsPerPage: React.Dispatch<React.SetStateAction<number>>
    search: string
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

// Create the TableContext
const TableContext = createContext<TableContextType | undefined>(
    undefined
);

// Custom hook to use the TableContext
export const useTableContext = <T,>() => {
    const context = useContext(TableContext);
    if (!context) {
        throw new Error("useTableContext must be used within a TableProvider");
    }
    return context as TableContextType;
};

// TableProvider component to wrap your application and provide the context
export const TableProvider = (props: {
    children: React.ReactNode
}) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState<string>("");
    const [selected, setSelected] = useState<string[]>([]);


    return (
        <TableContext.Provider
            value={{
                page,
                setPage,
                rowsPerPage,
                setRowsPerPage,
                search,
                setSearch,
                selected,
                setSelected,
            }}
        >
            {props.children}
        </TableContext.Provider>
    );
};