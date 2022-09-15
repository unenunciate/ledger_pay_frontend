import { UserOperationStruct } from '@account-abstraction/contracts';
export declare type NotPromise<T> = {
    [P in keyof T]: Exclude<T[P], Promise<any>>;
};
export declare function packUserOp(op: NotPromise<UserOperationStruct>, forSignature?: boolean): string;
export declare function getRequestId(op: NotPromise<UserOperationStruct>, entryPoint: string, chainId: number): string;
export declare function getRequestIdForSigning(op: NotPromise<UserOperationStruct>, entryPoint: string, chainId: number): Uint8Array;
