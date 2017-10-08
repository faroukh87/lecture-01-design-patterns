// #Task 1 - 'Adapter' pattern

class UnitedStatesSocket {
    connect(cb: Function): void {
        cb();
    }
}

class EuroSocketConfig {
    voltage = 220;
    hz = 60;
}

class EuroSocketAdapter {
    private socketConfig: EuroSocketConfig;
    private adaptable: UnitedStatesSocket;

    constructor() {
        this.socketConfig = new EuroSocketConfig();
        this.adaptable = new UnitedStatesSocket();
    }

    connect(): void {
        this.adaptable.connect(() => {
            this.setEuroConfiguration();
            console.log('Adapter successfully connected');
        });
    }

    private setEuroConfiguration() {
        console.log(`used: ${this.socketConfig.voltage}v`);
        console.log(`used: ${this.socketConfig.hz}hz`);
    }
}

const euroSocket = new EuroSocketAdapter();
euroSocket.connect();

/*
 * Example output:
 *
 * used: 220v
 * used: 60hz
 * Adapter successfully connected
 *
 */