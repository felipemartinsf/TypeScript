export class NonexistentBike extends Error {
    public readonly name = 'NonexistentBike'

    constructor() {
        super('Nonexistent Bike.')
    }
}