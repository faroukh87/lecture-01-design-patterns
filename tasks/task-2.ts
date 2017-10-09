// #Task 2 - 'Observer' pattern

// Where is Subject, Observer and event here? 

interface ISubscriber {
    bet: number;
    score: number;
    gambler: Gambler;
}

class Games {
    fighting: Array<ISubscriber> = [];
    races: Array<ISubscriber> = [];
    football: Array<ISubscriber> = [];
}

class Bookmaker {
    private subscribers: Games;

    constructor() {
        this.subscribers = new Games(); // instance can't be from plural
    }

    subscribe(game: string, publisher: ISubscriber) {
        this.subscribers[game].push(publisher);
    }

    startGame(game: string) {
        setTimeout(() => {
            const gameResult: number = Math.floor(Math.random() * (5 - 1)) + 1;
            this.publish(game, gameResult);
        }, 2500);
    }

    private publish(game: string, gameResult: number) {
        this.subscribers[game].forEach((subscriber: ISubscriber) => {
            const result: boolean = subscriber.score === gameResult;
            const notification: string = this.getNotification(result, subscriber.bet, game);
            subscriber.gambler.notify(notification);
        });
    }

    private getNotification(result, bet, game): string {
        return result ? `Won $${bet * 4} - [${game}]` : `Lose $${bet} - [${game}]`;
    }
}

class Gambler {
    private id: string;

    constructor() {
        this.id = this.getGamblerId();
    }

    notify(result: string): void {
        console.log(`${this.id}: ${result}`);
    }

    private getGamblerId(): string {
        return `#gambler-${Math.floor(Math.random() * 1000)}`;
    }
}

const bookmaker = new Bookmaker();

const g1 = new Gambler();
const g2 = new Gambler();
const g3 = new Gambler();
const g4 = new Gambler();
const g5 = new Gambler();

bookmaker.subscribe('fighting', {bet: 140, score: 1, gambler: g1});
bookmaker.subscribe('races', {bet: 99, score: 3, gambler: g2});
bookmaker.subscribe('races', {bet: 12, score: 1, gambler: g3});
bookmaker.subscribe('football', {bet: 43, score: 5, gambler: g4});
bookmaker.subscribe('football', {bet: 900, score: 4, gambler: g5});

bookmaker.startGame('fighting');
bookmaker.startGame('races');
bookmaker.startGame('football');

/*
 * Example output:
 *
 * #gambler-694: Won $560 - [fighting]
 * #gambler-571: Won $396 - [races]
 * #gambler-927: Lose $12 - [races]
 * #gambler-626: Lose $43 - [football]
 * #gambler-802: Won $3600 - [football]
 *
 */
