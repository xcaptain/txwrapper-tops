import { Base } from './base';
import { IKeyringPair } from '@polkadot/types/types';
import * as topsMethods from '../methods';
import { construct } from '@substrate/txwrapper-core';

export class Economy extends Base {
    async mintEzd(keyPair: IKeyringPair, account: string, ezdBalance: string): Promise<string> {
        const { baseTxInfo, txOptions, metadataRpc, registry } = await this.getTransactionArgs(keyPair.address);
        const unsigned = topsMethods.economy.mintEzd({ account, ezdBalance }, baseTxInfo, txOptions);
        const signingPayload = construct.signingPayload(unsigned, { registry });
        const signature = await this.signWith(keyPair, signingPayload, registry, metadataRpc);
        const tx = construct.signedTx(unsigned, signature, { metadataRpc, registry });
        return await this.sendTx(tx);
    }

    async burnEzdForWork(keyPair: IKeyringPair, sender: string, receiver: string, assetBalance: string): Promise<string> {
        const { baseTxInfo, txOptions, metadataRpc, registry } = await this.getTransactionArgs(keyPair.address);
        const unsigned = topsMethods.economy.burnEzdForWork({ sender, reciever: receiver, assetBalance }, baseTxInfo, txOptions);
        const signingPayload = construct.signingPayload(unsigned, { registry });
        const signature = await this.signWith(keyPair, signingPayload, registry, metadataRpc);
        const tx = construct.signedTx(unsigned, signature, { metadataRpc, registry });
        return await this.sendTx(tx);
    }

    async burnedEzd(address: string): Promise<string> {
        let value = await this.queryStorage<string>('economy', 'ezdBurnd', address);

        return value;
    }
}