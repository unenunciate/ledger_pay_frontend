import Image from 'next/image';

import currency  from 'currency.js';
import  ethers  from 'ethers';

const CoinPanel = ({coin}) => {

    const resonablePrecision = () => {
        if(coin.holdings[0].quote_rate < 1) {
            return 2;
        } else if (coin.holdings[0].quote_rate < 10) {
            return 3;
        } else if (coin.holdings[0].quote_rate < 100) {
            return 4;
        } else if (coin.holdings[0].quote_rate < 1000) {
            return 6;
        } else if (coin.holdings[0].quote_rate < 10000) {
            return 8;
        } 
    }

    const USD = value => currency(value, { symbol: "$", precision: 2 });
    const CRYPTO = value => currency(value, { symbol: coin.contract_ticker_symbol, precision: resonablePrecision(), pattern: '#!' });
    
    const getbalance = () => {
        const s = ethers.utils.formatUnits(coin.holdings[0].close.balance, coin.contract_decimals);
        const BN = ethers.BigNumber.from(s);
        return BN.toNumber();
    };

    const balance = getbalance();

    return(
        <div className="flex flex-row w-full items-center justify-between py-2 px-6 bg-gray-800 border-2 border-purple-600 h-[32px] rounded-xl shadow-sm text-blue-400 shadow-purple-600">
            <div className="flex flex-row w-1/4 justify-center items-center space-x-2">
                <div className='rounded-full border-1 border-purple-600 shadow-sm shadow-purple-600'>
                    <Image src={coin.logo_url} width={24} height={24} layout='fixed'/>
                </div>
                
                <span>{coin.contract_name}</span>
            </div>

            <div className="flex flex-row w-1/4 justify-center items-center space-x-2">
                <span>{USD(coin.holdings[0].quote_rate).format(true)}</span>
            </div>

            <div className="flex flex-row w-1/4 justify-center items-center space-x-2">
                <span>~ {CRYPTO(balance).format(true)}</span>
                <span>{USD(coin.holdings[0].close.quote).format(true)}</span>
            </div>
        </div>
    )
}

export default CoinPanel;
