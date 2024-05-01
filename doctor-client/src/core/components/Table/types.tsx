import { TableCellProps } from "@mui/material";

export interface HeaderItem {
    id: string;
    label: string;
    minWidth?: number;
    maxWidth?: number;
    tableCellProps?: TableCellProps;
    format?: (value: number) => string;
    onClick?: () => void;
    isIcon?: boolean;
    component?: React.ReactNode;
    sortable?: boolean;
    filterable?: boolean;
    searchable?: boolean;
}