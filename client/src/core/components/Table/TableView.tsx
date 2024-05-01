"use client"

import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    SxProps,
    Box,
    Typography,
    Tooltip,
    TablePagination,
    TableCellProps,
    Checkbox,
} from "@mui/material";
import React from "react";
import { useTableContext } from "./context";

interface Props {
    data: any[];
    renderItem: any[];
    width?: string;
    height?: string;
    boxShadow?: number;
    stickyHeader?: boolean;
    sx?: SxProps;
    onRowClick?: (item?: any) => void;
    hover?: boolean;
    rowHeight?: string;
    total: number
    withCheckbox?: boolean
}

export default function TableView({
    data,
    renderItem,
    width = "100%",
    height = "75vh",
    boxShadow = 10,
    stickyHeader = false,
    sx,
    onRowClick,
    hover = true,
    rowHeight = "1rem",
    total,
    withCheckbox = false,
}: Props) {
    const {
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        selected,
        setSelected,
    } = useTableContext()


    const handleChangePage = (
        _event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    // TODO
    //* ----------------------- Handle Sorting
    // const [sortedColumn, setSortedColumn] =
    //     useState<SortedColumn>(initSortedColumn);

    // useEffect(() => {
    //     console.log(sortedColumn);
    // }, [sortedColumn]);


    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = data.map((n: any) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };


    const isSelected = (id: string) => selected.indexOf(id) !== -1;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                mt: 2,
                width: width,
                height: height,
                ...sx,
            }}
        >


            <TableContainer
                component={Paper}
                sx={{
                    width: width,
                    height: "100%",
                }}
                elevation={0}
            >
                <Table stickyHeader={stickyHeader} size="small" aria-label="sticky table" >
                    <TableHead>

                        <TableRow>
                            {withCheckbox ?
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        color="primary"
                                        indeterminate={selected.length > 0 && selected.length < data.length}
                                        checked={data.length > 0 && selected.length === data.length}
                                        onChange={handleSelectAllClick}
                                        inputProps={{
                                            'aria-label': 'select all products',
                                        }}
                                    />
                                </TableCell>
                                : null}
                            {renderItem.map((item) => (
                                <TableCell
                                    key={item.id}
                                    {...item.tableCellProps}
                                    sx={{
                                        maxHeight: "20px",

                                    }}
                                >
                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                        <Typography
                                            variant="subtitle1"
                                        >
                                            {item.component ? item.component : item.label}
                                        </Typography>
                                    </Box>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(data ?? []).map((item: any, index: number) => {
                            const isItemSelected = isSelected(item.id);
                            const labelId = `table-checkbox-${index}`;

                            return (
                                <TableRow
                                    key={(item as any).id}
                                    onClick={(e) => onRowClick && onRowClick(item)}
                                    hover={hover}
                                    sx={{
                                        backgroundColor:
                                            "white",
                                        "&:hover": {
                                            backgroundColor: "#f0f0f0",
                                        },
                                    }}
                                >
                                    {withCheckbox ?
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                onClick={(e) => {
                                                    handleClick(e, (item as any).id)
                                                }}
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>
                                        : null}
                                    {renderItem.map((headerItem) =>
                                        headerItem.isIcon ? (
                                            <TableCell
                                                key={headerItem.id}
                                                {...headerItem.tableCellProps}
                                                sx={{
                                                    // minWidth: headerItem.minWidth,
                                                    // maxWidth: headerItem.maxWidth,
                                                    // height: rowHeight,
                                                }}
                                            >
                                                {/* <Box
                                                sx={{
                                                    height: rowHeight,
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            > */}
                                                {(item as any)[headerItem.id]}
                                                {/* </Box> */}
                                            </TableCell>
                                        ) : (
                                            <TableCell
                                                key={headerItem.id}
                                                {...headerItem.tableCellProps}
                                                sx={{
                                                    minWidth: headerItem.minWidth,
                                                    maxWidth: headerItem.maxWidth,
                                                    height: rowHeight,
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }}
                                            >
                                                <Tooltip
                                                    enterDelay={1000}
                                                    title={(item as any)[headerItem.id]}
                                                >
                                                    <Typography
                                                        sx={{
                                                            fontSize: "0.8rem",
                                                            textAlign: "center", // Center the text horizontally
                                                            lineHeight: rowHeight, // Center the text vertically
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            display: "inline-block", // Ensure ellipsis works properly
                                                            maxWidth: "100%", // Ensure text doesn't overflow TableCell
                                                        }}
                                                    >
                                                        {(item as any)[headerItem.id]}
                                                    </Typography>
                                                </Tooltip>
                                            </TableCell>
                                        )
                                    )}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box
                sx={{
                    width: width,
                }}
            >
                <TablePagination
                    component="div"
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    count={total ?? 0}
                    page={page}
                    rowsPerPageOptions={[5, 10, 25, 100]}
                />
            </Box>
        </Box >
    );
}
