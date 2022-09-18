import { defaultAbiCoder } from 'ethers/lib/utils';
const DEFAULT_TRANSACTION_TIMEOUT = 10000;
/**
 * This class encapsulates Ethers.js listener function and necessary UserOperation details to
 * discover a TransactionReceipt for the operation.
 */
export class UserOperationEventListener {
    constructor(resolve, reject, entryPoint, sender, requestId, nonce, timeout) {
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
        }, this.timeout ?? DEFAULT_TRANSACTION_TIMEOUT);
    }
    start() {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        const filter = this.entryPoint.filters.UserOperationEvent(this.requestId);
        // listener takes time... first query directly:
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        setTimeout(async () => {
            const res = await this.entryPoint.queryFilter(filter, 'latest');
            if (res.length > 0) {
                void this.listenerCallback(res[0]);
            }
            else {
                this.entryPoint.once(filter, this.boundLisener);
            }
        }, 100);
    }
    stop() {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        this.entryPoint.off('UserOperationEvent', this.boundLisener);
    }
    async listenerCallback(...param) {
        const event = arguments[arguments.length - 1];
        if (event.args == null) {
            console.error('got event without args', event);
            return;
        }
        // TODO: can this happen? we register to event by requestId..
        if (event.args.requestId !== this.requestId) {
            console.log(`== event with wrong requestId: sender/nonce: event.${event.args.sender}@${event.args.nonce.toString()}!= userOp.${this.sender}@${parseInt(this.nonce?.toString())}`);
            return;
        }
        const transactionReceipt = await event.getTransactionReceipt();
        transactionReceipt.transactionHash = this.requestId;
        console.log('got event with status=', event.args.success, 'gasUsed=', transactionReceipt.gasUsed);
        // before returning the receipt, update the status from the event.
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!event.args.success) {
            await this.extractFailureReason(transactionReceipt);
        }
        this.stop();
        this.resolve(transactionReceipt);
        this.resolved = true;
    }
    async extractFailureReason(receipt) {
        console.log('mark tx as failed');
        receipt.status = 0;
        const revertReasonEvents = await this.entryPoint.queryFilter(this.entryPoint.filters.UserOperationRevertReason(this.requestId, this.sender), receipt.blockHash);
        if (revertReasonEvents[0] != null) {
            let message = revertReasonEvents[0].args.revertReason;
            if (message.startsWith('0x08c379a0')) {
                // Error(string)
                message = defaultAbiCoder.decode(['string'], '0x' + message.substring(10)).toString();
            }
            console.log(`rejecting with reason: ${message}`);
            this.reject(new Error(`UserOp failed with reason: ${message}`));
        }
    }
}
//# sourceMappingURL=UserOperationEventListener.js.map