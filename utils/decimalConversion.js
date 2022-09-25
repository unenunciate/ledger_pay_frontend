import { ethers } from "ethers";

const decimalConversion = (amount, decimals) => {
    return ethers.utils.parseUnits(amount.toString(), decimals);
}
export {
    decimalConversion
}