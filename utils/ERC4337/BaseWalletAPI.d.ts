import { BigNumber, BigNumberish } from 'ethers';
import { Provider } from '@ethersproject/providers';
import { UserOperationStruct } from '@account-abstraction/contracts';
import { TransactionDetailsForUserOp } from './TransactionDetailsForUserOp';
import { PaymasterAPI } from './PaymasterAPI';
/**
 * Base class for all Smart Wallet ERC-4337 Clients to implement.
 * Subclass should inherit 5 methods to support a specific wallet contract:
 *
 * - getWalletInitCode - return the value to put into the "initCode" field, if the wallet is not yet deployed. should create the wallet instance using a factory contract.
 * - getNonce - return current wallet's nonce value
 * - encodeExecute - encode the call from entryPoint through our wallet to the target contract.
 * - signRequestId - sign the requestId of a UserOp.
 *
 * The user can use the following APIs:
 * - createUnsignedUserOp - given "target" and "calldata", fill userOp to perform that operation from the wallet.
 * - createSignedUserOp - helper to call the above createUnsignedUserOp, and then extract the requestId and sign it
 */
export declare abstract class BaseWalletAPI {
    readonly provider: Provider;
    readonly entryPointAddress: string;
    readonly walletAddress?: string | undefined;
    private senderAddress;
    private isPhantom;
    private readonly entryPointView;
    /**
     * subclass MAY initialize to support custom paymaster
     */
    paymasterAPI?: PaymasterAPI;
    /**
     * base constructor.
     * subclass SHOULD add parameters that define the owner (signer) of this wallet
     * @param provider - read-only provider for view calls
     * @param entryPointAddress - the entryPoint to send requests through (used to calculate the request-id, and for gas estimations)
     * @param walletAddress. may be empty for new wallet (using factory to determine address)
     */
    protected constructor(provider: Provider, entryPointAddress: string, walletAddress?: string | undefined);
    init(): Promise<this>;
    /**
     * return the value to put into the "initCode" field, if the wallet is not yet deployed.
     * this value holds the "factory" address, followed by this wallet's information
     */
    abstract getWalletInitCode(): Promise<string>;
    /**
     * return current wallet's nonce.
     */
    abstract getNonce(): Promise<BigNumber>;
    /**
     * encode the call from entryPoint through our wallet to the target contract.
     * @param target
     * @param value
     * @param data
     */
    abstract encodeExecute(target: string, value: BigNumberish, data: string): Promise<string>;
    /**
     * sign a userOp's hash (requestId).
     * @param requestId
     */
    abstract signRequestId(requestId: string): Promise<string>;
    /**
     * check if the wallet is already deployed.
     */
    checkWalletPhantom(): Promise<boolean>;
    /**
     * calculate the wallet address even before it is deployed
     */
    getCounterFactualAddress(): Promise<string>;
    /**
     * return initCode value to into the UserOp.
     * (either deployment code, or empty hex if contract already deployed)
     */
    getInitCode(): Promise<string>;
    /**
     * return maximum gas used for verification.
     * NOTE: createUnsignedUserOp will add to this value the cost of creation, if the wallet is not yet created.
     */
    getVerificationGasLimit(): Promise<BigNumberish>;
    /**
     * should cover cost of putting calldata on-chain, and some overhead.
     * actual overhead depends on the expected bundle size
     */
    getPreVerificationGas(userOp: Partial<UserOperationStruct>): Promise<number>;
    encodeUserOpCallDataAndGasLimit(detailsForUserOp: TransactionDetailsForUserOp): Promise<{
        callData: string;
        callGasLimit: BigNumber;
    }>;
    /**
     * return requestId for signing.
     * This value matches entryPoint.getRequestId (calculated off-chain, to avoid a view call)
     * @param userOp userOperation, (signature field ignored)
     */
    getRequestId(userOp: UserOperationStruct): Promise<string>;
    /**
     * return the wallet's address.
     * this value is valid even before deploying the wallet.
     */
    getWalletAddress(): Promise<string>;
    /**
     * create a UserOperation, filling all details (except signature)
     * - if wallet is not yet created, add initCode to deploy it.
     * - if gas or nonce are missing, read them from the chain (note that we can't fill gaslimit before the wallet is created)
     * @param info
     */
    createUnsignedUserOp(info: TransactionDetailsForUserOp): Promise<UserOperationStruct>;
    /**
     * Sign the filled userOp.
     * @param userOp the UserOperation to sign (with signature field ignored)
     */
    signUserOp(userOp: UserOperationStruct): Promise<UserOperationStruct>;
    /**
     * helper method: create and sign a user operation.
     * @param info transaction details for the userOp
     */
    createSignedUserOp(info: TransactionDetailsForUserOp): Promise<UserOperationStruct>;
}
