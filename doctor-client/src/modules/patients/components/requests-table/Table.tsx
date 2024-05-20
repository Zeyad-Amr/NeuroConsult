import React from 'react'
import TableRow from './TableRow'
import HeaderRow from './HeaderRow'
import PaginationComponent from './PaginationComponent';

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

const Table = ({ data, active, getCurrentPatient }: { data: any[], active: number, getCurrentPatient: (idx: number) => void }) => {

    return (
        <div>
            <HeaderRow />
            {data.map((data, idx) => (
                <TableRow idx={idx} data={data} key={idx} getCurrentPatient={getCurrentPatient} active={active}/>
            )
            )}
        </div>
    )
}

export default Table