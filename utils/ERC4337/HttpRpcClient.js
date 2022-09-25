import { ethers } from 'ethers';
import { hexValue, resolveProperties } from 'ethers/lib/utils';
export class HttpRpcClient {
    constructor(bundlerUrl, entryPointAddress, chainId) {
        this.bundlerUrl = bundlerUrl;
        this.entryPointAddress = entryPointAddress;
        this.chainId = chainId;
        this.userOpJsonRpcProvider = new ethers.providers.JsonRpcProvider(this.bundlerUrl, {
            name: 'Not actually connected to network, only talking to the Bundler!',
            chainId
        });
    }
    async sendUserOpToBundler(userOp1) {
        const userOp = await resolveProperties(userOp1);
        const hexifiedUserOp = Object.keys(userOp)
            .map(key => {
            let val = userOp[key];
            if (typeof val !== 'string' || !val.startsWith('0x')) {
                val = hexValue(val);
            }
            return [key, val];
        })
            .reduce((set, [k, v]) => ({ ...set, [k]: v }), {});
        const jsonRequestData = [hexifiedUserOp, this.entryPointAddress];
        await this.printUserOperation(jsonRequestData);
        return await this.userOpJsonRpcProvider
            .send('eth_sendUserOperation', [hexifiedUserOp, this.entryPointAddress]);
    }
    async printUserOperation([userOp1, entryPointAddress]) {
        const userOp = await resolveProperties(userOp1);
        console.log('sending eth_sendUserOperation', {
            ...userOp,
            initCode: (userOp.initCode ?? '').length,
            callData: (userOp.callData ?? '').length
        }, entryPointAddress);
    }
}
//# sourceMappingURL=HttpRpcClient.js.map