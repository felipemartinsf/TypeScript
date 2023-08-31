import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    findUser(email: string): User {
        return this.users.find(user => user.email === email)
    }

    registerUser(user: User): void {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.')
            }
        }
        this.users.push(user)
    }

    registerBike(bike:Bike):void{
        for(const rBikes of this.bikes){
            if(rBikes.id === bike.id){
            throw new Error('Duplicate bike')
            }
        }
        this.bikes.push(bike)
    }
    removeUser(email:string):void{
    let i = this.users.findIndex(u =>u.email === email)
    this.users.splice(i,1)
    if(i === -1)throw new Error ('Not found your email')
    }

    rentBike(id:string, email:string,dateStart:Date,dateEnd:Date):Rent{
    let a = this.bikes.find(i=>i.id===id)
    let b = this.users.find(j=>j.email === email )
    Rent.create(this.rents,a,b,dateStart,dateEnd)
    }




}