export function parseHL7ToJSON(hl7Message: string): any {
    const segments = hl7Message.split('\n').filter(segment => segment.trim() !== '');
    const json: any = {};

    segments.forEach(segment => {
        const fields = segment.split('|');
        const segmentName = fields[0];

        if (segmentName === 'MSH') {
            // Parse MSH segment if needed
        } else if (segmentName === 'PID') {
            json['PID'] = this.parsePID(fields);
        } else if (segmentName === 'COM') {
            json['comorbidities'] = this.parseCustomSegment(fields);
        } else if (segmentName === 'VIT') {
            json['vitals'] = this.parseVitals(fields);
        } else if (segmentName === 'MED') {
            json['medications'] = this.parseMedications(fields);
        } else if (segmentName === 'ALG') {
            json['allergies'] = this.parseAllergies(fields);
        } else if (segmentName === 'DG') {
            json['diagnosis'] = this.parseDiagnosis(fields);
        } else if (segmentName === 'LAB') {
            json['labs'] = this.parseLabs(fields);
        } else if (segmentName === 'IMG') {
            json['imaging'] = this.parseImaging(fields);
        } else if (segmentName === 'CON') {
            json['consultationReqs'] = this.parseConsultationRequests(fields);
        }
        // Add parsing for other segments here if needed
    });

    return json;
}

function convertJSONToHL7(json: any): string {
    let hl7Message = '';

    // Construct MSH segment
    hl7Message += 'MSH|^~\\&|Sender|SenderFacility|Receiver|ReceiverFacility|' + new Date().toISOString().replace(/[-:.]/g, '').slice(0, -5) + '||ADT^A08|MSG000001|P|2.5|\n';

    // Construct PID segment
    const pidJson = json['PID'];
    hl7Message += 'PID|1|' + (pidJson['id'] || '') + '|||' + (pidJson['name'] || '') + '||' + (pidJson['dateOfBirth'] || '') + '|' + (pidJson['gender'] || '') + '|||' + (pidJson['address'] || '') + '||' + (pidJson['phone'] || '') + '|' + (pidJson['bloodType'] || '') + '|\n';

    // Construct COM segment if comorbidities exist
    const comorbidities = json['comorbidities'];
    if (comorbidities && comorbidities.length > 0) {
        hl7Message += 'COM|';
        hl7Message += comorbidities.join('|');
        hl7Message += '|\n';
    }

    // Construct other segments if needed
    const vitals = json['vitals'];
    if (vitals) {
        hl7Message += `VIT|1|${vitals.id}|${vitals.pulse}|${vitals.bp}|${vitals.respiration}|${vitals.pso2}|\n`;
    }

    const medications = json['medications'];
    if (medications) {
        hl7Message += `MED|1|${medications.id}|${medications.medication}|${medications.dose}|${medications.route}|${medications.time}|\n`;
    }

    const allergies = json['allergies'];
    if (allergies) {
        hl7Message += `ALG|1|${allergies.id}|${allergies.name}|\n`;
    }

    const diagnosis = json['diagnosis'];
    if (diagnosis) {
        hl7Message += `DG|1|${diagnosis.id}|${diagnosis.name}|\n`;
    }

    const labs = json['labs'];
    if (labs) {
        hl7Message += `LAB|1|${labs.id}|${labs.name}|${labs.result}|\n`;
    }

    const imaging = json['imaging'];
    if (imaging) {
        hl7Message += `IMG|1|${imaging.id}|${imaging.name}|${imaging.result}|\n`;
    }

    const consultationReqs = json['consultationReqs'];
    if (consultationReqs) {
        hl7Message += `CON|1|${consultationReqs.id}|${consultationReqs.complaint}|${consultationReqs.result}|\n`;
    }

    return hl7Message;
}

export function parsePID(fields: string[]): any {
    const pidJson: any = {};
    pidJson['id'] = fields[2] || '';
    pidJson['name'] = fields[5] || '';
    pidJson['dateOfBirth'] = fields[7] || '';
    pidJson['gender'] = fields[8] || '';
    pidJson['address'] = fields[11] || '';
    pidJson['phone'] = fields[13] || '';
    pidJson['bloodType'] = fields[15] || '';
    return pidJson;
}

export function parseCustomSegment(fields: string[]): string[] {
    // Remove segment name and filter out empty fields
    return fields.slice(1).filter(field => field !== '');
}

export function parseVitals(fields: string[]): any {
    return {
        id: fields[2],
        pulse: fields[3],
        bp: fields[4],
        respiration: fields[5],
        pso2: fields[6]
    };
}

export function parseMedications(fields: string[]): any {
    return {
        id: fields[2],
        medication: fields[3],
        dose: fields[4],
        route: fields[5],
        time: fields[6]
    };
}

export function parseAllergies(fields: string[]): any {
    return {
        id: fields[2],
        name: fields[3]
    };
}

export function parseDiagnosis(fields: string[]): any {
    return {
        id: fields[2],
        name: fields[3]
    };
}

export function parseLabs(fields: string[]): any {
    return {
        id: fields[2],
        name: fields[3],
        result: fields[4]
    };
}

export function parseImaging(fields: string[]): any {
    return {
        id: fields[2],
        name: fields[3],
        result: fields[4]
    };
}

export function parseConsultationRequests(fields: string[]): any {
    return {
        id: fields[2],
        complaint: fields[3],
        result: fields[4]
    };
}

// Example JSON
const jsonExample = {
    "PID": {
        "id": "15",
        "name": "John Doe",
        "dateOfBirth": "19900515",
        "gender": "M",
        "address": "123 Main St, City, Country",
        "phone": "1234567890",
        "bloodType": "O+"
    },
    "comorbidities": ["Hypertension", "Diabetes"],
    "vitals": {
        "id": "vital1",
        "pulse": 72,
        "bp": "120/80",
        "respiration": 16,
        "pso2": 98
    },
    "medications": {
        "id": "medication1",
        "medication": "Aspirin",
        "dose": "75mg",
        "route": "Oral",
        "time": "Once daily"
    },
    "allergies": {
        "id": "allergy1",
        "name": "Penicillin"
    },
    "diagnosis": {
        "id": "diagnosis1",
        "name": "Hypertension"
    },
    "labs": {
        "id": "lab1",
        "name": "CBC",
        "result": "Normal"
    },
    "imaging": {
        "id": "imaging1",
        "name": "X-Ray",
        "result": "No abnormalities detected"
    },
    "consultationReqs": {
        "id": "consultationReq1",
        "complaint": "Headache",
        "result": "No abnormalities detected"
    }
};

// // Convert JSON to HL7
// const hl7FromJSON = HL7Parser.convertJSONToHL7(jsonExample);
// console.log('HL7 from JSON:', hl7FromJSON);

// // Parse HL7 to JSON
// const jsonFromHL7 = HL7Parser.parseHL7ToJSON(hl7FromJSON);
// console.log('JSON from HL7:', jsonFromHL7);


