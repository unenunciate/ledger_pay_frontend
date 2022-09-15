var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { EntryPoint__factory, SimpleWalletDeployer__factory } from '@account-abstraction/contracts';
import { SimpleWalletAPI } from './SimpleWalletAPI';
import { ERC4337EthersProvider } from './ERC4337EthersProvider';
import { HttpRpcClient } from './HttpRpcClient';
import { DeterministicDeployer } from './DeterministicDeployer';
export function newProvider(originalProvider, config, originalSigner = originalProvider.getSigner()) {
    return __awaiter(this, void 0, void 0, function* () {
        const entryPoint = new EntryPoint__factory().attach(config.entryPointAddress).connect(originalProvider);
        // Initial SimpleWallet instance is not deployed and exists just for the interface
        const simpleWalletDeployer = yield DeterministicDeployer.deploy(SimpleWalletDeployer__factory.bytecode);
        const smartWalletAPI = new SimpleWalletAPI(originalProvider, entryPoint.address, undefined, originalSigner, simpleWalletDeployer, 0);
        const httpRpcClient = new HttpRpcClient(config.bundlerUrl, config.entryPointAddress, 31337);
        return yield new ERC4337EthersProvider(config, originalSigner, originalProvider, httpRpcClient, entryPoint, smartWalletAPI).init();
    });
}
//# sourceMappingURL=Provider.js.map