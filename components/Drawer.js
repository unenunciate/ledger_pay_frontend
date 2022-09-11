import { Transition } from "@headlessui/react";

import Image from "next/image";
import Link from "next/link";

import { useEffect, useRef } from "react";

const Drawer = ({ isOpen, setIsOpen }) => {
  const backgroundRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (backgroundRef.current !== null) {
        if (backgroundRef.current?.contains(event.target)) {
          setIsOpen(false);
        }
      }
    });

    return () => {
      document.removeEventListener("mousedown", (event) => {
        if (backgroundRef.current !== null) {
          if (backgroundRef.current?.contains(event.target)) {
            setIsOpen(false);
          }
        }
      });
    };
  }, [backgroundRef.current, setIsOpen, isOpen]);
  return (
    <>
      <Transition
        show={isOpen ? true : false}
        timeout={500}
        enterFrom="-translate-x-full"
        enter="-translate-x-full duration-500 transition-translate"
        enterTo="translate-x-0"
        leave="-translate-x-full duration-500 transition-translate"
        className="fixed top-0 left-0 z-[52] justify-center w-full min-h-screen bg-lemon-meringue -translate-x-64"
        as="nav"
      >
        <div className="relative flex flex-col items-center w-full min-h-screen ">
          <button onChange={() => setIsOpen(false)} className="absolute text-xl font-bold text-purple-600 left-1 top-1">X</button>
          
          <Link href="/">
            <a>
              <Image src="/LedgePay.png" width={64} height={64} layout="fixed" />
            </a>
          </Link>

          <div className="flex flex-col items-center w-full min-h-full my-4 mr-[-12px]">
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <Link>
                    <a className="flex px-4 py-2 my-4 rounded hover:bg-black hover:text-purple-600">
                        Settings
                    </a>
                </Link>

                <button onChange={() => disconnect()} className="flex px-4 py-2 my-4 rounded hover:bg-black hover:text-purple-600">
                    Disconnect
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center mx-4 mb-24 text-sm border-t-2 border-b-2 border-black">
            <Link href="/about">
              <a className="px-4 py-2 my-2 rounded hover:bg-black hover:text-purple-600">
                About
              </a>
            </Link>

            <Link href="/terms">
              <a className="px-4 py-2 my-2 rounded hover:bg-black hover:text-purple-600">
                Terms
              </a>
            </Link>

            <Link href="/help">
              <a className="px-4 py-2 my-2 rounded hover:bg-black hover:text-purple-600">
                Help
              </a>
            </Link>
          </div>
        </div>
      </Transition>
      <Transition
        show={isOpen ? true : false}
        timeout={500}
        enterFrom="opacity-0"
        enter="transition-opacity duration-500 opacity-75"
        leaveTo="opacity-0"
        leave="transition-opacity duration-500 opacity-75"
        className="fixed top-0 left-0 z-[51] justify-center w-full min-h-screen bg-black/75 cursor-pointer"
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