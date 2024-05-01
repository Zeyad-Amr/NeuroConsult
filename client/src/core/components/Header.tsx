import { Box, Typography } from '@mui/material'
import React from 'react'

const Header = ({ title }: { title: string }) => {
    return (
        <Box>
            <Typography>
                {title}
            </Typography>
            <Box sx={{ width: '100%', height: '2px', background: 'linear-gradient(45deg, #29f19c, #02a1f9)' }}>

            </Box>
        </Box>
    )
}

export default Header