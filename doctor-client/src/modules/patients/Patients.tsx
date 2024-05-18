import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import Header from '../../core/components/Header'
import CustomTextField from '../../core/components/CustomTextField'
import Requests from './components/requests-table'
import Table from './components/requests-table/Table'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Data from './components/response/Data'
import { getLocalStorageDataByKey, logOut } from '../../core/services/shared-service'

const Patients = () => {
    const [currentPatient, setCurrentPatient] = useState<number>(0)
    const [userLoginedData, setUserLoginedData] = useState<any>();

    const getCurrentPatient=(currentPatient:number) => {
        setCurrentPatient(currentPatient)
    }
    useEffect(() => {
        let eventSource = new EventSource("http://localhost:4000/" + 'streaming/event')
        eventSource.onmessage = (ev) => {
            let data_json = JSON.parse(ev.data)
            console.log(ev.data)
            // setStreamedData(data_json);
            console.log(data_json)
            console.log(JSON.parse(data_json[0].requestMetadata))
        }
    }, [])
    useEffect(() => {
        let userData = getLocalStorageDataByKey("userData");
        setUserLoginedData(userData);
      }, []);

    const data = [
        {
            PID: {
                id: '15',
                name: 'John Doe',
                dateOfBirth: '19900515',
                gender: 'M',
                address: '123 Main St, City, Country',
                phone: '01211035528',
                bloodType: 'A+'
            },
            comorbidities: ['Hypertension', 'Diabetes'],
            vitals: {
                id: 'vital1',
                pulse: '72',
                bp: '120/80',
                respiration: '16',
                pso2: '98'
            },
            medications: ['medication1', 'medication2', 'medication3'],
            allergies: { id: 'allergy1', name: 'Penicillin' },
            diagnosis: { id: 'diagnosis1', name: 'Hypertension' },
            labs: { id: 'lab1', name: 'CBC', result: 'Normal' },
            imaging: {
                id: 'imaging1',
                name: 'X-Ray',
                result: 'No abnormalities detected'
            },
            consultationReqs: { id: 'consultationReq1', complaint: 'Headache' }
        },
        {
            PID: {
                id: '16',
                name: 'Abeer Tarek',
                dateOfBirth: '19900515',
                gender: 'F',
                address: '123 Main St, City, Country',
                phone: '01115732154',
                bloodType: 'A+'
            },
            comorbidities: ['Hypertension', 'Diabetes'],
            vitals: {
                id: 'vital1',
                pulse: '80',
                bp: '170/90',
                respiration: '25',
                pso2: '96'
            },
            medications: ['medication1', 'medication2', 'medication3'],
            allergies: { id: 'allergy1', name: 'Penicillin' },
            diagnosis: { id: 'diagnosis1', name: 'Hypertension' },
            labs: { id: 'lab1', name: 'CBC', result: 'Normal' },
            imaging: {
                id: 'imaging1',
                name: 'X-Ray',
                result: 'No abnormalities detected'
            },
            consultationReqs: { id: 'consultationReq1', complaint: 'Dor Bard' }
        },
    ]

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
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '2rem' }}>
                                    Hello <span style={{ fontWeight: '600', color: 'black' }}>{userLoginedData?.user?.username}</span>
                                </Typography>
                                <Box
                                    onClick={() => logOut()}
                                    sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center', fontSize: '1.2rem' }}>
                                    <Typography sx={{ fontSize: 'inherit', marginRight: '0.5rem' }}>Log Out</Typography>
                                    <LogoutRoundedIcon sx={{ fontSize: 'inherit', }} />
                                </Box>
                            </Box>
                            <Header title='Consultation Requests' />
                            <Box sx={{
                                display: "block",
                                mt: 2
                            }}>
                                {/* <Requests /> */}
                                <Table data={data} getCurrentPatient={getCurrentPatient} active={currentPatient}/>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item lg={4} md={4} sm={4} xs={12}>
                        <Box sx={{
                            width: '100%', height: '100%', backgroundColor: 'rgb(24, 29, 37)',
                            borderTopRightRadius: '10px',
                            borderBottomRightRadius: '10px',
                            padding: '2rem',
                            boxSizing: 'border-box',
                        }}>
                            <Data data={data[currentPatient]} />
                            {/* <Formik
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
                            </Formik> */}

                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default Patients