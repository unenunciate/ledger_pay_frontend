import Head from 'next/head';

import usePaginatable from '../hooks/usePaginatable';

import Header from '../components/Header';
import Footer from '../components/Footer';

import ListBody from '../components/ListBody';
import ListPagination from '../components/ListPagination';

const Portfolio = ({p, pm, d}) => {
    useAuth(true);

    const {page, pageMax, setPage, list} = usePaginatable(p, d.pageMax, ``, d.results);

    return (
        <div className='w-full h-full'>
            <Head>
                <title>LedgerPay - Portfolio</title>
            </Head>

            <Header />

            <section className='flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-br from-green-600 to-orange-600'>
                <div className='flex flex-row w-3/4 py-4 bg-gray-300 border-2 border-gray-500 lg:w-2/3 2xl:w-1/2 h-128 rounded-xl shadow-lg shadow-gray-500'>
                   <div className='flex flex-col items-center justify-center w-1/2 border-gray-500 max-h border-r-1'>
                        <span>${d.assets.totalValue}</span>
                        <span>Total Assets</span>
                   </div>

                   <div className='flex flex-col items-center justify-center w-1/2  max-h'>
                        <span>{d.assets.amountAssets}</span>
                        <span>Amount of Assets</span>
                   </div>
                </div>
                
                <ListBody list={list} />
                <ListPagination page={page} setPage={setPage} pageMax={pageMax} />
            </section>

            <Footer />
        </div>
    );
}

export default Portfolio;

export async function getServerSideProps (context) {

    const page = context.req.query?.page === undefined ? 1 : context.req.query?.page;
    //const {ay} = context.req.query;
    const filterQuery = [{name:'page', value: page}];

    //const res = await fetch({method: "get", url:`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/challenges/getPage?${serialize(filterQuery)}`});
   // const data = (JSON.parse(res.body))?.data; 
   // DATE IN SCENIARO 1/13/2022
    const data = {id:1, pageMax: 1, results: [], creater: {username: "name", image: ""}, dateRange: {start: "1/12/2022", end: "1/12/2023", remaining: 364}, assets:{amountAssets: 100, amountAllShares: 1000, totalValue: 100000}, ante: 2000,  challengeAmount: 5000, goals: {start:250, end: 180, current:230},odds: {yes: 3/4, no:1/4}};
    
    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: { p: page, d: data } 
    }
}