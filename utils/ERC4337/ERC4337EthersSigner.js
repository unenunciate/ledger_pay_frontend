var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { defineReadOnly } from '@ethersproject/properties';
import { Signer } from '@ethersproject/abstract-signer';
export class ERC4337EthersSigner extends Signer {
    // TODO: we have 'erc4337provider', remove shared dependencies or avoid two-way reference
    constructor(config, originalSigner, erc4337provider, httpRpcClient, smartWalletAPI) {
        super();
        this.config = config;
        this.originalSigner = originalSigner;
        this.erc4337provider = erc4337provider;
        this.httpRpcClient = httpRpcClient;
        this.smartWalletAPI = smartWalletAPI;
        defineReadOnly(this, 'provider', erc4337provider);
    }
    // This one is called by Contract. It signs the request and passes in to Provider to be sent.
    sendTransaction(transaction) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const tx = yield this.populateTransaction(transaction);
            yield this.verifyAllNecessaryFields(tx);
            const userOperation = yield this.smartWalletAPI.createSignedUserOp({
                target: (_a = tx.to) !== null && _a !== void 0 ? _a : '',
                data: (_c = (_b = tx.data) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : '',
                value: tx.value,
                gasLimit: tx.gasLimit
            });
            const transactionResponse = yield this.erc4337provider.constructUserOpTransactionResponse(userOperation);
            try {
                yield this.httpRpcClient.sendUserOpToBundler(userOperation);
            }
            catch (error) {
                // console.error('sendUserOpToBundler failed', error)
                throw this.unwrapError(error);
            }
            // TODO: handle errors - transaction that is "rejected" by bundler is _not likely_ to ever resolve its "wait()"
            return transactionResponse;
        });
    }
    unwrapError(errorIn) {
        var _a;
        if (errorIn.body != null) {
            const errorBody = JSON.parse(errorIn.body);
            let paymasterInfo = '';
            let failedOpMessage = (_a = errorBody === null || errorBody === void 0 ? void 0 : errorBody.error) === null || _a === void 0 ? void 0 : _a.message;
            if ((failedOpMessage === null || failedOpMessage === void 0 ? void 0 : failedOpMessage.includes('FailedOp')) === true) {
                // TODO: better error extraction methods will be needed
                const matched = failedOpMessage.match(/FailedOp\((.*)\)/);
                if (matched != null) {
                    const split = matched[1].split(',');
                    paymasterInfo = `(paymaster address: ${split[1]})`;
                    failedOpMessage = split[2];
                }
            }
            const error = new Error(`The bundler has failed to include UserOperation in a batch: ${failedOpMessage} ${paymasterInfo})`);
            error.stack = errorIn.stack;
            return error;
        }
        return errorIn;
    }
    verifyAllNecessaryFields(transactionRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            if (transactionRequest.to == null) {
                throw new Error('Missing call target');
            }
            if (transactionRequest.data == null && transactionRequest.value == null) {
                // TBD: banning no-op UserOps seems to make sense on provider level
                throw new Error('Missing call data or value');
            }
        });
    }
    connect(provider) {
        throw new Error('changing providers is not supported');
    }
    getAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.erc4337provider.getSenderWalletAddress();
        });
    }
    signMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.originalSigner.signMessage(message);
        });
    }
    signTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
    signUserOperation(userOperation) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield this.smartWalletAPI.getRequestId(userOperation);
            return yield this.originalSigner.signMessage(message);
        });
    }
}
//# sourceMappingURL=ERC4337EthersSigner.js.map