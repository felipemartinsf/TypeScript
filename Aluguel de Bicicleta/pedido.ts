import {bicicleta}from "./bicicleta"
export class pedido{
    bicicleta:number
    dataInicio:Date
    dataFim:Date
    cpf:string
    constructor(bicicleta:number,cpf:string,dataInicio:Date,dataFim:Date){
        this.bicicleta = bicicleta
        this.cpf  = cpf
        this.dataInicio = dataInicio
        this.dataFim  = dataFim
    }
}

export function verificaAluguel(id:number,id2:number, alugada:boolean){
    if(alugada == true  && id == id2  ){
        return true 
    } 
    else return false
}
export function verificaReserva(dataFim:Date,dataInicio:Date){
    if(dataInicio<dataFim) return false
}
