import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, Box, TextField, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useTableContext } from './context';


interface CustomTableTollbarProps {
    width?: string
    numSelected: number;
    handleSelectedButtonClick?: (e: any) => void;
}
export default function CustomTableTollbar({
    width = "100%",
    numSelected,
    handleSelectedButtonClick
}: CustomTableTollbarProps) {

    const {
        setPage,
        search,
        setSearch,
    } = useTableContext()


    useEffect(() => {
        if (setSearch !== undefined) {
            if (search.length >= 2) {
                setSearch(search)
                setPage(0)
            }
            if (search === "") {
                setSearch(search)
            }

        }
    }, [search]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "center",
                justifyContent: "end",
                gap: 2,
                width: width,
            }}
        >

            <Paper
                component="div"
                sx={{
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    width: {
                        lg: "40%", md: "40%", sm: "100%", xs: "100%"
                    },
                    borderBottom: `1px solid orange`
                }
                }
                elevation={0}
            >

                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); }}
                    inputProps={{ 'aria-label': 'search' }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>

            </Paper>
            <Box
                sx={{
                    width: "60%"
                }}>
                <Toolbar
                    sx={{
                        ...(numSelected > 0 && {
                            bgcolor: "#e3e3e3",
                        }),
                        borderRadius: "5px",
                        width: "100%"
                    }}

                    variant='dense'
                >
                    {numSelected > 0 ? (
                        <>
                            <Typography
                                sx={{ flex: '1 1 100%' }}
                                color="inherit"
                                variant="subtitle1"
                                component="div"
                            >
                                {numSelected} selected
                            </Typography>
                            {handleSelectedButtonClick ? (

                                <Tooltip title="Make Order">
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        size="small"
                                        sx={{
                                            width: "40%"
                                        }}
                                        onClick={handleSelectedButtonClick}
                                    >
                                        Make Order
                                    </Button>
                                </Tooltip>
                            ) : null}
                        </>
                    ) : null}
                </Toolbar>
            </Box>
        </Box>
    );
}
