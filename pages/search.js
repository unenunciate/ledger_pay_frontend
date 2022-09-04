import Head from 'next/head'

import { useState, useCallback } from 'react';
import useFilterable from '../hooks/useFilterable';
import usePaginatable from '../hooks/usePaginatable';
import useUpdateEffect from '../hooks/useUpdateEffect';

import Header from '../components/Header'
import Footer from '../components/Footer'

import ListFilter from '../components/ListFilter'
import ListBody from '../components/ListBody'
import ListPagination from '../components/ListPagination'

import serialize from '../utils/serialize';

const Search = ({p, fq = [], d}) => {
    const {page, pageMax, setPage, list} = usePaginatable(p, d.pageMax, ``, d.results);

    return (
        <div className='h-full w-full'>
            <Head>
                <title>LedgerPay - Pay On Your Terms</title>
            </Head>

            <Header />

            <section className='min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-green-600 to-orange-600'>
                <ListBody list={list} />
                <ListPagination page={page} setPage={setPage} pageMax={pageMax} />
            </section>

            <Footer />
        </div>
    );
}

export default Search;

export async function getServerSideProps (context) {

    const page = context.req.query?.page === undefined ? 1 : context.req.query?.page;
    //const {ay} = context.req.query;
    const filterQuery = [{name:'page', value: page}];

    //const res = await fetch({method: "get", url:`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/challenges/getPage?${serialize(filterQuery)}`});
   // const data = (JSON.parse(res.body))?.data; 
   //DATE IN SCENIARO 1/13/2022
   const data = {results: [{id:1, creater: {username: "name", image: ""}, dateRange: {start: "1/12/2022", end: "1/12/2023", remaining: 364}, ante: 2000, challengeAmount: 5000, goals: {start:250, end: 180, current:230},odds: {yes: 3/4, no:1/4}},
   {id:1, creater: {username: "name42", image: ""}, dateRange: {start: "1/12/2022", end: "2/12/2023", remaining: 29}, ante: 1000, challengeAmount: 10000, goals: {start:225, end: 195, current:224},odds: {yes: 1/5, no:4/5}} ,
   {id:1, creater: {username: "name1", image: ""}, dateRange: {start: "1/12/2022", end: "3/12/2023", remaining: 58}, ante: 5000, challengeAmount: 25000, goals: {start:275, end: 215, current:272},odds: {yes: 1/3, no:2/3}} 
                ], pageMax: 1}

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: { p:page, fq:[{name:'penos', value: 2, options: {}, selected: false}, {name:'pens', value: 1, options: {}, selected: false},{name:'peno', value: 3, options: {}, selected: false}], d: data} 
    }
}