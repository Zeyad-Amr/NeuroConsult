import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
interface Patient {
    PID: {
        id: string;
        name: string;
        dateOfBirth: string;
        gender: string; // Assuming gender can be either 'M' or 'F'
        address: string;
        phone: string;
        bloodType: string; // You can specify the blood type format here if needed
    };
    comorbidities: string[];
    vitals: {
        id: string;
        pulse: string;
        bp: string;
        respiration: string;
        pso2: string;
    };
    medications: string[];
    allergies: {
        id: string;
        name: string;
    };
    diagnosis: {
        id: string;
        name: string;
    };
    labs: {
        id: string;
        name: string;
        result: string;
    };
    imaging: {
        id: string;
        name: string;
        result: string;
    };
    consultationReqs: {
        id: string;
        complaint: string;
    };
}
const TableRow = ({ data, idx, active, getCurrentPatient }: { data: any, idx: number, active: number, getCurrentPatient: (idx: number) => void }) => {

    function calculateAge(birthDateString : string) {
        const birthDate = new Date(birthDateString);
        
        if (isNaN(birthDate.getTime())) {
            return null;
        }
    
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
    
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
    
        return age;
    }

    return (
        <Grid container spacing={1} sx={{ height: '3.2rem', mb: 1, cursor: 'pointer' }} onClick={() => getCurrentPatient(idx)}>
            <Grid item lg={5} md={5} sm={5} xs={5}>

                <Box sx={{
                    borderRadius: '5px', backgroundColor: active === idx ? '#aaa' : '#ccc', height: '100%', display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Typography sx={{ color: 'black' }}>{data.ConsultationRequest.consultationReqs.patientName}</Typography>
                </Box>
            </Grid>
            <Grid item lg={2} md={2} sm={2} xs={2}>
                <Box sx={{
                    borderRadius: '5px', backgroundColor: active === idx ? '#aaa' : '#ccc', height: '100%', display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Typography sx={{ color: 'black' }}>{calculateAge(data.ConsultationRequest.consultationReqs.patientBirthDate)}</Typography>
                </Box>
            </Grid>
            <Grid item lg={2} md={2} sm={2} xs={2}>
                <Box sx={{
                    borderRadius: '5px', backgroundColor: active === idx ? '#aaa' : '#ccc', height: '100%', display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Typography sx={{ color: 'black' }}>{data.ConsultationRequest.consultationReqs.patientGender}</Typography>
                </Box>
            </Grid>
            {/* <Grid item lg={3} md={3} sm={3} xs={3}>
                <Box sx={{
                    borderRadius: '5px', backgroundColor: active === idx ? '#aaa' : '#ccc', height: '100%', display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Typography sx={{ color: 'black' }}>{data.PID.phone}</Typography>
                </Box>
            </Grid> */}
        </Grid>
    )
}

export default TableRow