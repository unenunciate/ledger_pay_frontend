import Head from 'next/head';

import useAuth from '../hooks/useAuth';

import Header from '../components/Header';

const Settings = ({d}) => {
    const { user } = useAuth(true);

    return (
        <div className='h-full w-full'>
            <Head>
                <title>LedgerPay - Settings</title>
            </Head>

            <Header />

            <div className='min-h-screen w-full justify-center items-center bg-gradient-to-b from-green-600 to-orange-600'>
                <section className='max-h w-full md:w-3/4 xl:w-1/2'>
                    
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