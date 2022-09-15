var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.initializedBlockNumber = yield this.originalProvider.getBlockNumber();
            yield this.smartWalletAPI.init();
            // await this.signer.init()
            return this;
        });
    }
    getSigner() {
        return this.signer;
    }
    perform(method, params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (method === 'sendTransaction' || method === 'getTransactionReceipt') {
                // TODO: do we need 'perform' method to be available at all?
                // there is nobody out there to use it for ERC-4337 methods yet, we have nothing to override in fact.
                throw new Error('Should not get here. Investigate.');
            }
            return yield this.originalProvider.perform(method, params);
        });
    }
    getTransaction(transactionHash) {
        const _super = Object.create(null, {
            getTransaction: { get: () => super.getTransaction }
        });
        return __awaiter(this, void 0, void 0, function* () {
            // TODO
            return yield _super.getTransaction.call(this, transactionHash);
        });
    }
    getTransactionReceipt(transactionHash) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestId = yield transactionHash;
            const sender = yield this.getSenderWalletAddress();
            return yield new Promise((resolve, reject) => {
                new UserOperationEventListener(resolve, reject, this.entryPoint, sender, requestId).start();
            });
        });
    }
    getSenderWalletAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.smartWalletAPI.getWalletAddress();
        });
    }
    waitForTransaction(transactionHash, confirmations, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            const sender = yield this.getSenderWalletAddress();
            return yield new Promise((resolve, reject) => {
                const listener = new UserOperationEventListener(resolve, reject, this.entryPoint, sender, transactionHash, undefined, timeout);
                listener.start();
            });
        });
    }
    // fabricate a response in a format usable by ethers users...
    constructUserOpTransactionResponse(userOp1) {
        return __awaiter(this, void 0, void 0, function* () {
            const userOp = yield resolveProperties(userOp1);
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
                wait: (confirmations) => __awaiter(this, void 0, void 0, function* () {
                    const transactionReceipt = yield waitPromise;
                    if (userOp.initCode.length !== 0) {
                        // checking if the wallet has been deployed by the transaction; it must be if we are here
                        yield this.smartWalletAPI.checkWalletPhantom();
                    }
                    return transactionReceipt;
                })
            };
        });
    }
    detectNetwork() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.originalProvider.detectNetwork();
        });
    }
}
//# sourceMappingURL=ERC4337EthersProvider.js.map