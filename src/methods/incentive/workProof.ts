import {
    Args,
    BaseTxInfo,
    defineMethod,
    OptionsWithMeta,
    UnsignedTransaction,
} from '@substrate/txwrapper-core';

export interface WorkProofArgs extends Args {
    account: string;
    workValue: string | number;
}

export function workProof(
    args: WorkProofArgs,
    info: BaseTxInfo,
    options: OptionsWithMeta
): UnsignedTransaction {
    return defineMethod(
        {
            method: {
                args,
                name: 'workProof',
                pallet: 'incentive',
            },
            ...info,
        },
        options
    );
}