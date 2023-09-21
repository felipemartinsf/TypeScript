
import { App } from "./app"
import { Bike } from "./bike";
import { location } from "./location";
import { User } from "./user";
import {UserNotFoundError} from "./errors/user-error"
import { UnavailableBikeError } from "./errors/Unavailable-bike-error";
import {describe, expect,it} from '@jest/globals';
import { BikeNotFound } from "./errors/notFound-bike-error";



describe("App",()=>{

   

    it('should be able to move a bike to a specific location', () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const newYork = new location(1231,132131)
        app.moveBikeTo('1', newYork)
        expect(bike.loc.latitude).toEqual(newYork.latitude)
        expect(bike.loc.longitude).toEqual(newYork.longitude)
    })

    it('should throw an exception when trying to move an unregistered bike', () => {
        const app = new App()
        const newYork = new location(13213,312321)
        expect(() => {
            app.moveBikeTo('fake-id', newYork)
        }).toThrow(BikeNotFound)
    })

    it('should correctly handle a bike rent', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        app.rentBike(bike.id, user.email, new Date())
        expect(app.rents.length).toEqual(1)
        expect(app.rents[0].bike.id).toEqual(bike.id)
        expect(app.rents[0].user.email).toEqual(user.email)
        expect(bike.available).toBeFalsy()
    })

    it('should throw unavailable bike when trying to rent with an unavailable bike', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        app.rentBike(bike.id, user.email, new Date())
        expect(() => {
            app.rentBike(bike.id, user.email,new Date())
        }).toThrow(UnavailableBikeError)
    })

    it("Should throw an error when trying to move a bike that does not exist", ()=>{
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike', 1234, 1234, 100.0, 'My bike', 5, [])
        const Location = new location(1,3)
        app.registerBike(bike)
        expect(()=>app.moveBikeTo('231',Location)).toThrowError("This bike does not exist")
    })

    it('should remove a user',async ()=>{
        const app = new App()
        const user = new User('Pedro','jorge@mail.com','2772')
        await app.registerUser(user)
        app.removeUser(user.email)
        expect(()=>{app.findUser(user.email)}).toThrowError(UserNotFoundError)
    })

    it('should register a user',async ()=>{
        const app = new App()
        const user = new User('Marcelo','blabla@mail.com','1313')
        await app.registerUser(user)
        expect(app.users[0].email).toEqual(user.email)

    })
   
})