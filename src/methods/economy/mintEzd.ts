import {
    Args,
    BaseTxInfo,
    defineMethod,
    OptionsWithMeta,
    UnsignedTransaction,
} from '@substrate/txwrapper-core';

export interface MintEzdArgs extends Args {
    account: string;
    ezdBalance: string | number;
}

export function mintEzd(
    args: MintEzdArgs,
    info: BaseTxInfo,
    options: OptionsWithMeta
): UnsignedTransaction {
    return defineMethod(
        {
            method: {
                args,
                name: 'mintEzd',
                pallet: 'economy',
            },
            ...info,
        },
        options
    );
}