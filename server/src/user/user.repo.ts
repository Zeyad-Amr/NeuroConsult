import { PrismaGenericRepo } from "@/shared/prisma-client/prisma-generic.repo";
import { PrismaService } from "@/shared/prisma-client/prisma.service";
import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";

@Injectable()
export class UserRepo extends PrismaGenericRepo<Prisma.UserCreateInput, User, Prisma.UserInclude> {
    constructor(private prismaService: PrismaService) {
        super('user', prismaService, {
            patient: {
                include: {
                    allergies: true,
                    diagnosis: true,
                    imaging: true,
                    labs: true,
                    vitals: true,
                    user: true,
                }
            }
        })
    }

    async getByUsername(username: string) {
        try {
            const user = await this.prismaService.user.findUnique({
                where: { username }
            })
            return user
        } catch (error) {
            throw error
        }
    }
}