import axios, { AxiosRequestHeaders } from 'axios';
import { Economy } from './economy';
import { Incentive } from './incentive';

// tops-chain sidecar url: https://topster-chain-sidecar-dev.deeper.network/
export class Sidecar {
    readonly economy: Economy;
    readonly incentive: Incentive;

    constructor(sideCarURL: string, timeoutMs: number = 10000, deviceId: string = '') {
        const headers: AxiosRequestHeaders = { 'Content-Type': 'application/json' }
        if (deviceId) {
            headers['X-Device-Id'] = deviceId;
        }
        const client = axios.create({
            baseURL: sideCarURL,
            timeout: timeoutMs,
            headers,
            responseType: 'json',
        });

        this.economy = new Economy(client);
        this.incentive = new Incentive(client);
    }
}