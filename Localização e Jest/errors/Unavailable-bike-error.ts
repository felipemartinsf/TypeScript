export class UnavailableBikeError extends Error {
    public readonly name = 'UnavailableBikeError' //readonly significa que esse atributo é so pra leitura

    constructor() {
        super('Unavailable bike.')
    }
}