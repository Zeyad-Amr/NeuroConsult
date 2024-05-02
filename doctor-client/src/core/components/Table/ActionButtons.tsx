import { Box, Button, IconButton, Menu, MenuItem } from '@mui/material';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import { DeleteRounded, EditRounded, More, MoreVert } from '@mui/icons-material';
import { useState } from 'react';

interface ActionButtonsProps {
    handleEditClick: any
}

export default function ActionButtons(
    { handleEditClick }: ActionButtonsProps
) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box >
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                size='small'
                onClick={handleClick}>
                <MoreVert />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => { handleClose(); return handleEditClick() }}>Edit</MenuItem>
                <MenuItem onClick={handleClose} color='red'>Delete</MenuItem>
            </Menu>
        </Box>
    );
}