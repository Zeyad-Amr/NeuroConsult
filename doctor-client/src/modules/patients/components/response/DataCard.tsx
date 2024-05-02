import Box from '@mui/material/Box'
import React from 'react'
import Header from '../../../../core/components/Header'

const DataCard = ({ header, children }: { header: string, children: any }) => {
    return (
        <Box sx={{ padding: '1rem', backgroundColor: 'rgb(32, 37, 45)', height: '100%', borderRadius: '5px' }}>
            <Header title={header} dark />
            <Box sx={{ mt: 1 }}>
                {children}
            </Box>
        </Box>
    )
}

export default DataCard