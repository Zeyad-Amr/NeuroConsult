import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { Formik } from 'formik'
import Header from '../../core/components/Header'
import CustomTextField from '../../core/components/CustomTextField'
import Requests from './components/requests-table'

const Patients = () => {
    return (
        <Box sx={{
            width: '100vw', height: '100vh', position: 'relative', background: 'linear-gradient(45deg, #29f19c, #02a1f9)',
        }}>
            <Box sx={{
                width: '98vw', height: '96vh', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            }}>
                <Grid container sx={{
                    height: '100%',
                }}>
                    <Grid item lg={8} md={8} sm={8} xs={12}>
                        <Box sx={{
                            width: '100%', height: '100%', backgroundColor: '#eee',
                            borderTopLeftRadius: '10px',
                            borderBottomLeftRadius: '10px',
                            padding: '2rem',
                            boxSizing: 'border-box',
                        }}>
                            <Box>
                                <Typography sx={{ fontSize: '2rem' }}>
                                    Hello <span style={{ fontWeight: '600', color: 'black' }}>Abdelrhman Yaser</span>
                                </Typography>
                            </Box>
                            <Header title='Consultation Requests' />
                            <Box sx={{
                                display: "block",
                                p: 2

                            }}>
                                <Requests />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item lg={4} md={4} sm={4} xs={12}>
                        <Box sx={{
                            width: '100%', height: '100%', backgroundColor: 'rgb(32, 37, 45)',
                            borderTopRightRadius: '10px',
                            borderBottomRightRadius: '10px',
                            padding: '2rem',
                            boxSizing: 'border-box',
                        }}>
                            <Formik
                                initialValues={{ illnesses: "", Complaints: "" }}
                                onSubmit={(values) => {
                                    console.log(values);
                                }}
                            >
                                {({
                                    values,
                                    touched,
                                    errors,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                }) => (
                                    <Box component="form" onSubmit={handleSubmit} noValidate>
                                        <Grid container spacing={2}>
                                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                            </Grid>

                                            <Grid item lg={4} md={4} sm={6} xs={12}>
                                                <CustomTextField

                                                    enable={true}
                                                    isRequired
                                                    name="Complaints"
                                                    label="Complaints"
                                                    value={values.Complaints}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.Complaints}
                                                    touched={touched.Complaints}
                                                    width="100%"
                                                    props={{
                                                        type: "text",
                                                    }}
                                                    sx={{
                                                        backgroundColor: "#ddd",
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                )}
                            </Formik>

                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default Patients