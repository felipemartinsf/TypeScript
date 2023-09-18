"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rent = void 0;
var Rent = /** @class */ (function () {
    function Rent(bike, user, dateFrom) {
        this.bike = bike;
        this.user = user;
        this.dateFrom = dateFrom;
    }
    Rent.create = function (rents, bike, user, startDate) {
        var canCreate;
        if (bike.avl)
            canCreate = false;
        if (!canCreate) {
            bike.avl = true;
            return new Rent(bike, user, startDate);
        }
        throw new Error('Overlapping dates.');
    };
    return Rent;
}());
exports.Rent = Rent;
