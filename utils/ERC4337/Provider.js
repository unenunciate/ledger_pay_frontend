import { EntryPoint__factory, SimpleWalletDeployer__factory } from '@account-abstraction/contracts';
import { SimpleWalletAPI } from './SimpleWalletAPI';
import { ERC4337EthersProvider } from './ERC4337EthersProvider';
import { HttpRpcClient } from './HttpRpcClient';
import { DeterministicDeployer } from './DeterministicDeployer';
export async function newProvider(originalProvider, config, originalSigner = originalProvider.getSigner()) {
    const entryPoint = new EntryPoint__factory().attach(config.entryPointAddress).connect(originalProvider);
    // Initial SimpleWallet instance is not deployed and exists just for the interface
    const simpleWalletDeployer = await DeterministicDeployer.deploy(SimpleWalletDeployer__factory.bytecode);
    const smartWalletAPI = new SimpleWalletAPI(originalProvider, entryPoint.address, undefined, originalSigner, simpleWalletDeployer, 0);
    const httpRpcClient = new HttpRpcClient(config.bundlerUrl, config.entryPointAddress, 31337);
    return await new ERC4337EthersProvider(config, originalSigner, originalProvider, httpRpcClient, entryPoint, smartWalletAPI).init();
}
//# sourceMappingURL=Provider.js.map