import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import CustomTextField from '../../../core/components/CustomTextField'
import { Formik } from 'formik'
import Header from '../../../core/components/Header'
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import BiotechRoundedIcon from '@mui/icons-material/BiotechRounded';
import RadarRoundedIcon from '@mui/icons-material/RadarRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

const Patient = () => {

    const [completeData, setCompleteData] = useState<boolean>(false)

    interface User {
        name: string;
        gender: string;
        birthDate: string;
        phone: string;
        address?: string | null;
        comorbidities: string;
        Medication: string;
        bloodType: string;
    }

    const initialValues: User = {
        name: 'Abdelrhman Yaser',
        gender: 'Male',
        birthDate: '12/12/2000',
        phone: '01211035528',
        address: 'Cairo University, Giza, Egypt',
        comorbidities: ['3sol', '2mor', 'mya mya'].join(',  '),
        Medication: ['3sol', '2mor', 'mya mya'].join(',  '),
        bloodType: 'A+',
    };

    interface VitalSigns {
        pulse: number;
        bp: string;
        respiration: number;
        pso2: number;
        consultationRequest: string
    }

    const vitalsInitialValues: VitalSigns = {
        pulse: 80,
        bp: "120/80",
        respiration: 16,
        pso2: 95,
        consultationRequest: ''
    };

    return (
        <Box sx={{
            width: '100vw', height: '100vh', position: 'relative', background: 'linear-gradient(45deg, #29f19c, #02a1f9)',

        }}>
            <Box sx={{
                width: '98vw', maxHeight: '96vh', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            }}>
                <Grid container sx={{
                    maxHeight: '96vh',
                }}>
                    <Grid item lg={8} md={8} sm={8} xs={12}>
                        <Box sx={{
                            width: '100%', minHeight: '96vh', maxHeight: '96vh', backgroundColor: '#eee',
                            borderTopLeftRadius: '10px',
                            borderBottomLeftRadius: '10px',
                            padding: '2rem 2rem 4rem',
                            boxSizing: 'border-box',
                            position: 'relative',
                            overflowY: "auto",
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '2rem', marginBottom: '1rem' }}>
                                    Hello <span style={{ fontWeight: '600', color: 'black' }}>Abdelrhman Yaser</span>
                                </Typography>
                                <Box sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center', fontSize: '1.2rem' }}>
                                    <Typography sx={{ fontSize: 'inherit', marginRight: '0.5rem' }}>Log Out</Typography>
                                    <LogoutRoundedIcon sx={{ fontSize: 'inherit', }} />
                                </Box>
                            </Box>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={(values) => {
                                    console.log(values);
                                    setCompleteData(false)
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
                                                <Header title='Personal Data' />
                                            </Grid>

                                            <Grid item lg={4} md={4} sm={6} xs={12}>
                                                <CustomTextField
                                                    enable={false}

                                                    isRequired
                                                    name="name"
                                                    label="name"
                                                    value={values.name}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.name}
                                                    touched={touched.name}
                                                    width="100%"
                                                    props={{
                                                        type: "text",
                                                    }}
                                                    sx={{
                                                        backgroundColor: "#ddd",
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item lg={4} md={4} sm={6} xs={12}>
                                                <CustomTextField
                                                    enable={false}

                                                    isRequired
                                                    name="gender"
                                                    label="gender"
                                                    value={values.gender}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.gender}
                                                    touched={touched.gender}
                                                    width="100%"
                                                    props={{
                                                        type: "text",
                                                    }}
                                                    sx={{
                                                        backgroundColor: "#ddd",
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item lg={4} md={4} sm={6} xs={12}>
                                                <CustomTextField
                                                    enable={false}

                                                    isRequired
                                                    name="birthDate"
                                                    label="birthdate"
                                                    value={values.birthDate}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.birthDate}
                                                    touched={touched.birthDate}
                                                    width="100%"
                                                    props={{
                                                        type: "text",
                                                    }}
                                                    sx={{
                                                        backgroundColor: "#ddd",
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item lg={4} md={4} sm={6} xs={12}>
                                                <CustomTextField
                                                    enable={false}

                                                    isRequired
                                                    name="phone"
                                                    label="phone"
                                                    value={values.phone}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.phone}
                                                    touched={touched.phone}
                                                    width="100%"
                                                    props={{
                                                        type: "text",
                                                    }}
                                                    sx={{
                                                        backgroundColor: "#ddd",
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item lg={8} md={8} sm={6} xs={12}>
                                                <CustomTextField
                                                    enable={false}

                                                    isRequired
                                                    name="address"
                                                    label="address"
                                                    value={values.address}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.address}
                                                    touched={touched.address}
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
                                        <Grid container spacing={2} sx={{ marginTop: '0.5rem', justifyContent:'flex-end' }}>
                                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                                <Header title='Medical Data' />
                                            </Grid>

                                            <Grid item lg={2} md={2} sm={6} xs={12}>
                                                <CustomTextField
                                                    enable={false}

                                                    isRequired
                                                    name="bloodType"
                                                    label="blood Type"
                                                    value={values.bloodType}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.bloodType}
                                                    touched={touched.bloodType}
                                                    width="100%"
                                                    props={{
                                                        type: "text",
                                                    }}
                                                    sx={{
                                                        backgroundColor: "#ddd",
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item lg={5} md={5} sm={6} xs={12}>
                                                <CustomTextField
                                                    enable={completeData}

                                                    isRequired
                                                    name="comorbidities"
                                                    label="comorbidities"
                                                    value={values.comorbidities}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.comorbidities}
                                                    touched={touched.comorbidities}
                                                    width="100%"
                                                    props={{
                                                        type: "text",
                                                    }}
                                                    sx={{
                                                        backgroundColor: "#ddd",
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item lg={5} md={5} sm={6} xs={12}>
                                                <CustomTextField
                                                    enable={completeData}

                                                    isRequired
                                                    name="Medication"
                                                    label="Medications"
                                                    value={values.Medication}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.Medication}
                                                    touched={touched.Medication}
                                                    width="100%"
                                                    props={{
                                                        type: "text",
                                                    }}
                                                    sx={{
                                                        backgroundColor: "#ddd",
                                                    }}
                                                />
                                            </Grid>
                                           {completeData? <Grid item lg={2} md={2} sm={6} xs={12}>
                                                <Button
                                                    color="secondary"
                                                    fullWidth
                                                    variant="contained"
                                                    disableElevation
                                                    type="submit"
                                                    sx={{ background: 'rgb(24, 29, 37)',
                                                        '&:hover':{
                                                            background: 'rgb(24, 29, 37)', 
                                                        }
                                                     }}
                                                >
                                                    Save
                                                </Button>
                                            </Grid>: null}
                                        </Grid>

                                    </Box>
                                )}
                            </Formik>
                            <Box sx={{
                                backgroundColor: "rgb(32, 37, 45)",
                                borderTopLeftRadius: '10px',
                                borderTopRightRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                width: '40%',
                                margin: '0 auto',
                                justifyContent: 'space-between',
                                padding: '0.5rem 1rem',
                                boxSizing: 'border-box',
                                position: 'fixed', bottom: '0%', left: '32vw', transform: 'translate(-50%,0%)'
                            }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{
                                        width: '1rem', aspectRatio: '1 / 1', background: 'linear-gradient(30deg, #29f19c, #02a1f9)', borderRadius: '50%',
                                        animation: 'fade-in 2s infinite',
                                        '@keyframes fade-in': {
                                            '0%': { opacity: 0.2 },
                                            '50%': { opacity: 1 },
                                            '100%': { opacity: 0.2 },
                                        },
                                    }} />
                                    <Typography sx={{ color: 'white', filter: 'opacity(1)', marginLeft: '0.5rem' }}>Complete Your Data</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                                    <Box sx={{ padding: '0.5rem', borderRadius: '4px',transition:'0.3s', backgroundColor: completeData?'#02a1f9':'rgb(32, 37, 45)', cursor: 'pointer' }} onClick={()=>setCompleteData(true)}><DescriptionRoundedIcon sx={{ color: 'white' }} /></Box>
                                    <Box sx={{ padding: '0.5rem', borderRadius: '4px', backgroundColor: 'rgb(32, 37, 45)', cursor: 'pointer' }}><BiotechRoundedIcon sx={{ color: 'white' }} /></Box>
                                    <Box sx={{ padding: '0.5rem', borderRadius: '4px', backgroundColor: 'rgb(32, 37, 45)', cursor: 'pointer' }}><RadarRoundedIcon sx={{ color: 'white' }} /></Box>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item lg={4} md={4} sm={4} xs={12}>
                        <Box sx={{
                            width: '100%', maxHeight: '96vh', minHeight: '96vh',backgroundColor: 'rgb(24, 29, 37)',
                            borderTopRightRadius: '10px',
                            borderBottomRightRadius: '10px',
                            padding: '2rem',
                            boxSizing: 'border-box',
                            overflowY:'auto'
                        }}>
                            <Formik
                                initialValues={vitalsInitialValues}
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
                                                <Header title='Consultation Request' dark />
                                            </Grid>

                                            <Grid item lg={6} md={6} sm={6} xs={12}>
                                                <CustomTextField
                                                    enable={true}
                                                    dark
                                                    isRequired
                                                    name="pulse"
                                                    label="pulse"
                                                    value={values.pulse}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.pulse}
                                                    touched={touched.pulse}
                                                    width="100%"
                                                    props={{
                                                        type: "text",
                                                    }}
                                                    sx={{
                                                        backgroundColor: 'rgb(32, 37, 45)',
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item lg={6} md={6} sm={6} xs={12}>
                                                <CustomTextField
                                                    enable={true}
                                                    dark
                                                    isRequired
                                                    name="bp"
                                                    label="blood Pressure"
                                                    value={values.bp}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.bp}
                                                    touched={touched.bp}
                                                    width="100%"
                                                    props={{
                                                        type: "text",
                                                    }}
                                                    sx={{
                                                        backgroundColor: 'rgb(32, 37, 45)',
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item lg={6} md={6} sm={6} xs={12}>
                                                <CustomTextField
                                                    enable={true}
                                                    dark
                                                    isRequired
                                                    name="respiration"
                                                    label="respiration"
                                                    value={values.respiration}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.respiration}
                                                    touched={touched.respiration}
                                                    width="100%"
                                                    props={{
                                                        type: "text",
                                                    }}
                                                    sx={{
                                                        backgroundColor: 'rgb(32, 37, 45)',
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item lg={6} md={6} sm={6} xs={12}>
                                                <CustomTextField
                                                    enable={true}
                                                    dark
                                                    isRequired
                                                    name="pso2"
                                                    label="pso2"
                                                    value={values.pso2}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.pso2}
                                                    touched={touched.pso2}
                                                    width="100%"
                                                    props={{
                                                        type: "text",
                                                    }}
                                                    sx={{
                                                        backgroundColor: 'rgb(32, 37, 45)',
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item lg={12} md={12} sm={6} xs={12}>
                                                <CustomTextField
                                                    enable={true}
                                                    dark
                                                    isRequired
                                                    name="consultationRequest"
                                                    label="consultation Request"
                                                    multiline
                                                    value={values.consultationRequest}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.consultationRequest}
                                                    touched={touched.consultationRequest}
                                                    width="100%"
                                                    props={{
                                                        type: "text",
                                                    }}
                                                    sx={{
                                                        backgroundColor: 'rgb(32, 37, 45)',
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item lg={12} md={12} sm={6} xs={12}>
                                                <Button
                                                    color="secondary"
                                                    fullWidth
                                                    variant="contained"
                                                    disableElevation
                                                    type="submit"
                                                    sx={{ background: 'linear-gradient(90deg, #29f19c, #02a1f9)' }}
                                                >
                                                    Submit
                                                </Button>
                                            </Grid>

                                        </Grid>
                                    </Box>
                                )}
                            </Formik>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box >
    )
}

export default Patient