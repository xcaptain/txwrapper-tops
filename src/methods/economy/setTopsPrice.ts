import {
    Args,
    BaseTxInfo,
    defineMethod,
    OptionsWithMeta,
    UnsignedTransaction,
} from '@substrate/txwrapper-core';

export interface SetTopsPriceArgs extends Args {
    price: string | number;
}

export function setTopsPrice(
    args: SetTopsPriceArgs,
    info: BaseTxInfo,
    options: OptionsWithMeta
): UnsignedTransaction {
    return defineMethod(
        {
            method: {
                args,
                name: 'setTopsPrice',
                pallet: 'economy',
            },
            ...info,
        },
        options
    );
}