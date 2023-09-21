import { Bike } from "./bike";
import { location } from "./location";
import { Rent } from "./rent";
import { User } from "./user";
import { UserNotFoundError } from "./errors/user-error";
import { BikeNotFound } from "./errors/notFound-bike-error";
import {hash} from "bcrypt"
import {compare } from "bcrypt"

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    findUser(email: string) { //retorna o usuário procurado
        const user = this.users.find(user => user.email === email)
        if (!user) throw new UserNotFoundError()
        return user
    }

    async registerUser(user: User) { //registra um usuário no users e criptografa a senha
        for (const rUser of this.users) {
            user.password = await hash(user.password, 10)
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.')
            }
        }
        this.users.push(user)
    }

    registerBike(bike:Bike):void{ //registra a bike e verifica se tem outra com id igual no sistema
        for(const rBikes of this.bikes){
            if(rBikes.id === bike.id){
            throw new Error('Duplicate bike')
            }
        }
        this.bikes.push(bike)
    }

    removeUser(email:string):void{  //remove o usuario e se ele não existir nao acontece nada
    let i = this.users.findIndex(u =>u.email === email)
    this.users.splice(i,1)
    if(i === -1)throw new Error ('Did not found your email')
    }

    rentBike(id:string, email:string,dateStart:Date){ //cria o rent
    let a = this.bikes.find(i=>i.id===id)
    if(a===undefined) throw new Error ("This id was not found")
    let b = this.users.find(j=>j.email === email )
    if(b===undefined) throw new Error ("This email was not found")
    let c = Rent.create(this.rents,a,b,dateStart)
    this.rents.push(c)
    }

    returnBike(id:string){ //retorna a bike que foi usada
    let a = this.bikes.find(i=>i.id===id)
    let b= this.rents.find(j=>j.bike===a)
    if(b===undefined) throw new Error('Essa bike não está registrada aqui')
    let valor = 200;
    let time = (new Date().getTime() - b.dateFrom.getTime())//new date seria a data atual quando a pessoa retornou
    return time*valor;
    }

    listUser():User[]{
        return this.users
    }
    listBike():Bike[]{
        return this.bikes
    }
    listRent():Rent[]{
        return this.rents
    }

    async authenticateUser(email:string,password:string){ //verifica se a senha esta certa
    let a = this.users.find(i=>i.email === email)
    if(a===undefined) throw new Error('Do not exist in our system')
    const isValid = await compare(a.password,password)
    if(isValid) console.log('Senha correta')
    else console.log('Senha incorreta')
    }
     moveBikeTo(bikeId: string, location:location) :void {
        const bike = this.findBike(bikeId)
        bike.loc.latitude = location.latitude
        bike.loc.longitude = location.longitude
    }
    findBike(bikeId: string): Bike {
        const bike = this.bikes.find(bike => bike.id === bikeId)
        if (!bike) throw new BikeNotFound()
        return bike
    }
}
