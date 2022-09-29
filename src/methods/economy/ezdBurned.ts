import {
    Args,
    BaseTxInfo,
    defineMethod,
    OptionsWithMeta,
    UnsignedTransaction,
} from '@substrate/txwrapper-core';

export interface EzdBurnedArgs extends Args {
    dest: string;
    value: string;
}

// Define the method
export function ezdBurned(
    args: EzdBurnedArgs,
    info: BaseTxInfo,
    options: OptionsWithMeta
): UnsignedTransaction {
    return defineMethod(
        {
            method: {
                args,
                name: 'ezdBurned',
                pallet: 'economy',
            },
            ...info,
        },
        options
    );
}