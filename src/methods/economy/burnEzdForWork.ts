import {
    Args,
    BaseTxInfo,
    defineMethod,
    OptionsWithMeta,
    UnsignedTransaction,
} from '@substrate/txwrapper-core';

export interface BurnEzdForWorkArgs extends Args {
    sender: string;
    receiver: string;
    assetBalance: string | number;
}

export function burnEzdForWork(
    args: BurnEzdForWorkArgs,
    info: BaseTxInfo,
    options: OptionsWithMeta
): UnsignedTransaction {
    return defineMethod(
        {
            method: {
                args,
                name: 'burnEzdForWork',
                pallet: 'economy',
            },
            ...info,
        },
        options
    );
}