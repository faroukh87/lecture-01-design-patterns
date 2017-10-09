// #Task 4 - 'Decorator' pattern

// Why do you think that it is decorator?

class Ship {
    info() {
        console.log('Delivery will be by Ship');
    }
}

class Car {
    info() {
        console.log('Delivery will be by Car');
    }
}

class LogisticsCompany {
    deliverySchema: Object;

    constructor() {
        this.deliverySchema = {
            car: Car,
            ship: Ship
        };
    }

    delivery(type) {
        return new this.deliverySchema[type]();
    }
}

const d1 = new LogisticsCompany();
d1.delivery('car').info();

/*
 * Example output:
 *
 * Delivery will be by Car
 *
 */

class Plane {
    info() {
        console.log('Delivery will be by Plane');
    }
}

class LogisticsCompanyDecorator {
    private wrapped: LogisticsCompany;

    constructor() {
        this.wrapped = new LogisticsCompany();
    }

    delivery(type) {
        if (type !== 'plane') {
            return this.wrapped.delivery(type);
        }
        return new Plane();
    }
}

const d2 = new LogisticsCompanyDecorator();
d2.delivery('ship').info();
d2.delivery('plane').info();

/*
 * Example output:
 *
 * Delivery will be by Ship
 * Delivery will be by Plane
 *
 */
