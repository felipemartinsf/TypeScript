import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    findUser(email: string) {
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
    if(i === -1)throw new Error ('Did not found your email')
    }

    rentBike(id:string, email:string,dateStart:Date,dateEnd:Date){
    let a = this.bikes.find(i=>i.id===id)
    if(a===undefined) throw new Error ("This id was not found")
    let b = this.users.find(j=>j.email === email )
    if(b===undefined) throw new Error ("This email was not found")
    let c = Rent.create(this.rents,a,b,dateStart,dateEnd)
    this.rents.push(c)
    }

    returnBike(dateReturned2:Date,id:string){
    let a = this.bikes.find(i=>i.id===id)
    let b= this.rents.find(j=>j.bike===a)
    if(b===undefined) throw new Error('Essa bike não está registrada aqui')
    b.dateReturned = dateReturned2
    if(dateReturned2>b.dateTo) console.log('There is  a late fee that you must pay')
    else console.log('Thank you for using our bikes')
    }



}