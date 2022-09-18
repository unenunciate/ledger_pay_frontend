import { BaseProvider } from '@ethersproject/providers';
import { BigNumber } from 'ethers';
import { hexValue, resolveProperties } from 'ethers/lib/utils';
import { ERC4337EthersSigner } from './ERC4337EthersSigner';
import { UserOperationEventListener } from './UserOperationEventListener';
import { getRequestId } from './common';
export class ERC4337EthersProvider extends BaseProvider {
    constructor(config, originalSigner, originalProvider, httpRpcClient, entryPoint, smartWalletAPI) {
        super({
            name: 'ERC-4337 Custom Network',
            chainId: config.chainId
        });
        this.config = config;
        this.originalSigner = originalSigner;
        this.originalProvider = originalProvider;
        this.httpRpcClient = httpRpcClient;
        this.entryPoint = entryPoint;
        this.smartWalletAPI = smartWalletAPI;
        this.signer = new ERC4337EthersSigner(config, originalSigner, this, httpRpcClient, smartWalletAPI);
    }
    async init() {
        this.initializedBlockNumber = await this.originalProvider.getBlockNumber();
        await this.smartWalletAPI.init();
        // await this.signer.init()
        return this;
    }
    getSigner() {
        return this.signer;
    }
    async perform(method, params) {
        if (method === 'sendTransaction' || method === 'getTransactionReceipt') {
            // TODO: do we need 'perform' method to be available at all?
            // there is nobody out there to use it for ERC-4337 methods yet, we have nothing to override in fact.
            throw new Error('Should not get here. Investigate.');
        }
        return await this.originalProvider.perform(method, params);
    }
    async getTransaction(transactionHash) {
        // TODO
        return await super.getTransaction(transactionHash);
    }
    async getTransactionReceipt(transactionHash) {
        const requestId = await transactionHash;
        const sender = await this.getSenderWalletAddress();
        return await new Promise((resolve, reject) => {
            new UserOperationEventListener(resolve, reject, this.entryPoint, sender, requestId).start();
        });
    }
    async getSenderWalletAddress() {
        return await this.smartWalletAPI.getWalletAddress();
    }
    async waitForTransaction(transactionHash, confirmations, timeout) {
        const sender = await this.getSenderWalletAddress();
        return await new Promise((resolve, reject) => {
            const listener = new UserOperationEventListener(resolve, reject, this.entryPoint, sender, transactionHash, undefined, timeout);
            listener.start();
        });
    }
    // fabricate a response in a format usable by ethers users...
    async constructUserOpTransactionResponse(userOp1) {
        const userOp = await resolveProperties(userOp1);
        const requestId = getRequestId(userOp, this.config.entryPointAddress, this.config.chainId);
        const waitPromise = new Promise((resolve, reject) => {
            new UserOperationEventListener(resolve, reject, this.entryPoint, userOp.sender, requestId, userOp.nonce).start();
        });
        return {
            hash: requestId,
            confirmations: 0,
            from: userOp.sender,
            nonce: BigNumber.from(userOp.nonce).toNumber(),
            gasLimit: BigNumber.from(userOp.callGasLimit),
            value: BigNumber.from(0),
            data: hexValue(userOp.callData),
            chainId: this.config.chainId,
            wait: async (confirmations) => {
                const transactionReceipt = await waitPromise;
                if (userOp.initCode.length !== 0) {
                    // checking if the wallet has been deployed by the transaction; it must be if we are here
                    await this.smartWalletAPI.checkWalletPhantom();
                }
                return transactionReceipt;
            }
        };
    }
    async detectNetwork() {
        return this.originalProvider.detectNetwork();
    }
}
//# sourceMappingURL=ERC4337EthersProvider.js.map