import { JsonRpcProvider } from '@ethersproject/providers';
import { ClientConfig } from './ClientConfig';
import { ERC4337EthersProvider } from './ERC4337EthersProvider';
import { Signer } from '@ethersproject/abstract-signer';
export declare function newProvider(originalProvider: JsonRpcProvider, config: ClientConfig, originalSigner?: Signer): Promise<ERC4337EthersProvider>;
