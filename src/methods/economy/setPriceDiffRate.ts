import {
    Args,
    BaseTxInfo,
    defineMethod,
    OptionsWithMeta,
    UnsignedTransaction,
} from '@substrate/txwrapper-core';

export interface SetPriceDiffRateArgs extends Args {
    priceDiffRate: string | number;
}

export function setPriceDiffRate(
    args: SetPriceDiffRateArgs,
    info: BaseTxInfo,
    options: OptionsWithMeta
): UnsignedTransaction {
    return defineMethod(
        {
            method: {
                args,
                name: 'setPriceDiffRate',
                pallet: 'economy',
            },
            ...info,
        },
        options
    );
}