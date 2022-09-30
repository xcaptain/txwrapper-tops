import { Base } from './base';
import { IKeyringPair } from '@polkadot/types/types';
import * as topsMethods from '../methods';
import { construct } from '@substrate/txwrapper-core';

export class Incentive extends Base {
    async workProof(keyPair: IKeyringPair, account: string, workValue: string): Promise<string> {
        const { baseTxInfo, txOptions, metadataRpc, registry } = await this.getTransactionArgs(keyPair.address);
        const unsigned = topsMethods.incentive.workProof({ account, workValue }, baseTxInfo, txOptions);
        const signingPayload = construct.signingPayload(unsigned, { registry });
        const signature = await this.signWith(keyPair, signingPayload, registry, metadataRpc);
        const tx = construct.signedTx(unsigned, signature, { metadataRpc, registry });
        return await this.sendTx(tx);
    }

    async userCurrentWorks(address: string): Promise<string> {
        let value = await this.queryStorage<string>('incentive', 'userCurrentWorks', address);

        return value;
    }
}