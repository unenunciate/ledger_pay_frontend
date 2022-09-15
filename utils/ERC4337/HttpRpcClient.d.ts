import { UserOperationStruct } from '@account-abstraction/contracts';
export declare class HttpRpcClient {
    readonly bundlerUrl: string;
    readonly entryPointAddress: string;
    readonly chainId: number;
    private readonly userOpJsonRpcProvider;
    constructor(bundlerUrl: string, entryPointAddress: string, chainId: number);
    sendUserOpToBundler(userOp1: UserOperationStruct): Promise<any>;
    private printUserOperation;
}
