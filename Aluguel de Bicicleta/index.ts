import { bicicleta } from "./bicicleta";
import {cliente}from "./cliente"
import{pedido} from "./pedido"
import { verificaAluguel } from "./pedido";
import { verificaReserva } from "./pedido";
let cpf = '44505875723'
let nome = 'Isabella  martins'
let id  = 1 //numero da bicicleta escolhida
let ini  =  new Date(2023,3,19)
let fim  =  new Date(2024,3,19)
let cpf2 = '32132132113'
let nome2 = 'Felipe  schoneborn'
let id2  = 2 //numero da bicicleta escolhida
let ini2  = new Date(2021,4,2)
let fim2  = new Date(2024,3,19)
let cliente1 = new cliente(cpf,nome)
let cliente2 = new cliente(cpf2,nome2)
let pedido1 = new pedido(id,cpf,ini,fim)
let pedido2 = new pedido(id2,cpf2,ini2,fim2)
let bicicleta1 = new bicicleta(id,fim)
let bicicleta2 = new bicicleta(id2,fim2)
if(verificaReserva(fim,ini2)){
console.log("Essa reserva nao pode ser reservada")
}
if(verificaAluguel(id,id2,bicicleta1.alugada)){
console.log("Essa bicicleta já foi alugada :(")
}
