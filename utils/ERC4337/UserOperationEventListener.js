var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { defaultAbiCoder } from 'ethers/lib/utils';
const DEFAULT_TRANSACTION_TIMEOUT = 10000;
/**
 * This class encapsulates Ethers.js listener function and necessary UserOperation details to
 * discover a TransactionReceipt for the operation.
 */
export class UserOperationEventListener {
    constructor(resolve, reject, entryPoint, sender, requestId, nonce, timeout) {
        var _a;
        this.resolve = resolve;
        this.reject = reject;
        this.entryPoint = entryPoint;
        this.sender = sender;
        this.requestId = requestId;
        this.nonce = nonce;
        this.timeout = timeout;
        this.resolved = false;
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        this.boundLisener = this.listenerCallback.bind(this);
        setTimeout(() => {
            this.stop();
            this.reject(new Error('Timed out'));
        }, (_a = this.timeout) !== null && _a !== void 0 ? _a : DEFAULT_TRANSACTION_TIMEOUT);
    }
    start() {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        const filter = this.entryPoint.filters.UserOperationEvent(this.requestId);
        // listener takes time... first query directly:
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            const res = yield this.entryPoint.queryFilter(filter, 'latest');
            if (res.length > 0) {
                void this.listenerCallback(res[0]);
            }
            else {
                this.entryPoint.once(filter, this.boundLisener);
            }
        }), 100);
    }
    stop() {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        this.entryPoint.off('UserOperationEvent', this.boundLisener);
    }
    listenerCallback(...param) {
        var _a;
        return __awaiter(this, arguments, void 0, function* () {
            const event = arguments[arguments.length - 1];
            if (event.args == null) {
                console.error('got event without args', event);
                return;
            }
            // TODO: can this happen? we register to event by requestId..
            if (event.args.requestId !== this.requestId) {
                console.log(`== event with wrong requestId: sender/nonce: event.${event.args.sender}@${event.args.nonce.toString()}!= userOp.${this.sender}@${parseInt((_a = this.nonce) === null || _a === void 0 ? void 0 : _a.toString())}`);
                return;
            }
            const transactionReceipt = yield event.getTransactionReceipt();
            transactionReceipt.transactionHash = this.requestId;
            console.log('got event with status=', event.args.success, 'gasUsed=', transactionReceipt.gasUsed);
            // before returning the receipt, update the status from the event.
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (!event.args.success) {
                yield this.extractFailureReason(transactionReceipt);
            }
            this.stop();
            this.resolve(transactionReceipt);
            this.resolved = true;
        });
    }
    extractFailureReason(receipt) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('mark tx as failed');
            receipt.status = 0;
            const revertReasonEvents = yield this.entryPoint.queryFilter(this.entryPoint.filters.UserOperationRevertReason(this.requestId, this.sender), receipt.blockHash);
            if (revertReasonEvents[0] != null) {
                let message = revertReasonEvents[0].args.revertReason;
                if (message.startsWith('0x08c379a0')) {
                    // Error(string)
                    message = defaultAbiCoder.decode(['string'], '0x' + message.substring(10)).toString();
                }
                console.log(`rejecting with reason: ${message}`);
                this.reject(new Error(`UserOp failed with reason: ${message}`));
            }
        });
    }
}
//# sourceMappingURL=UserOperationEventListener.js.map