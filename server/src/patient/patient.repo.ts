import { PrismaGenericRepo } from "@/shared/prisma-client/prisma-generic.repo";
import { PrismaService } from "@/shared/prisma-client/prisma.service";
import { Injectable } from "@nestjs/common";
import { Patient, Prisma } from "@prisma/client";

@Injectable()
export class PatientRepo extends PrismaGenericRepo<Prisma.PatientCreateInput, Patient, Prisma.PatientInclude> {
    constructor(private prismaService: PrismaService) {
        super('patient', prismaService, {
            allergies: true,
            diagnosis: true,
            imaging: true,
            labs: true,
            medications: true,
            vitals: true,
            user: true,
        })
    }
}