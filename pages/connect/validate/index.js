import Link from 'next/link';
import Image from 'next/image';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../../../hooks/useAuth';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import { Grid } from 'react-loading-icons';

const Validate = ({ token }) => {
  const { user, isConnected, setStytchUUID } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if(isConnected()) {
      if(user?.id) {
        router.push('/');
      }
    } else {
        setStytchUUID(token);
    }
  }, [isConnected])
  
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen bg-gradient-to-b from-purple-600 to-blue-400'>
      <section className='flex flex-col items-center justify-center w-5/6 py-6 pb-6 bg-gray-800 shadow-xl rounded-xl md:w-3/4 lg:w-1/2 2xl:w-1/3 shadow-gray-800'>
        <Link href={"https://www.ledgepay.io"}><a className="flex items-center h-full px-6 py-4 rounded-lg hover:bg-gray-900"><Image width={32} height={32} src="/LedgePay.png" layout="fixed" /></a></Link>
        
        <Grid string={""} scale={2} />
      </section>
    </div>
  );
};

export default Validate;


export async function getServerSideProps(context) {
    const queryClient = new QueryClient();

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            token: context.resolvedUrl?.searchParameters?.token ?? null
        },
    }
}