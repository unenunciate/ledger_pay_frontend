import { BigNumber, BigNumberish } from 'ethers';
import { SimpleWallet, SimpleWalletDeployer } from '@account-abstraction/contracts';
import { Signer } from '@ethersproject/abstract-signer';
import { BaseWalletAPI } from './BaseWalletAPI';
import { Provider } from '@ethersproject/providers';
/**
 * An implementation of the BaseWalletAPI using the SimpleWallet contract.
 * - contract deployer gets "entrypoint", "owner" addresses and "index" nonce
 * - owner signs requests using normal "Ethereum Signed Message" (ether's signer.signMessage())
 * - nonce method is "nonce()"
 * - execute method is "execFromEntryPoint()"
 */
export declare class SimpleWalletAPI extends BaseWalletAPI {
    readonly owner: Signer;
    readonly factoryAddress?: string | undefined;
    readonly index: number;
    /**
     * base constructor.
     * subclass SHOULD add parameters that define the owner (signer) of this wallet
     * @param provider - read-only provider for view calls
     * @param entryPointAddress - the entryPoint to send requests through (used to calculate the request-id, and for gas estimations)
     * @param walletAddress optional wallet address, if connecting to an existing contract.
     * @param owner the signer object for the wallet owner
     * @param factoryAddress address of contract "factory" to deploy new contracts
     * @param index nonce value used when creating multiple wallets for the same owner
     */
    constructor(provider: Provider, entryPointAddress: string, walletAddress: string | undefined, owner: Signer, factoryAddress?: string | undefined, index?: number);
    /**
     * our wallet contract.
     * should support the "execFromSingleton" and "nonce" methods
     */
    walletContract?: SimpleWallet;
    factory?: SimpleWalletDeployer;
    _getWalletContract(): Promise<SimpleWallet>;
    /**
     * return the value to put into the "initCode" field, if the wallet is not yet deployed.
     * this value holds the "factory" address, followed by this wallet's information
     */
    getWalletInitCode(): Promise<string>;
    getNonce(): Promise<BigNumber>;
    /**
     * encode a method call from entryPoint to our contract
     * @param target
     * @param value
     * @param data
     */
    encodeExecute(target: string, value: BigNumberish, data: string): Promise<string>;
    signRequestId(requestId: string): Promise<string>;
}
