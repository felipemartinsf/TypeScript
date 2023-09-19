import { Bike } from "./bike";
import { User } from "./user";

export class Rent {
    private constructor(
        public bike: Bike,
        public user: User,
        public dateFrom: Date,
    ) {}

    static create(rents: Rent[], bike: Bike, user: User, 
                  startDate: Date): Rent {
                    let canCreate
        if(bike.avl)canCreate = false
        if (!canCreate){
            bike.avl = true;
                    return new Rent(bike, user, startDate)
        }
        throw new Error('Overlapping dates.')
    }

}

