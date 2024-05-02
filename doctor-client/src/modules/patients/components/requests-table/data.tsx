import { HeaderItem } from "../../../../core/components/Table/types";

export interface DataItem {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    description: string;
    icon?: React.ReactNode;
}

export const data = [


]

export const header: HeaderItem[] = [
    {
        id: "name",
        label: "Name",
        minWidth: 200,
        maxWidth: 200,
        tableCellProps: { align: "center" },
        sortable: true,
        filterable: true,
        searchable: true,
        onClick: () => { },
    },
    {
        id: "complaint",
        label: "Complaint",
        minWidth: 180,
        maxWidth: 180,
        tableCellProps: { align: "center" },
        sortable: true,
        filterable: true,
        searchable: true,
        onClick: () => { },
    },
    {
        id: "age",
        label: "Age",
        minWidth: 100,
        maxWidth: 100,
        tableCellProps: { align: "center" },
        sortable: true,
        filterable: true,
        searchable: true,
        onClick: () => { },
    },
    {
        id: "buttons",
        label: "",
        minWidth: 30,
        maxWidth: 30,
        tableCellProps: { align: "center" },
        isIcon: true,
        onClick: () => { },
    },

];