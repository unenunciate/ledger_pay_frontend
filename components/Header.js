import Link from "next/link";

import AccountDropdown from './AccountDropdown';
import NetworkDisplay from './NetworkDisplay';

import useAuth from '../hooks/useAuth';
import {useState} from 'react';

const Header = () => {
    const {user, setNetwork} = useAuth();
    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false);

    return (
            <header className="w-full px-4 py-2 text-gray-300 bg-green-600 h-[10vh]">
                <div className="flex flex-row justify-between w-full h-full">
                    <Link href="/" >
                        <a className="flex items-center h-full w-1/4"><span className="text-xl text-center text-gray-300 hover:text-gray-100">LedgerPay</span></a>
                    </Link>

                    <nav className={`flex-row flex w-1/2  items-center  justify-center h-full`}>
                        <input className="w-1/4 bg-gray-300 placeholder-green-900 active:border-2 active:border-green-900 text-center py-2 rounded-3xl shadow-xl" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)}/>
                        <Link href={`/search?credential=${query}`}>
                            <a className="flex items-center rounded-full justify-center text-green-600 bg-gray-300 hover:bg-gray-100 hover:text-green-400 active:text-green-900 active:bg-gray-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="feather feather-search"
                                    viewBox="0 0 24 24"
                                >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="M21 21L16.65 16.65"></path>
                                </svg>
                            </a>
                        </Link>
                    </nav>

                    <div className='flex items-center justify-end  h-full w-1/4'>
                        <div className='relative flex items-center justify-end w-full h-max'>
                            <div className="flex items-center rounded-full justify-center text-green-600 bg-gray-300 hover:bg-gray-100 hover:text-green-400">
                                {user?.domain}
                            </div>

                            <div className="flex items-center rounded-full justify-center text-green-600 bg-gray-300 hover:bg-gray-100 hover:text-green-400 active:text-green-900 active:bg-gray-500">
                                <NetworkDisplay />

                                <select onChange={(e) => setNetwork(e.target.value)} className="flex items-center rounded-full justify-center text-green-600 bg-gray-300 hover:bg-gray-100 hover:text-green-400 active:text-green-900 active:bg-gray-500 shadow-lg" text="V">
                                    {user?.networks.map((network)=> {
                                        <option key={network.name} value={network.name} />
                                    })}
                                </select>
                            </div>
                            
                            <button onClick={() => setOpen(true)} className="flex items-center rounded-full justify-center text-green-600 bg-gray-300 hover:bg-gray-100 hover:text-green-400 active:text-green-900 active:bg-gray-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="feather feather-settings"
                                    viewBox="0 0 24 24"
                                >
                                    <circle cx="12" cy="12" r="3"></circle>
                                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path>
                                </svg>
                            </button>

                            <AccountDropdown open={open} setOpen={setOpen} />
                        </div>
                    </div>
                </div>
            </header>
        );
}

export default Header;