import Head from 'next/head';

import dynamic from 'next/dynamic';

import Header from '../components/Header';

import useAuth from '../hooks/useAuth';
import useWorldId from '../hooks/useWorldId';

import { useAccount } from '@web3modal/react';

const WorldIDWidget = dynamic(
    () => import("@worldcoin/id").then((mod) => mod.WorldIDWidget),
    { ssr: false }
);

const Settings = ({d}) => {
    const { user, recoveryMode, setRecoveryMode, triggerEthereumLogin } = useAuth();
    const { updateAction, onVerificationSuccess } = useWorldId(false, false, false, user?.worldcoinSetup ? false : true);

    const { address } = useAccount();

    return (
        <div className='h-full w-full'>
            <Head>
                <title>LedgerPay - Settings</title>
            </Head>

            <Header />

            <div className='min-h-[90vh] w-full justify-center items-center bg-gray-800 flex'>
                <section className='max-h w-full md:w-3/4 xl:w-1/2 justify-center items-center flex flex-col'>
                    <div className='w-full justify-center items-center flex flex-col space-y-6 text-blue-400'>
                    {
                        user?.worldcoinSetup || true ?
                            user?.worldcoinEnabled || true ?
                                <>
                                    <div className='flex flex-col space-y-2 justify-center items-center'>
                                        <span>Worldcoin Recovery</span>
                                        <button className='bg-purple-600 rounded-lg flex justify-center items-center w-24 h-12 text-bold hover:border-pruple-300 hover:text-blue-100 hover:bg-purple-300 active:scale-75' onClick={() => {
                                            setRecoveryMode(true);
                                            triggerEthereumLogin();
                                        }}><span>Connect</span></button>
                                        <button className='bg-purple-600 rounded-lg flex justify-center items-center w-24 h-12 text-bold hover:border-pruple-300 hover:text-blue-100 hover:bg-purple-300 active:scale-75' disabled={!recoveryMode} onClick={() => updateAction(false, false, true)}><span>Recover</span></button>
                                        <button className='bg-purple-600 rounded-lg flex justify-center items-center w-24 h-12 text-bold hover:border-pruple-300 hover:text-blue-100 hover:bg-purple-300 active:scale-75' onClick={() => updateAction(false, true)}><span>Disable</span></button>
                                    </div>
                                    <div className='flex flex-col space-y-2 justify-center items-center'>
                                        
                                    </div>
                               </>
                                :
                                <>
                                    <span>Worldcoin Recovery</span>
                                    <button className='bg-purple-600 rounded-xl flex justify-center items-center w-12 h-6' onClick={() => updateAction(true)}><span>Enable</span></button>
                                </>
                                :
                            <>
                                <span>Worldcoin Recovery</span>
                                <WorldIDWidget
                                    actionId={process.env.NEXT_PUBLIC_WORLD_ID_ACTION_ID}
                                    signal={`${address}`}
                                    enableTelemetry
                                    onSuccess={(verificationResponse) => onVerificationSuccess(verificationResponse)}
                                    onError={(error) => console.error(error)}
                                />
                            </>
                    }
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Settings;

export async function getServerSideProps (context) {
    //const res = await fetch({method: "get", url:`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/challenges/getPage?${serialize(filterQuery)}`});
   // const data = (JSON.parse(res.body))?.data; 
   //DATE IN SCENIARO 1/13/2022
   const data = {id:1, results: [], creater: {username: "name", image: ""}, dateRange: {start: "1/12/2022", end: "1/12/2023", remaining: 364}, ante: 2000, challengeAmount: 5000, goals: {start:250, end: 180, current:230},odds: {yes: 3/4, no:1/4}};
    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: { d: data } 
    }
}