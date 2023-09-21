export class UserNotFoundError extends Error {
    public readonly name = 'UserNotFoundError'
    constructor(){
        super('Unavailable bike.')
    }
}