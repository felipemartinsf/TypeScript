import { PrismaUserRepo } from "../../../src/external/database/prisma-user-repo"
import { PrismaBikeRepo } from "../../../src/external/database/prisma-bike-repo"
import { User } from "../../../src/user"
import prisma from "../../../src/external/database/db"
import { Bike } from "../../../src/bike"
import { Location } from "../../../src/location"

describe('PrismaUserRepo', () => {
    beforeEach(async () => {
        await prisma.user.deleteMany({})
        await prisma.bike.deleteMany({})
    })

    afterAll(async () => {
        await prisma.user.deleteMany({})
        await prisma.bike.deleteMany({})
    })

    it('adds a user in the database', async () => {
        const userToBePersisted = new User(
            'test user',
            'test@mail.com',
            '1234'
        )
        const repo = new PrismaUserRepo()
        const userId = await repo.add(userToBePersisted)
        expect(userId).toBeDefined()
        const persistedUser = await repo.find(userToBePersisted.email)
        expect(persistedUser.name).toEqual(
            userToBePersisted.name
        )
    })

    it('adds a bike in the database',async () => {
        const bikeToBePersisted = new Bike(
            'caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, []
        )
        const repo = new PrismaBikeRepo()
        const bikeId = await repo.add(bikeToBePersisted)
        expect(bikeId).toBeDefined()
    })

    it('removes a user from the database', async () => {
        const userToBePersisted = new User(
            'test user',
            'test@mail.com',
            '1234'
        )
        const repo = new PrismaUserRepo()
        await repo.add(userToBePersisted)
        await repo.remove('test@mail.com')
        const removedUser = await repo.find('test@mail.com')
        expect(removedUser).toBeNull()
    })

    it('removes a bike from the database', async () => {
        const bikeToBePersisted = new Bike(
            'caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [], true, new Location(0.0,0.0),'2'
        )

        const repo = new PrismaBikeRepo()
        await repo.add(bikeToBePersisted)
        await repo.remove('2')
        const removedBike = await repo.find('2')
        expect(removedBike).toBeNull()
    })

    it('lists users in the database', async () => {
        const user1 = new User('user1', 'user1@mail.com', '1234')
        const user2 = new User('user2', 'user2@mail.com', '1234')
        const repo = new PrismaUserRepo()
        await repo.add(user1)
        await repo.add(user2)
        const userList = await repo.list()
        expect(userList.length).toEqual(2)
    })
    it('check the update of the database',async () => {
        const bikeToBePersisted = new Bike(
            'caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, []
        )
        const repo = new PrismaBikeRepo()
        await repo.add(bikeToBePersisted)
        const newId = '4'
        await repo.update(newId,bikeToBePersisted)
        expect(bikeToBePersisted.id).toEqual('4')
    })
})