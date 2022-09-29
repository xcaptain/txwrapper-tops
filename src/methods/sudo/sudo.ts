import {
    Args,
    BaseTxInfo,
    defineMethod,
    OptionsWithMeta,
    UnsignedTransaction,
} from '@substrate/txwrapper-core';

// TODO: not completed, not sure how to implement sudo
export interface SudoArgs extends Args {
    call: string;
}

export function sudo(
    args: SudoArgs,
    info: BaseTxInfo,
    options: OptionsWithMeta
): UnsignedTransaction {
    return defineMethod(
        {
            method: {
                args,
                name: 'sudo',
                pallet: 'sudo',
            },
            ...info,
        },
        options
    );
}