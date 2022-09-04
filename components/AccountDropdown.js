import Link from "next/link";

import {useRef, useEffect, useCallback} from 'react';
import useAuth from '../hooks/useAuth';

const AccountDropdown = ({open, setOpen}) => {
  const {disconnect} = useAuth();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (event) => {
        if(!dropdownRef.current?.contains(event.target)) {
            setOpen(false);
        }
    }

    if(dropdownRef.current) {
        if(open) {
            document.addEventListener('mousedown', handler)
        }
    }

    return () => {
        document.removeEventListener('mousedown', handler);
    }
  }, [dropdownRef.current, setOpen, open]);

  return (
        <div ref={dropdownRef} className={`${open ? '' : 'hidden'} fixed right-2 bottom-0 -mb-2 z-40 w-32 h-48 bg-green-300 rounded-2xl border-gray-100 border-2 shadow-2 shadow-black`}>
            <ul className='flex flex-col px-2 py-4 justify-between w-full h-full'>
                <li className='text-gray-300 hover:text-gray-100 w-full flex justify-center items-center'><Link href="/portfolio" ><a className="flex text-center py-2 w-2/3  active:text-gray-500">Portfolio</a></Link></li>
                <li className='text-gray-300 hover:text-gray-100 w-full flex justify-center items-center'><Link href="/settings" ><a className="flex text-center py-2 w-2/3  active:text-gray-500">Settings</a></Link></li>
                <li className='text-gray-300 w-full'><button onChange={() => disconnect()} className="py-2 w-full text-lg bg-red-500 hover:text-gray-100 active:text-gray-500 active:bg-red-700 hover:bg-red-300 rounded-lg">Disconnect</button></li>
            </ul>
        </div>
    );
}

export default AccountDropdown;