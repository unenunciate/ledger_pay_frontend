import { UserOperationStruct } from '@account-abstraction/contracts';
export declare class PaymasterAPI {
    getPaymasterAndData(userOp: Partial<UserOperationStruct>): Promise<string>;
}
