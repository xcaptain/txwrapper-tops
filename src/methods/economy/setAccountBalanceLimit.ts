import {
    Args,
    BaseTxInfo,
    defineMethod,
    OptionsWithMeta,
    UnsignedTransaction,
} from '@substrate/txwrapper-core';

export interface SetAccountBalanceLimitArgs extends Args {
    limit: string | number;
}

export function setAccountBalanceLimit(
    args: SetAccountBalanceLimitArgs,
    info: BaseTxInfo,
    options: OptionsWithMeta
): UnsignedTransaction {
    return defineMethod(
        {
            method: {
                args,
                name: 'setAccountBalanceLimit',
                pallet: 'economy',
            },
            ...info,
        },
        options
    );
}