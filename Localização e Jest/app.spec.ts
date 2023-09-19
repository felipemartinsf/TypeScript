
import { App } from "./app"
import { Bike } from "./bike";
import { location } from "./location";
import {describe, expect,it} from '@jest/globals';



describe("App",()=>{
    it("Should throw an error", ()=>{
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike', 1234, 1234, 100.0, 'My bike', 5, [])
        const Location = new location(1,3)
        app.registerBike(bike)
        expect(()=>app.moveBikeTo('231',Location)).toThrowError("This bike does not exist")
    })
})