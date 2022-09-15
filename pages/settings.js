import Head from 'next/head';

import dynamic from 'next/dynamic';

import Header from '../components/Header';

import useAuth from '../hooks/useAuth';
import useWorldId from '../hooks/useWorldId';

import { WidgetProps } from "@worldcoin/id";

const WorldIDWidget = dynamic<WidgetProps>(
    () => import("@worldcoin/id").then((mod) => mod.WorldIDWidget),
    { ssr: false }
);

const Settings = ({d}) => {
    const { user } = useAuth(true);
    const { enable, response, updateAction } = useWorldId();

    return (
        <div className='h-full w-full'>
            <Head>
                <title>LedgerPay - Settings</title>
            </Head>

            <Header />

            <div className='min-h-screen w-full justify-center items-center bg-gray-800'>
                <section className='max-h w-full md:w-3/4 xl:w-1/2'>


                    <WorldIDWidget
                        actionId="wid_BPZsRJANxct2cZxVRyh80SFG" // obtain this from developer.worldcoin.org
                        signal="my_signal"
                        enableTelemetry
                        onSuccess={(verificationResponse) => console.log(verificationResponse)}
                        onError={(error) => console.error(error)}
                    />;
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