import {
  getRegistryBase,
  GetRegistryOptsCore,
  getSpecTypes,
  TypeRegistry,
} from '@substrate/txwrapper-core';

// As a convenience to users we can provide them with hardcoded chain properties
// as these rarely change.
/**
 * `ChainProperties` for networks that txwrapper-foo supports. These are normally returned
 * by `system_properties` call, but since they don't change much, it's pretty safe to hardcode them.
 */
const KNOWN_CHAIN_PROPERTIES = {
  'tops-chain': {
    ss58Format: 42,
    tokenDecimals: 18,
    tokenSymbol: 'DPR',
  },
};

// We override the `specName` property of `GetRegistryOptsCore` in order to get narrower type specificity,
// hopefully creating a better experience for users.
/**
 * Options for the `getRegistry` function.
 */
export interface GetRegistryOpts extends GetRegistryOptsCore {
  specName: keyof typeof KNOWN_CHAIN_PROPERTIES;
}

/**
 * Get a type registry for networks that txwrapper-foo supports.
 *
 * @param GetRegistryOptions specName, chainName, specVersion, and metadataRpc of the current runtime.
 * It also allows you to pass in a `asCallsOnlyArg` boolean. This gives you the options to reduce
 * the size of the metadata passed in to only include the calls. This will overall reduce the size of the
 * unsigned transaction.
 */
export function getRegistry({
  specName,
  chainName,
  specVersion,
  metadataRpc,
  properties,
  asCallsOnlyArg
}: GetRegistryOpts): TypeRegistry {
  const registry = new TypeRegistry();

  return getRegistryBase({
    chainProperties: properties || KNOWN_CHAIN_PROPERTIES[specName],
    specTypes: getSpecTypes(registry, chainName, specName, specVersion),
    metadataRpc,
    asCallsOnlyArg
  });
}

import * as topsMethods from './methods';

export const methods = {
  economy: topsMethods.economy,
}

export * from '@substrate/txwrapper-core';
