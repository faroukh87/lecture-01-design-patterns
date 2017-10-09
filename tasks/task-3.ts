// #Task 3 - 'Facade' pattern

// Apply Chain of resp pattern

class Apartments {
    private age: number;

    constructor(age) {
        this.age = age;
    }

    getApartment(): string {
        return this.age > 18 ? 'adult' : 'children';
    }
}

interface ISkis {
    color: string;
    type: string;
    length: number;
}

class Skiing {
    private height: number;
    private gender: string;
    private age: number;

    constructor(height, gender, age) {
        this.height = height;
        this.gender = gender;
        this.age = age;
    }

    getSkis(): ISkis {
        const color: string = this.gender === 'male' ? 'blue' : 'pink';
        const type: string = this.age > 18 ? 'adult' : 'children';
        const length: number = this.height > 165 ? 140 : 90;
        return {color, type, length};
    }
}

class SkiElevator {
    private age: number;

    constructor(age) {
        this.age = age;
    }

    getTicket(): string {
        return this.age > 18 ? 'adult' : 'children';
    }
}

class Assistant {
    private apartments: Apartments;
    private skiing: Skiing;
    private skiElevator: SkiElevator;

    constructor(height, age, gender) {
        this.skiing = new Skiing(height, gender, age);
        this.apartments = new Apartments(age);
        this.skiElevator = new SkiElevator(age);
    }

    rentSkis(): void {
        console.log('Rented skis: ', this.skiing.getSkis());
    }

    rentApartment(): void {
        console.log(`Rented apartment for: ${this.apartments.getApartment()}`);
    }

    buyTicket(): void {
        console.log(`Bought a ticket: ${this.skiElevator.getTicket()}`);
    }
}

const assistant = new Assistant(182, 26, 'male');

assistant.rentSkis();
assistant.rentApartment();
assistant.buyTicket();

/*
 * Example output:
 *
 * Rented skis: {color: "blue", type: "adult", length: 140}
 * Delivery will be by Plane
 * Bought a ticket: adult
 *
 */
