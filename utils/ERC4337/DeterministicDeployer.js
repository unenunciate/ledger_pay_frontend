var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

import { BigNumber } from 'ethers';
import { hexConcat, hexlify, hexZeroPad, keccak256 } from 'ethers/lib/utils';
/**
 * wrapper class for Arachnid's deterministic deployer
 * (deterministic deployer used by 'hardhat-deployer'. generates the same addresses as "hardhat-deploy")
 */
export class DeterministicDeployer {
    constructor(provider) {
        this.provider = provider;
        // from: https://github.com/Arachnid/deterministic-deployment-proxy
        this.proxyAddress = '0x4e59b44847b379578588920ca78fbf26c0b4956c';
        this.deploymentTransaction = '0xf8a58085174876e800830186a08080b853604580600e600039806000f350fe7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe03601600081602082378035828234f58015156039578182fd5b8082525050506014600cf31ba02222222222222222222222222222222222222222222222222222222222222222a02222222222222222222222222222222222222222222222222222222222222222';
        this.deploymentSignerAddress = '0x3fab184622dc19b6109349b94811493bf2a45362';
        this.deploymentGasPrice = 100e9;
        this.deploymentGasLimit = 100000;
    }
    /**
     * return the address this code will get deployed to.
     * @param ctrCode constructor code to pass to CREATE2
     * @param salt optional salt. defaults to zero
     */
    static getAddress(ctrCode, salt = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DeterministicDeployer.instance.getDeterministicDeployAddress(ctrCode, salt);
        });
    }
    /**
     * deploy the contract, unless already deployed
     * @param ctrCode constructor code to pass to CREATE2
     * @param salt optional salt. defaults to zero
     * @return the deployed address
     */
    static deploy(ctrCode, salt = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DeterministicDeployer.instance.deterministicDeploy(ctrCode, salt);
        });
    }
    isContractDeployed(address) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.provider.getCode(address).then(code => code.length > 2);
        });
    }
    isDeployerDeployed() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.isContractDeployed(this.proxyAddress);
        });
    }
    deployDeployer() {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.isContractDeployed(this.proxyAddress)) {
                return;
            }
            const bal = yield this.provider.getBalance(this.deploymentSignerAddress);
            const neededBalance = BigNumber.from(this.deploymentGasLimit).mul(this.deploymentGasPrice);
            const signer = this.provider.getSigner();
            if (bal.lt(neededBalance)) {
                yield signer.sendTransaction({
                    to: this.deploymentSignerAddress,
                    value: neededBalance,
                    gasLimit: this.deploymentGasLimit
                });
            }
            yield this.provider.send('eth_sendRawTransaction', [this.deploymentTransaction]);
            if (!(yield this.isContractDeployed(this.proxyAddress))) {
                throw new Error('raw TX didn\'t deploy deployer!');
            }
        });
    }
    getDeployTransaction(ctrCode, salt = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.deployDeployer();
            const saltEncoded = hexZeroPad(hexlify(salt), 32);
            return {
                to: this.proxyAddress,
                data: hexConcat([
                    saltEncoded,
                    ctrCode
                ])
            };
        });
    }
    getDeterministicDeployAddress(ctrCode, salt = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            // this method works only before the contract is already deployed:
            // return await this.provider.call(await this.getDeployTransaction(ctrCode, salt))
            const saltEncoded = hexZeroPad(hexlify(salt), 32);
            return '0x' + keccak256(hexConcat([
                '0xff',
                this.proxyAddress,
                saltEncoded,
                keccak256(ctrCode)
            ])).slice(-40);
        });
    }
    deterministicDeploy(ctrCode, salt = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            const addr = yield this.getDeterministicDeployAddress(ctrCode, salt);
            if (!(yield this.isContractDeployed(addr))) {
                yield this.provider.getSigner().sendTransaction(yield this.getDeployTransaction(ctrCode, salt));
            }
            return addr;
        });
    }
}
DeterministicDeployer.instance = new DeterministicDeployer();
//# sourceMappingURL=DeterministicDeployer.js.map