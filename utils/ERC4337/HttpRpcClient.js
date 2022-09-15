var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    sendUserOpToBundler(userOp1) {
        return __awaiter(this, void 0, void 0, function* () {
            const userOp = yield resolveProperties(userOp1);
            const hexifiedUserOp = Object.keys(userOp)
                .map(key => {
                let val = userOp[key];
                if (typeof val !== 'string' || !val.startsWith('0x')) {
                    val = hexValue(val);
                }
                return [key, val];
            })
                .reduce((set, [k, v]) => (Object.assign(Object.assign({}, set), { [k]: v })), {});
            const jsonRequestData = [hexifiedUserOp, this.entryPointAddress];
            yield this.printUserOperation(jsonRequestData);
            return yield this.userOpJsonRpcProvider
                .send('eth_sendUserOperation', [hexifiedUserOp, this.entryPointAddress]);
        });
    }
    printUserOperation([userOp1, entryPointAddress]) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const userOp = yield resolveProperties(userOp1);
            console.log('sending eth_sendUserOperation', Object.assign(Object.assign({}, userOp), { initCode: ((_a = userOp.initCode) !== null && _a !== void 0 ? _a : '').length, callData: ((_b = userOp.callData) !== null && _b !== void 0 ? _b : '').length }), entryPointAddress);
        });
    }
}
//# sourceMappingURL=HttpRpcClient.js.map