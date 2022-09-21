import { BigNumber } from 'ethers';
import { SimpleWallet__factory, SimpleWalletDeployer__factory } from '@account-abstraction/contracts';
import { arrayify, hexConcat } from 'ethers/lib/utils';
import { BaseWalletAPI } from './BaseWalletAPI';
/**
 * An implementation of the BaseWalletAPI using the SimpleWallet contract.
 * - contract deployer gets "entrypoint", "owner" addresses and "index" nonce
 * - owner signs requests using normal "Ethereum Signed Message" (ether's signer.signMessage())
 * - nonce method is "nonce()"
 * - execute method is "execFromEntryPoint()"
 */
export class SimpleWalletAPI extends BaseWalletAPI {
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
    constructor(provider, entryPointAddress, walletAddress, owner, factoryAddress, 
    // index is "salt" used to distinguish multiple wallets of the same signer.
    index = 0) {
        super(provider, entryPointAddress, walletAddress);
        this.owner = owner;
        this.factoryAddress = factoryAddress;
        this.index = index;
    }
    async _getWalletContract() {
        if (this.walletContract == null) {
            this.walletContract = SimpleWallet__factory.connect(await this.getWalletAddress(), this.provider);
        }
        return this.walletContract;
    }
    /**
     * return the value to put into the "initCode" field, if the wallet is not yet deployed.
     * this value holds the "factory" address, followed by this wallet's information
     */
    async getWalletInitCode() {
        return "";
        if (this.factory == null) {
            if (this.factoryAddress != null && this.factoryAddress !== '') {
                this.factory = SimpleWalletDeployer__factory.connect(this.factoryAddress, this.provider);
            }
            else {
                throw new Error('no factory to get initCode');
            }
        }
        return hexConcat([
            this.factory.address,
            this.factory.interface.encodeFunctionData('deployWallet', [this.entryPointAddress, await this.owner.getAddress(), this.index])
        ]);
    }
    async getNonce() {
        if (await this.checkWalletPhantom()) {
            return BigNumber.from(0);
        }
        const walletContract = await this._getWalletContract();
        return await walletContract.nonce();
    }
    /**
     * encode a method call from entryPoint to our contract
     * @param target
     * @param value
     * @param data
     */
    async encodeExecute(target, value, data) {
        const walletContract = await this._getWalletContract();
        return walletContract.interface.encodeFunctionData('execFromEntryPoint', [
            target,
            value,
            data
        ]);
    }
    async signRequestId(requestId) {
        return await this.owner.signMessage(arrayify(requestId));
    }
}
//# sourceMappingURL=SimpleWalletAPI.js.map