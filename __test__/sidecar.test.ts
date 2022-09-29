import {Sidecar} from '../src/sidecar';

test('can burn ezd', async () => {
    let testSideCar = new Sidecar('https://topster-chain-sidecar-dev.deeper.network');
    let val = await testSideCar.economy.burnedEzd('5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY');
    expect(val).toBe('0');
});