import Link from 'next/link';
import Image from 'next/image';

import {
  QueryClient,
  dehydrate
} from '@tanstack/react-query';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../../hooks/useAuth';

const Connect = () => {
  const { triggerEthereumLogin, user, isConnected } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if(isConnected()) {
      if(user?.id) {
        router.push('/');
      }
    }
  }, [isConnected])
  
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen bg-gradient-to-b from-purple-600 to-blue-400'>
      <section className='flex flex-col items-center justify-center w-5/6 py-6 pb-6 bg-gray-800 shadow-xl rounded-xl md:w-3/4 lg:w-1/2 2xl:w-1/3 shadow-gray-800'>
        <Link href={"https://www.ledgepay.io"}><a className="flex items-center h-full px-6 py-4 rounded-lg hover:bg-gray-900"><Image width={32} height={32} src="/LedgePay.png" layout="fixed" /></a></Link>
        <div className='w-3/4 h-full py-12 space-y-12'>
            
            <div className='flex flex-col items-center justify-center w-full'>
              <button onClick={() => triggerEthereumLogin()} className={`relative w-2/3 shadow-sm font-bold shadow-purple-600 hover:shadow-purple-300 text-blue-400 py-2 bg-purple-600 rounded-lg text-bold hover:border-pruple-300 hover:text-blue-100 hover:bg-purple-300 active:scale-75`} >
                <span className='w-full text-center'>Wallet</span>
              </button>
            </div>

            <div className="w-full h-0 border-t-2 border-purple-600" />

            <div className='flex justify-center w-full h-max'>
              <Link href="/connect/signup"><a className='relative w-2/3 py-2 font-bold text-center text-blue-400 bg-purple-600 rounded-lg shadow-sm hover:shadow-purple-300 shadow-purple-600 text-bold hover:border-pruple-300 hover:text-blue-100 hover:bg-purple-300 active:scale-75'>Signup</a></Link>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Connect;




export async function getServerSideProps(context) {
  const queryClient = new QueryClient();

  return {
      props: {
          dehydratedState: dehydrate(queryClient),
          token: context.resolvedUrl?.searchParameters?.token ?? null
      },
  }
}