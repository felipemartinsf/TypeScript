export class UserWithRentError extends Error {
    public readonly name = 'UserWithRentError'

    constructor() {
        super('User still has a rent.')
    }
}