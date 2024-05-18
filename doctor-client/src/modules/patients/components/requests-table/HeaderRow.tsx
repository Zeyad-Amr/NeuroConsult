import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

const HeaderRow = () => {
    return (
        <Grid container spacing={1} sx={{ height: '3.2rem', mb: 1 }}>
            <Grid item lg={5} md={5} sm={5} xs={5}>

                <Box sx={{
                    borderRadius: '5px', backgroundColor: 'rgb(32, 37, 45)', height: '100%', display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Typography sx={{ color: 'white' }}>Name</Typography>
                </Box>
            </Grid>
            <Grid item lg={2} md={2} sm={2} xs={2}>
                <Box sx={{
                    borderRadius: '5px', backgroundColor: 'rgb(32, 37, 45)', height: '100%', display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Typography sx={{ color: 'white' }}>Age</Typography>
                </Box>
            </Grid>
            <Grid item lg={2} md={2} sm={2} xs={2}>
                <Box sx={{
                    borderRadius: '5px', backgroundColor: 'rgb(32, 37, 45)', height: '100%', display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Typography sx={{ color: 'white' }}>Gender</Typography>
                </Box>
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={3}>
                <Box sx={{
                    borderRadius: '5px', backgroundColor: 'rgb(32, 37, 45)', height: '100%', display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Typography sx={{ color: 'white' }}>Phone Number</Typography>
                </Box>
            </Grid>
        </Grid>
    )
}

export default HeaderRow