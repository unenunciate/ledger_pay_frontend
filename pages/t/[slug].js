import Head from 'next/head';
import Image from 'next/image';

import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import useAuth from '../../hooks/useAuth';

const Profile = ({ d }) => {
    const {user, isConnected} = useAuth();
    const router = useRouter();
   // const [list, setList] = useState(Array(d.feedItems));
    const [list, setList] = useState([]);
    const [editable, setEditable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState({name:"posts", endpoint: "/posts/getUsersPosts"});
    const [currentCategory, setCurrentCategory] = useState({name:"posts", endpoint: "/posts/getUsersPosts"});
    const [hasMore, setHasMore] = useState(d.hasMore);

    const loadMore = async () => {
      setLoading(true);
      const url = `${process.env.NEXT_PUBLIC_STRAPI_URL + category.endpoint}?id=${d.user.id}&from=${list[list.length -1].id}`;
      const more = await fetch(url, {method: "GET"});
      setList((prev) => ([...prev, ...more.data.results]));
      setHasMore(more.data.hasMore);
      setLoading(false);
    }

    const refreshList = async () => {
      setLoading(true);
      const url = `${process.env.NEXT_PUBLIC_STRAPI_URL + category.endpoint}?id=${d.user.id}`;
      const more = await fetch(url, {method: "GET"});
      setList(more.data.results);
      setHasMore(more.data.hasMore);
      setCurrentCategory(category);
      setLoading(false);
    }

    useEffect(() => {
      if(category.name !== currentCategory.name && !loading) {
        refreshList();
      }
    }, [category, loading])
    
    return (
        <div className='w-full h-full'>
            <Head>
                <title>LedgerPay - ${d?.user?.domain}</title>
            </Head>

            <Header />

            <section className='flex flex-col items-center justify-center w-full min-h-screen py-16 bg-gradient-to-br from-green-600 to-orange-600'>
                <div className={`w-3/4 xl:w-1/2 flex flex-col bg-gray-300 border-2 rounded-xl border-gray-500 py-1 h-max items-center justify-between`}>
                    <div className={"w-full h-48"}>
                        <Image src={d.user.bgImage}  width={360} height={80} />
                    </div>
                    <div className='flex flex-col w-full h-64 px-8 bg-green-100'>
                        <div className='flex flex-row flex-wrap justify-between w-full'>
                            <div className='w-32 h-32'>
                                <button className='z-10 flex w-full -mt-16 border-2 border-green-100 rounded-full h-max' disabled={!editable} >
                                    <Image src={d?.user?.avatar} width={128} height={128}/>
                                </button>
                            </div>
                            
                            { d?.user?.id === user.id ?
                              !editable ?
                                  <button className='w-20 h-12 px-4 py-2 mt-2 text-center text-green-600 border-2 border-green-600 rounded-3xl hover:brightness-125' onClick={() => setEditable(true)}>
                                      Edit
                                  </button>
                                :
                                  <button className='w-20 h-12 px-4 py-2 mt-2 text-center text-green-600 bg-green-200 border-2 border-green-600 rounded-3xl hover:brightness-125' onClick={() => setEditable(false)}>
                                      Done
                                  </button>
                            :
                              d?.user?.associateWithRequestor ?
                                  <div className=''>
                                    STAR FILLED
                                  </div>
                                :
                                  <div className=''>
                                    STAR HOLLOW
                                  </div>
                            }
                        </div>

                        <textarea className='flex w-full -mt-8 bg-green-100 resize-none h-36' disabled={!editable} value={d?.user?.bio} />
                        
                        <div className='flex flex-row justify-between w-full h-16 pt-2' >
                          <div className='flex flex-row items-center justify-center w-1/4 max-h'>
                            <span>SOCIALS </span>
                          </div>
                    
                          <div className='flex flex-row items-center justify-center w-1/4 max-h'>
                            <span>{d.user.joinDate}</span>
                          </div>
                        </div>
                    </div>

                    <div className='flex flex-row justify-between w-full px-8 text-green-600'>
                      <button className={`w-1/4 h-full pt-6 pb-2 border-b-2 border-green-600 cursor-pointer ${currentCategory.name === "transactions" ? 'font-bold' : ''} `} disabled={loading || currentCategory.name === "transactions"} onClick={() => setCategory({name: "transactions", endpoint: `/transactions/getUserTransactions?user=${d.user.id}`})}>Transactions</button>
                      <button className={`w-1/4 h-full pt-6 pb-2 border-b-2 border-green-600 cursor-pointer ${currentCategory.name === "apps" ? 'font-bold' : ''} `}  disabled={loading || currentCategory.name === "apps"} onClick={() => setCategory({name: "apps", endpoint: `/apps/getUserApps?user=${d.user.id}`})}>Apps</button>
                      <button className={`w-1/4 h-full pt-6 pb-2 border-b-2 border-green-600 cursor-pointer ${currentCategory.name === "networks" ? 'font-bold' : ''} `}  disabled={loading || currentCategory.name === "networks"} onClick={() => setCategory({name: "networks", endpoint: `/apps/getUserNetworks?user=${d.user.id}`})}>Networks</button>
                    </div>

                    <div className='flex flex-col w-full'>
                        {
                          list.length === 0 ?
                              <div className='flex items-center justify-center w-full text-xl text-green-600 h-96 text-bold'>
                                <span>No {category.name} here.</span>
                              </div>
                            :
                              list.map((item, index) => {
                                return <FeedItem {...item} key={index}/>
                              })
                        }

                        {
                          hasMore ? 
                              <button className='w-full h-8 text-center text-green-600 border-t-1 border-green-600' onClick={loadMore} disabled={loading}>More</button>
                            :
                              <></>
                        }
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Profile;

export async function getServerSideProps (context) {
   //  const res = await fetch({method: "get", url:`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/challenges/getPage?${serialize(filterQuery)}`});
   //  const data = (JSON.parse(res.body))?.data; 
   //  DATE IN SCENIARO 1/13/2022

   const data = {hasMore: true, feedItems: [{date: "9/11/2001", postText:"never forget", postMedia: null, yesBuys: 200, noBuys: 200}], user: {username: "username", name: "Pat", bio: "1/12/2022", joinDate: "1/12/2022", currentWeight: 425, bgImage: "https://pbs.twimg.com/profile_banners/966909110821167104/1570175391/1500x500", profileImage:"https://pbs.twimg.com/profile_images/1438589426158952453/2qo7fieI_400x400.jpg" }, dateRange: {start: "1/12/2022", end: "1/12/2023", remaining: 364}, ante: 2000, challengeAmount: 5000, goals: {start:250, end: 180, current:230},odds: {yes: 3/4, no:1/4}}
    
    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: { d: data } 
    }
}