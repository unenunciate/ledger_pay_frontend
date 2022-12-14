import Head from 'next/head';

import SendReceive from '../components/SendReceive';
import BuySellSwap from '../components/BuySellSwap';

import Header from '../components/Header';
import CoinPanel from '../components/CoinPanel';

import useAuth from '../hooks/useAuth';
import { useEffect, useState, useMemo } from 'react';
import { useQuery, QueryClient, dehydrate } from '@tanstack/react-query';

import { queryKeys } from '../utils/queries';
import { getWalletPriceHistory } from '../utils/queries/covalent';

import currency  from 'currency.js';

const testAddress = '0xe0a95BdE2672bBD12263C31BF818384Ca4DFEa87';

export default function Home({}) {
    useAuth();

  //const {data: walletPriceHistory, isLoading } = useQuery(queryKeys.covalent.walletPriceHistory(user.smartAccountAddress, 8001), getWalletPriceHistory);
    const {data: walletPriceHistory, isLoading } = useQuery(queryKeys.covalent.walletPriceHistory(137, testAddress), getWalletPriceHistory, {
        onSuccess: (res) => console.log(res)
    });

    const USD = value => currency(value, { symbol: "$", precision: 2 });
    
    const calcTotalValue = (d) => {
        let total = 0;

        for(let i = 0; i < d?.data?.items?.length ?? 0; i++) {
            total += d.data.items[i].holdings[0].close.quote;
        }
        
        return total;
    }
    
    const totalValue = useMemo(() => calcTotalValue(walletPriceHistory), [walletPriceHistory]);

    const coins = useMemo(() => (walletPriceHistory?.data?.items ?? []), [walletPriceHistory] );

    const [openBSS, setOpenBSS] = useState(false);
    const [tabBSS, setTabBSS] = useState(0);

    const [openSR, setOpenSR] = useState(false);
    const [tabSR, setTabSR] = useState(0);

    return (
        <div className='w-full h-full'>
            <Head>
                <title>LedgePay - Pay On Your Terms</title>
            </Head>

            <Header />
            
            <section className="flex flex-col items-center min-h-[90vh] px-4 pb-12 pr-32 overflow-y-scroll style-scrollbar overscroll-contain remove-scrollbar pt-16 bg-gray-800 md:px-0 w-full">
                <div className="flex flex-col items-center w-full px-5 mx-auto space-y-12 text-center lg:w-2/3">
                    <div className='flex flex-row w-full py-4 bg-gray-800 border-2 border-purple-600 h-[140px] rounded-xl shadow-sm text-blue-400 shadow-purple-600'>
                        <div className='flex flex-col items-center justify-center w-1/2 border-r-2 border-purple-600 max-h'>
                                <span>{USD(totalValue).format(true)}</span>
                                <span>Total Assets</span>
                        </div>

                        <div className='flex flex-col items-center justify-center w-1/2 max-h'>
                                <span>{walletPriceHistory?.data?.items?.length ?? 0}</span>
                                <span>Amount Assets</span>
                        </div>
                    </div>
                    <div className='flex flex-row justify-around w-full'>
                    
                            <button onClick={() => {
                                setTabBSS(0);
                                setOpenBSS(true);
                            }} className="flex flex-col items-center justify-center px-2 py-1 space-y-2 text-blue-400 hover:text-blue-100 group">
                                <div className='flex flex-col items-center justify-center w-12 h-12 text-blue-400 bg-purple-600 rounded-full group-hover:bg-purple-300'>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="feather feather-plus"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 5L12 19"></path>
                                        <path d="M5 12L19 12"></path>
                                    </svg>
                                </div>

                                <span>Buy</span>
                            </button>
                            <button onClick={() => {
                                setTabBSS(1);
                                setOpenBSS(true);
                            }} className="flex flex-col items-center justify-center px-2 py-1 space-y-2 text-blue-400 hover:text-blue-100 group">
                                <div className='flex flex-col items-center justify-center w-12 h-12 text-blue-400 bg-purple-600 rounded-full group-hover:bg-purple-300'>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="feather feather-minus"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M5 12L19 12"></path>
                                    </svg>
                                </div>
                                
                                <span>Sell</span>
                            </button>

                            <button onClick={() => {
                                setTabBSS(2);
                                setOpenBSS(true);
                            }} className="flex flex-col items-center justify-center px-2 py-1 space-y-2 text-blue-400 hover:text-blue-100 group">
                                <div className='flex flex-col items-center justify-center w-12 h-12 text-blue-400 bg-purple-600 rounded-full group-hover:bg-purple-300'>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="feather feather-repeat"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M17 1L21 5 17 9"></path>
                                        <path d="M3 11V9a4 4 0 014-4h14"></path>
                                        <path d="M7 23L3 19 7 15"></path>
                                        <path d="M21 13v2a4 4 0 01-4 4H3"></path>
                                    </svg>
                                </div>
                                
                                <span>Swap</span>
                            </button>

                            <button onClick={() => {
                                setTabSR(0);
                                setOpenSR(true);
                            }} className="flex flex-col items-center justify-center px-2 py-1 space-y-2 text-blue-400 hover:text-blue-100 group">
                                <div className='flex flex-col items-center justify-center w-12 h-12 text-blue-400 bg-purple-600 rounded-full group-hover:bg-purple-300'>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="feather feather-arrow-up-right"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M7 17L17 7"></path>
                                        <path d="M7 7L17 7 17 17"></path>
                                    </svg>
                                </div>
                                
                                <span>Send</span>
                            </button>
                            <button onClick={() => {
                                setTabSR(1);
                                setOpenSR(true);
                            }} className="flex flex-col items-center justify-center px-2 py-1 space-y-2 text-blue-400 hover:text-blue-100 group">
                                <div className='flex flex-col items-center justify-center w-12 h-12 text-blue-400 bg-purple-600 rounded-full group-hover:bg-purple-300'>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="feather feather-arrow-down-right"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M7 7L17 17"></path>
                                        <path d="M17 7L17 17 7 17"></path>
                                    </svg>
                                </div>
                                
                                <span>Receive</span>
                            </button>
                
                    </div>
                </div>
                
                <SendReceive open={openSR} setOpen={setOpenSR} tab={tabSR} />
                <BuySellSwap open={openBSS} setOpen={setOpenBSS} tab={tabBSS} />

                <div className='flex flex-col w-full mt-12 space-y-2 lg:w-2/3'>
                    {
                        coins.map((coin, key) => {
                            return <CoinPanel coin={coin} key={key} />
                        })
                    }
                </div>
            </section>
        </div>
    )
}


export async function getServerSideProps(context) {
    const queryClient = new QueryClient();

    console.log(context.resolvedUrl);

    await queryClient.prefetchQuery(queryKeys.covalent.walletPriceHistory(context.resolvedUrl?.searchParameters?.chainId ?? 137, testAddress), getWalletPriceHistory);

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
}