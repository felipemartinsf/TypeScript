export class bicicleta{
    id:number
    private fim:Date
    public alugada: boolean = false
    constructor(id:number,fim:Date){
        this.id = id
        this.fim = fim
        this.alugada = true
    }
}