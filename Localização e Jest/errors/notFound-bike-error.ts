export class BikeNotFound extends Error{
    public readonly  name = 'BikeNotFound'
    constructor(){
        super('The bike does not exist')
    }
}