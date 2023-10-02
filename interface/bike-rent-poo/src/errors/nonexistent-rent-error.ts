export class RentNotFound extends Error {
    public readonly name = 'RentNotFound'

    constructor() {
        super('Nonexistent Rent.')
    }
}
