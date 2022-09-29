import {Sidecar} from '../src/sidecar';
import { Keyring } from '@polkadot/api';
import {cryptoWaitReady} from '@polkadot/util-crypto';

beforeAll(async () => {
    await cryptoWaitReady();
});

test('can query ezd', async () => {
    let testSideCar = new Sidecar('https://topster-chain-sidecar-dev.deeper.network');
    let val = await testSideCar.economy.burnedEzd('5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY');
    expect(val).toBe('0');
});

test('can burn', async () => {
    const keyring = new Keyring({ type: 'sr25519' });
    const alice = keyring.addFromUri('//Alice');

    let testSideCar = new Sidecar('https://topster-chain-sidecar-dev.deeper.network', 60000);
    let txHash = await testSideCar.economy.burnEzdForWork(alice, '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty', '5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y', '1000000000000000000');
    expect(txHash).toHaveLength(66);
});