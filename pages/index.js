import Head from 'next/head';
import Image from 'next/image';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import useAuth from '../hooks/useAuth';

export default function Home() {
    useAuth();

    return (
        <div className='w-full h-full'>
            <Head>
                <title>LedgerPay - Pay On Your Terms</title>
            </Head>

            <Header />
            
            <div className='flex flex-row'>
                <Sidebar />
                <section className="flex flex-col content-center h-[90vh] px-4 pb-12 pr-32 overflow-y-scroll style-scrollbar overscroll-contain remove-scrollbar pt-32 bg-gradient-to-b from-green-600 to-orange-600 md:px-0 w-full">
                    <div className="items-center max-w-6xl px-5 mx-auto space-y-12 text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight text-left text-green-900 sm:text-5xl md:text-6xl md:text-center">
                            <span className="block">Send <span className="block mt-1 text-orange-600 lg:inline lg:mt-0">$$$</span> Instantly <span className="block mt-1 text-orange-600 lg:inline lg:mt-0">Anyway</span></span>
                        </h1>
                        <p className="w-full mx-auto text-base text-left text-gray-300 sm:text-lg lg:text-2xl md:max-w-3xl md:text-center">
                            Are you ready to use magic internet money?
                        </p>
                        <div className="relative flex flex-col justify-center md:flex-row md:space-x-4">
                            <a href="#_" className="flex items-center w-full px-6 py-3 mb-3 text-lg text-green-300 bg-orange-600 rounded-lg md:mb-0 hover:bg-orange-400 hover:text-green-100 md:w-auto">
                                Pay Yourself
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </a>
                            <a href="#_" className="flex items-center px-6 py-3 font-bold text-green-200 border-2 border-orange-300 rounded-lg bg-gradient-to-t from-orange-500 to-green-600 hover:bg-green-500 hover:text-white">
                                Pay Others
                            </a>
                        </div>
                    </div>
                    
                </section>
            </div>
            
        </div>
    )
}
