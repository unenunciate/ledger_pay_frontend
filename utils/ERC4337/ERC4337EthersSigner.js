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
    async sendTransaction(transaction) {
        const tx = await this.populateTransaction(transaction);
        await this.verifyAllNecessaryFields(tx);
        const userOperation = await this.smartWalletAPI.createSignedUserOp({
            target: tx.to ?? '',
            data: tx.data?.toString() ?? '',
            value: tx.value,
            gasLimit: tx.gasLimit
        });
        const transactionResponse = await this.erc4337provider.constructUserOpTransactionResponse(userOperation);
        try {
            await this.httpRpcClient.sendUserOpToBundler(userOperation);
        }
        catch (error) {
            // console.error('sendUserOpToBundler failed', error)
            throw this.unwrapError(error);
        }
        // TODO: handle errors - transaction that is "rejected" by bundler is _not likely_ to ever resolve its "wait()"
        return transactionResponse;
    }
    unwrapError(errorIn) {
        if (errorIn.body != null) {
            const errorBody = JSON.parse(errorIn.body);
            let paymasterInfo = '';
            let failedOpMessage = errorBody?.error?.message;
            if (failedOpMessage?.includes('FailedOp') === true) {
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
    async verifyAllNecessaryFields(transactionRequest) {
        if (transactionRequest.to == null) {
            throw new Error('Missing call target');
        }
        if (transactionRequest.data == null && transactionRequest.value == null) {
            // TBD: banning no-op UserOps seems to make sense on provider level
            throw new Error('Missing call data or value');
        }
    }
    connect(provider) {
        throw new Error('changing providers is not supported');
    }
    async getAddress() {
        return await this.erc4337provider.getSenderWalletAddress();
    }
    async signMessage(message) {
        return await this.originalSigner.signMessage(message);
    }
    async signTransaction(transaction) {
        throw new Error('not implemented');
    }
    async signUserOperation(userOperation) {
        const message = await this.smartWalletAPI.getRequestId(userOperation);
        return await this.originalSigner.signMessage(message);
    }
}
//# sourceMappingURL=ERC4337EthersSigner.js.map