import { BikeRepo } from "../../ports/bike-repo";
import { Bike } from "../../bike";
import prisma from "./db"

export class PrismaBikeRepo implements BikeRepo {

    async find(id:string): Promise<Bike> {
        return await prisma.user.findFirst({
            where: { id }
        })
    }

    async add(bike:Bike): Promise<string> {
        const addedBike = await prisma.user.create({
            data: { ...bike }
        })
        return addedBike.id
    }

    async remove(id: string): Promise<void> {
        await prisma.user.delete({
            where: { id }
        })
    }

    async list(): Promise<Bike[]> {
        return await prisma.user.findMany({})
    }

    async update(id:string, bike:Bike): Promise<void>{
        return await prisma.user.update({
            where: { id},
            data: { bike},
          })
    }
    
}