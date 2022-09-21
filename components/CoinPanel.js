import Image from 'next/future/image';

import currency  from 'currency.js';
import { ethers } from 'ethers';

import {XYPlot, LineSeries, XAxis, YAxis} from 'react-vis';

import { toNumber } from 'lodash';

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
    const USDNOSYM = value => currency(value, { symbol: '', precision: 2 });
    const CRYPTO = value => currency(value, { symbol: coin.contract_ticker_symbol, precision: resonablePrecision(), pattern: '#!' });
    const PRECENTAGE = value => currency(value, { symbol: '%', precision: 2, pattern: '#!' });
    
    const getbalance = () => {
        const s = ethers.utils.formatUnits(coin.holdings[0].close.balance, coin.contract_decimals);
        return toNumber(s);
    };

    const balance = getbalance();

    const change = (Math.abs(coin.holdings[0].quote_rate - coin.holdings[coin.holdings.length - 1].quote_rate / coin.holdings[coin.holdings.length - 1].quote_rate)) * 100;

    const chartColor = PRECENTAGE(change).format(true) === 0 ? '#4B5563' : coin.holdings[0].quote_rate > coin.holdings[coin.holdings.length - 1].quote_rate ? '#16A34A' : '#DC2626';
    const chartData = coin.holdings.map((holding, index) => ({ x: coin.holdings.length - index, y: USDNOSYM(holding.quote_rate).format(true) }));

    return(
        <div className="flex flex-row items-center justify-between w-full h-32 px-6 py-2 text-blue-400 bg-gray-800 border-2 border-purple-600 shadow-sm rounded-xl shadow-purple-600">
            <div className="flex flex-row items-center justify-between w-1/5 px-8 min-w-fit">
                <div className='w-8 h-8 border-purple-600 rounded-full shadow-sm border-1 shadow-purple-600'>
                    <Image className="w-full h-auto" src={coin.logo_url} width={32} height={32} />
                </div>
                
                <span className='word'>{coin.contract_name}</span>
            </div>

            <div className="flex flex-row items-center justify-between w-1/5 min-w-[250px]">
                <XYPlot width={180} height={96}>
                    <LineSeries
                        curve={'curveMonotoneX'}
                        data={chartData}
                        stroke={chartColor}
                    />
                </XYPlot>
               
                <span className={PRECENTAGE(change).format(true) === 0 ? 'text-gray-600' : coin.holdings[0].quote_rate > coin.holdings[coin.holdings.length - 1].quote_rate ? 'text-green-600' : 'text-red-600'}>
                    {PRECENTAGE(change).format(true) === 0 ? ' ' : coin.holdings[0].quote_rate - coin.holdings[coin.holdings.length - 1].quote_rate > 0 ? '+' : '-'} {PRECENTAGE(change).format(true)}
                </span>
            </div>

            <div className="flex flex-row items-center justify-center w-1/5 space-x-2">
                <span>{USD(coin.holdings[0].quote_rate).format(true)}</span>
            </div>

            <div className="flex flex-col items-center justify-center w-1/5 space-y-2">
                <span>~ {CRYPTO(balance).format(true)}</span>
                <span>{USD(coin.holdings[0].close.quote).format(true)}</span>
            </div>
        </div>
    )
}

export default CoinPanel;