import { Transition } from "@headlessui/react";

import Image from "next/image";
import Link from "next/link";

import { useEffect, useRef } from "react";

const Drawer = ({ open, setOpen }) => {
  const backgroundRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (backgroundRef.current !== null) {
        if (backgroundRef.current?.contains(event.target)) {
          setOpen(false);
        }
      }
    });

    return () => {
      document.removeEventListener("mousedown", (event) => {
        if (backgroundRef.current !== null) {
          if (backgroundRef.current?.contains(event.target)) {
            setOpen(false);
          }
        }
      });
    };
  }, [backgroundRef.current, setOpen, open]);
  return (
    <>
      <Transition
        show={open}
        timeout={500}
        enterFrom="translate-x-full"
        enter="duration-500 transition-translate"
        enterTo="translate-x-0"
        leaveFrom="translate-x-0"
        leave="duration-500 transition-translate"
        leaveTo="translate-x-full"
        className="fixed top-0 left-0 z-[52] justify-center w-full min-h-screen"
        as="nav"
      >
        <div className="relative flex flex-col items-center justify-between w-full min-h-screen py-6 text-blue-400 bg-gray-800">
          <button onClick={() => setOpen(false)} className="absolute px-2 py-1 text-xl font-bold text-purple-600 rounded cursor-pointer hover:text-purple-300 left-2 top-2 hover:bg-gray-900 active:scale-75">X</button>
          
          <div className="flex flex-col items-center justify-between w-full min-h-[50vh]">
            <Link href="/">
                <a className="flex px-4 py-4 rounded-lg hover:bg-gray-900">
                    <Image src="/LedgePay.png" width={64} height={64} layout="fixed" />
                </a>
            </Link>

           
                
            <div className="flex flex-col items-center justify-between min-h-[25vh]">
                <Link href="/settings">
                    <a className="flex px-4 py-2 my-4 rounded cursor-pointer hover:bg-gray-900 hover:text-purple-600">
                        Settings
                    </a>
                </Link>

                <button onClick={() => disconnect()} className="flex px-4 py-2 my-4 rounded cursor-pointer hover:bg-gray-900 hover:text-purple-600">
                    Disconnect
                </button>
            </div>
            
            
          </div>

          <div className="flex flex-wrap items-center justify-center w-full mx-4 text-sm">
            <Link href="/about">
              <a className="px-4 py-2 my-2 rounded cursor-pointer hover:bg-gray-900 hover:text-purple-600">
                About
              </a>
            </Link>

            <Link href="/terms">
              <a className="px-4 py-2 my-2 rounded cursor-pointer hover:bg-gray-900 hover:text-purple-600">
                Terms
              </a>
            </Link>

            <Link href="/help">
              <a className="px-4 py-2 my-2 rounded cursor-pointer hover:bg-gray-900 hover:text-purple-600">
                Help
              </a>
            </Link>
          </div>
        </div>
      </Transition>
      <Transition
        show={open}
        timeout={500}
        enterFrom="opacity-0"
        enter="transition-opacity duration-500"
        enterTo="opacity-75"
        leaveFrom="opacity-75"
        leave="transition-opacity duration-500"
        leaveTo="opacity-0"
        className="fixed top-0 left-0 z-[51] justify-center w-full min-h-screen bg-black cursor-pointer"
      >
        <div
          ref={backgroundRef}
          className="flex flex-col items-center w-full min-w-full min-h-screen cursor-pointer"
        ></div>
      </Transition>
    </>
  );
};

export default Drawer;