import Link from "next/link";
import Image from "next/image";

import Drawer from './Drawer';

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
                        <a className="flex items-center w-1/4 h-full"><Image width={32} height={32} href="/LedgePay.png" layout="fixed" /></a>
                    </Link>

                    <nav className={`flex-row flex w-1/2 items-center justify-center h-full`}>
                        <input className="w-1/3 py-2 mr-2 text-center text-green-900 placeholder-green-600 bg-gray-300 shadow-xl focus:outline-none focus:ring-2 focus:ring-green-700 rounded-3xl" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)}/>
                        <Link href={`/search?credential=${query}`}>
                            <a className="flex items-center justify-center p-2 text-green-600 bg-gray-300 rounded-full hover:bg-gray-100 hover:text-green-400 active:text-green-900 active:ring-green-700 active:ring-2 active:bg-gray-500">
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

                    <div className='flex items-center justify-end w-1/4 h-full'>
                        <div className='relative flex items-center justify-end w-full px-2 space-x-4 h-max'>
                            
                            
                            <button onClick={() => setOpen(true)} className="flex items-center justify-center p-2 text-green-600  hover:text-green-400 active:text-green-900">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="feather feather-menu"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M3 12L21 12"></path>
                                    <path d="M3 6L21 6"></path>
                                    <path d="M3 18L21 18"></path>
                                </svg>
                            </button>

                            <Drawer isOpen={open} setIsOpen={setOpen} />
                        </div>
                    </div>
                </div>
            </header>
        );
}

export default Header;