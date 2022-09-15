var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ethers, BigNumber } from 'ethers';
import { EntryPoint__factory } from '@account-abstraction/contracts';
import { resolveProperties } from 'ethers/lib/utils';
import { getRequestId } from './common';
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
export class BaseWalletAPI {
    /**
     * base constructor.
     * subclass SHOULD add parameters that define the owner (signer) of this wallet
     * @param provider - read-only provider for view calls
     * @param entryPointAddress - the entryPoint to send requests through (used to calculate the request-id, and for gas estimations)
     * @param walletAddress. may be empty for new wallet (using factory to determine address)
     */
    constructor(provider, entryPointAddress, walletAddress) {
        this.provider = provider;
        this.entryPointAddress = entryPointAddress;
        this.walletAddress = walletAddress;
        this.isPhantom = true;
        // factory "connect" define the contract address. the contract "connect" defines the "from" address.
        this.entryPointView = EntryPoint__factory.connect(entryPointAddress, provider).connect(ethers.constants.AddressZero);
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getWalletAddress();
            return this;
        });
    }
    /**
     * check if the wallet is already deployed.
     */
    checkWalletPhantom() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isPhantom) {
                // already deployed. no need to check anymore.
                return this.isPhantom;
            }
            const senderAddressCode = yield this.provider.getCode(this.getWalletAddress());
            if (senderAddressCode.length > 2) {
                console.log(`SimpleWallet Contract already deployed at ${this.senderAddress}`);
                this.isPhantom = false;
            }
            else {
                // console.log(`SimpleWallet Contract is NOT YET deployed at ${this.senderAddress} - working in "phantom wallet" mode.`)
            }
            return this.isPhantom;
        });
    }
    /**
     * calculate the wallet address even before it is deployed
     */
    getCounterFactualAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            const initCode = this.getWalletInitCode();
            // use entryPoint to query wallet address (factory can provide a helper method to do the same, but
            // this method attempts to be generic
            return yield this.entryPointView.callStatic.getSenderAddress(initCode);
        });
    }
    /**
     * return initCode value to into the UserOp.
     * (either deployment code, or empty hex if contract already deployed)
     */
    getInitCode() {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.checkWalletPhantom()) {
                return yield this.getWalletInitCode();
            }
            return '0x';
        });
    }
    /**
     * return maximum gas used for verification.
     * NOTE: createUnsignedUserOp will add to this value the cost of creation, if the wallet is not yet created.
     */
    getVerificationGasLimit() {
        return __awaiter(this, void 0, void 0, function* () {
            return 100000;
        });
    }
    /**
     * should cover cost of putting calldata on-chain, and some overhead.
     * actual overhead depends on the expected bundle size
     */
    getPreVerificationGas(userOp) {
        return __awaiter(this, void 0, void 0, function* () {
            const bundleSize = 1;
            const cost = 21000;
            // TODO: calculate calldata cost
            return Math.floor(cost / bundleSize);
        });
    }
    encodeUserOpCallDataAndGasLimit(detailsForUserOp) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            function parseNumber(a) {
                if (a == null || a === '')
                    return null;
                return BigNumber.from(a.toString());
            }
            const value = (_a = parseNumber(detailsForUserOp.value)) !== null && _a !== void 0 ? _a : BigNumber.from(0);
            const callData = yield this.encodeExecute(detailsForUserOp.target, value, detailsForUserOp.data);
            const callGasLimit = (_b = parseNumber(detailsForUserOp.gasLimit)) !== null && _b !== void 0 ? _b : yield this.provider.estimateGas({
                from: this.entryPointAddress,
                to: this.getWalletAddress(),
                data: callData
            });
            return {
                callData,
                callGasLimit
            };
        });
    }
    /**
     * return requestId for signing.
     * This value matches entryPoint.getRequestId (calculated off-chain, to avoid a view call)
     * @param userOp userOperation, (signature field ignored)
     */
    getRequestId(userOp) {
        return __awaiter(this, void 0, void 0, function* () {
            const op = yield resolveProperties(userOp);
            const chainId = yield this.provider.getNetwork().then(net => net.chainId);
            return getRequestId(op, this.entryPointAddress, chainId);
        });
    }
    /**
     * return the wallet's address.
     * this value is valid even before deploying the wallet.
     */
    getWalletAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.senderAddress == null) {
                if (this.walletAddress != null) {
                    this.senderAddress = this.walletAddress;
                }
                else {
                    this.senderAddress = yield this.getCounterFactualAddress();
                }
            }
            return this.senderAddress;
        });
    }
    /**
     * create a UserOperation, filling all details (except signature)
     * - if wallet is not yet created, add initCode to deploy it.
     * - if gas or nonce are missing, read them from the chain (note that we can't fill gaslimit before the wallet is created)
     * @param info
     */
    createUnsignedUserOp(info) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const { callData, callGasLimit } = yield this.encodeUserOpCallDataAndGasLimit(info);
            const initCode = yield this.getInitCode();
            let verificationGasLimit = BigNumber.from(yield this.getVerificationGasLimit());
            if (initCode.length > 2) {
                // add creation to required verification gas
                const initGas = yield this.entryPointView.estimateGas.getSenderAddress(initCode);
                verificationGasLimit = verificationGasLimit.add(initGas);
            }
            let { maxFeePerGas, maxPriorityFeePerGas } = info;
            if (maxFeePerGas == null || maxPriorityFeePerGas == null) {
                const feeData = yield this.provider.getFeeData();
                if (maxFeePerGas == null) {
                    maxFeePerGas = (_a = feeData.maxFeePerGas) !== null && _a !== void 0 ? _a : undefined;
                }
                if (maxPriorityFeePerGas == null) {
                    maxPriorityFeePerGas = (_b = feeData.maxPriorityFeePerGas) !== null && _b !== void 0 ? _b : undefined;
                }
            }
            const partialUserOp = {
                sender: this.getWalletAddress(),
                nonce: this.getNonce(),
                initCode,
                callData,
                callGasLimit,
                verificationGasLimit,
                maxFeePerGas,
                maxPriorityFeePerGas
            };
            partialUserOp.paymasterAndData = this.paymasterAPI == null ? '0x' : yield this.paymasterAPI.getPaymasterAndData(partialUserOp);
            return Object.assign(Object.assign({}, partialUserOp), { preVerificationGas: this.getPreVerificationGas(partialUserOp), signature: '' });
        });
    }
    /**
     * Sign the filled userOp.
     * @param userOp the UserOperation to sign (with signature field ignored)
     */
    signUserOp(userOp) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestId = yield this.getRequestId(userOp);
            const signature = this.signRequestId(requestId);
            return Object.assign(Object.assign({}, userOp), { signature });
        });
    }
    /**
     * helper method: create and sign a user operation.
     * @param info transaction details for the userOp
     */
    createSignedUserOp(info) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.signUserOp(yield this.createUnsignedUserOp(info));
        });
    }
}
//# sourceMappingURL=BaseWalletAPI.js.map