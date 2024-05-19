import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import Header from '../../../../core/components/Header'
import DataCard from './DataCard'
import DoctorResponce from './DoctorResponse';

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
const Data = ({ data }: { data: any }) => {

    return (
        <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <DataCard header='Vitals'>
                    <Typography sx={{ color: 'white', display: 'flex', justifyContent: 'space-between ' }}>
                        pulse <span style={{ color: '#29f19c' }}>{data?.vitals?.pulse}</span>
                    </Typography>
                    <Typography sx={{ color: 'white', display: 'flex', justifyContent: 'space-between ' }}>
                        bp <span style={{ color: '#29f19c' }}>{data?.vitals?.bp}</span>
                    </Typography>
                    <Typography sx={{ color: 'white', display: 'flex', justifyContent: 'space-between ' }}>
                        respiration <span style={{ color: '#29f19c' }}>{data?.vitals?.respiration}</span>
                    </Typography>
                    <Typography sx={{ color: 'white', display: 'flex', justifyContent: 'space-between ' }}>
                        pso2 <span style={{ color: '#29f19c' }}>{data?.vitals?.pso2}</span>
                    </Typography>
                </DataCard>

            </Grid>
            {/* <Grid item lg={6} md={6} sm={6} xs={6}>
                <DataCard header='medications'>
                    {data.medications.map((medication, idx) => (

                        <Typography key={idx} sx={{ color: 'white', display: 'flex', justifyContent: 'space-between ' }}>
                            {medication.toLocaleUpperCase()}
                        </Typography>
                    ))
                    }
                </DataCard>
            </Grid> */}
            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 4 }}>
                <DataCard header='complaint' >
                    <Typography sx={{ color: 'white', display: 'flex', justifyContent: 'space-between ' }}>
                        {data?.consultationReqs?.complaint}
                    </Typography>
                </DataCard>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 4 }}>
            { data.consultationReqs &&  <DoctorResponce consultationReqsData={data?.consultationReqs} patientId={data.consultationReqs.id} />}
            </Grid>
        </Grid>
    )
}

export default Data