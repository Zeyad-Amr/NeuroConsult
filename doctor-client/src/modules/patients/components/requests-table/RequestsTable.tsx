import { Box } from "@mui/material";
import CustomTableTollbar from "../../../../core/components/Table/CustomTableTollbar";
import TableView from "../../../../core/components/Table/TableView";
import { useTableContext } from "../../../../core/components/Table/context";
import { data, header } from "./data";
import { useState } from "react";

export default function RequestsTable() {
    const {
        page,
        setPage,
        rowsPerPage,
        search,
        selected,
    } = useTableContext()
    const [rowData, setRowData] = useState<any>()

    const handleOrderClick = (e: any) => {
        console.log(rowData);
        // setOpenOrder(true);

    }

    return (
        <>

            <TableView
                data={data}
                renderItem={header}
                rowHeight="20px"
                stickyHeader={true}
                onRowClick={(item) => setRowData(item)}
                total={data.length ?? 0}
            />
        </>
    )
}