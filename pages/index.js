import Head from 'next/head';
import Image from 'next/image';

import Header from '../components/Header';
import Footer from '../components/Footer';

import useAuth from '../hooks/useAuth';

export default function Home() {
    useAuth();

    return (
        <div className='w-full h-full'>
            <Head>
                <title>LedgerPay - Pay On Your Terms</title>
            </Head>

            <Header />

            <section className="px-2 pt-32 bg-gradient-to-br from-green-600 to-orange-600 md:px-0">
                <div className="container items-center max-w-6xl px-5 mx-auto space-y-12 text-center">
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
                        <a href="#_" className="flex items-center px-6 py-3 text-orange-300 bg-green-300 border-orange-300 border-2 rounded-lg hover:bg-green-100 hover:text-orange-100">
                            Pay Others
                        </a>
                    </div>
                </div>
                <div className="container items-center max-w-4xl px-5 mx-auto mt-16 text-center">
                    
                </div>
            </section>

            <Footer />
        </div>
    )
}
