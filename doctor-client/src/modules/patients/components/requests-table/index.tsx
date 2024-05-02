import { TableProvider } from "../../../../core/components/Table/context";
import RequestsTable from "./RequestsTable";

export default function Requests() {
    return (
        <TableProvider>
            <RequestsTable />
        </TableProvider>
    )
}