import { AxiosInstance } from 'axios';
import { getRegistry, TypeRegistry, createMetadata } from '../registry';
import { IKeyringPair } from '@polkadot/types/types';
import { EXTRINSIC_VERSION } from '@polkadot/types/extrinsic/v4/Extrinsic';

interface IAtRaw {
    hash: string;
    height: string;
}

interface IStorageResponse<T> {
    at: IAtRaw;
    pallet: string;
    palletIndex: string;
    storageItem: string;
    key1: string;
    value: T;
}

export class Base {
    public client: AxiosInstance;

    constructor(client: AxiosInstance) {
        this.client = client;
    }

    async queryStorage<T>(pallet: string, storage: string, key: string): Promise<T> {
        const res = await this.client.get<IStorageResponse<T>>(`/pallets/${pallet}/storage/${storage}`, {
            params: {
                key1: key,
            },
        });

        return res.data.value;
    }
    
    async getLatestBlock(): Promise<IBlockHeader> {
        const res = await this.client.get<IBlockHeaderResponse>('/blocks/head');
        return convertBlockHeader(res.data);
    }

    async getAccountBalanceInfo(address: string): Promise<IAccountBalance> {
        const res = await this.client.get<IAccountBalanceResponse>(`/accounts/${address}/balance-info`);
        return convertAccountBalance(res.data);
    }

    async signWith(pair: IKeyringPair, signingPayload: string, registry: TypeRegistry, metadataRpc: `0x${string}`): Promise<`0x${string}`> {
        registry.setMetadata(createMetadata(registry, metadataRpc));

        const { signature } = registry
            .createType('ExtrinsicPayload', signingPayload, {
                version: EXTRINSIC_VERSION,
            })
            .sign(pair);

        return signature;
    }

    async sendTx(signedTx: string): Promise<string> {
        const res = await this.client.post('/transaction', {
            tx: signedTx,
        }); // TODO: 处理交易异常情况
        return res.data.hash;
    }

    async getTransactionArgs(address: string) {
        const {
            specVersion,
            txVersion: transactionVersion,
            specName,
            metadata: metadataRpc,
            chainName,
            genesisHash,
        } = await this.getTransactionMaterial();
        const registry = getRegistry({
            chainName,
            specName,
            specVersion,
            metadataRpc,
        });

        const block = await this.getLatestBlock();
        const { nonce: index } = await this.getAccountBalanceInfo(address);

        const baseTxInfo = {
            address: address,
            blockHash: block.hash,
            blockNumber: block.number,
            eraPeriod: 64, // not sure, use default value!
            genesisHash,
            metadataRpc,
            nonce: index,
            specVersion,
            tip: 0,
            transactionVersion,
        };
        const txOptions = { metadataRpc, registry };

        return {
            baseTxInfo,
            txOptions,
            metadataRpc,
            registry,
        };
    }

    async getTransactionMaterial(): Promise<ITransactionMaterial> {
        const res = await this.client.get<ITransactionMaterialResponse>('/transaction/material', {
            params: {
                metadata: 'scale',
            },
        });
        return convertTransactionMaterial(res.data);
    }
}

interface ITransactionMaterial {
    genesisHash: string;
    chainName: string;
    specName: 'tops-chain';
    specVersion: number;
    txVersion: number;
    metadata: `0x${string}`;
}

interface ITransactionMaterialResponse {
    at: IAtRaw;
    genesisHash: string;
    chainName: string;
    specName: string;
    specVersion: string;
    txVersion: string;
    metadata: `0x${string}`;
}

function convertTransactionMaterial(raw: ITransactionMaterialResponse): ITransactionMaterial {
    return {
        genesisHash: raw.genesisHash,
        chainName: raw.chainName,
        specName: 'tops-chain',
        specVersion: parseInt(raw.specVersion),
        txVersion: parseInt(raw.txVersion),
        metadata: raw.metadata,
    };
}

interface IBlockHeaderResponse {
    'number': string;
    hash: string;
}

interface IBlockHeader {
    'number': number;
    hash: string;
}

function convertBlockHeader(raw: IBlockHeaderResponse): IBlockHeader {
    return {
        'number': parseInt(raw.number),
        hash: raw.hash,
    };
}

interface IAccountBalanceResponse {
    at: IAtRaw;
    nonce: string;
    tokenSymbol: string;
    free: string;
    reserved: string;
    miscFrozen: string;
    feeFrozen: string;
}

interface IAccountBalance {
    nonce: number;
    tokenSymbol: string;
    free: BigInt;
    reserved: BigInt;
    miscFrozen: BigInt;
    feeFrozen: BigInt;
}

function convertAccountBalance(raw: IAccountBalanceResponse): IAccountBalance {
    return {
        nonce: parseInt(raw.nonce),
        tokenSymbol: raw.tokenSymbol,
        free: BigInt(raw.free),
        reserved: BigInt(raw.reserved),
        miscFrozen: BigInt(raw.miscFrozen),
        feeFrozen: BigInt(raw.feeFrozen),
    };
}