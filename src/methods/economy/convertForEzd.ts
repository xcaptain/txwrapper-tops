import {
    Args,
    BaseTxInfo,
    defineMethod,
    OptionsWithMeta,
    UnsignedTransaction,
} from '@substrate/txwrapper-core';

export interface ConvertForEzdArgs extends Args {
    burned: string | number;
}

export function convertForEzd(
    args: ConvertForEzdArgs,
    info: BaseTxInfo,
    options: OptionsWithMeta
): UnsignedTransaction {
    return defineMethod(
        {
            method: {
                args,
                name: 'convertForEzd',
                pallet: 'economy',
            },
            ...info,
        },
        options
    );
}