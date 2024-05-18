import { PrismaGenericRepo } from "@/shared/prisma-client/prisma-generic.repo";
import { PrismaService } from "@/shared/prisma-client/prisma.service";
import { Injectable } from "@nestjs/common";
import { Patient, Prisma } from "@prisma/client";
import { UpdatePatientDto } from "./dto/update-patient.dto";

@Injectable()
export class PatientRepo extends PrismaGenericRepo<Prisma.PatientCreateInput, Patient, Prisma.PatientInclude> {
    constructor(private prismaService: PrismaService) {
        super('patient', prismaService, {
            allergies: true,
            diagnosis: true,
            imaging: true,
            labs: true,
            vitals: true,
            user: true,
        })
    }

    async addMedicalData(id: string, item: UpdatePatientDto) {
        try {
            const patient = await this.prismaService.patient.update({
                where: { id },
                data: {
                    comorbidities: item.comorbidities ?? undefined,
                    allergies: item.allergies ? {
                        create: {
                            ...item.allergies,
                        }
                    } : undefined,
                    diagnosis: item.diagnosis ? {
                        create: {
                            ...item.diagnosis
                        }
                    } : undefined,
                    medications: item.medications ?? undefined,
                    vitals: item.vitals ? {
                        create: {
                            ...item.vitals
                        }
                    } : undefined,
                    labs: item.labs ? {
                        create: {
                            ...item.labs
                        }
                    } : undefined,
                    imaging: item.imaging ? {
                        create: {
                            ...item.imaging
                        }
                    } : undefined,

                },
                include: this.includesObj
            })
            return patient
        } catch (error) {
            throw error
        }
    }
}