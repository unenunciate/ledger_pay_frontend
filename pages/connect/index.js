import Link from 'next/link';
import { useEffect } from 'react';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import useAuth from '../../hooks/useAuth';

const Connect = () => {
  const {triggerWalletLogin, user} = useAuth();

  const router = useRouter();

  useEffect(() => {
    if(!isEmpty(user)) {
      if(user?.id) {
        router.push('/');
      }
    }
  }, [user])
  
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen bg-gradient-to-b from-green-600 to-orange-600'>
      <section className='flex flex-col items-center justify-center w-5/6 pb-6 bg-gray-300 rounded-xl boarder-2 boarder-gray-500 md:w-3/4 lg:w-1/2 2xl:w-1/3 shadow-gray-500 shadow-2xl'>
        <Link href={"https://www.ledgerpay.com"}><a className='items-center w-1/3 my-12 text-2xl text-center text-white'>LedgerPay</a></Link>
        <div div className='w-3/4 h-full space-y-6'>
            
            <div className='flex flex-col items-center justify-center w-full border-gray-600 border-t-2'>
              <button onClick={triggerWalletLogin} className={`relative w-2/3 h-8 shadow-xl border-2 shadow-green-400 text-green-600 border-green-600 bg-gray-300 rounded-xl text-bold hover:border-green-400 hover:text-green-400 hover:bg-gray-100 active:scale-75`} >
                <span className='w-full text-center'>Wallet</span>
                <div className={`${true ? 'hidden': 'absolute flex bg-gray-400 opacity-70 w-full h-full z-10'}`} />
              </button>
            </div>

            <div  className="h-0 w-full border-gray-500 border-t-2" />

            <Link href="/signup"><a className='w-2/3 h-8 shadow-xl border-2 shadow-green-400 text-green-600 border-green-600 bg-gray-300 rounded-xl text-bold hover:border-green-400 hover:text-green-400 hover:bg-gray-100 active:scale-75'>Signup</a></Link>

        </div>
      </section>
    </div>
  );
};

export default Connect;
