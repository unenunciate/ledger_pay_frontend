import { Transition, Tab, Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

import Image from "next/image";

import { useEffect, useRef, useState, Fragment } from "react";

const cryptos = [
    {id: 0, name: 'Polygon', icon: {url: '/polygon.png'}},
    {id: 1, name: 'USDC', icon: {url: '/USDC.png'}}
]

const networks = [
    {id: 0, name: 'Polygon', icon: {url: '/polygon.png'}},
]

const BuySellSwap = ({ open, setOpen, tab }) => {

    const [selectedCrypto, setSelectedCrypto] = useState(cryptos[1]);
    const [selectedForCrypto, setSelectedForCrypto] = useState(cryptos[0]);

    const [selectedNetwork, setSelectedNetwork] = useState(networks[0]);

    const [dollarAmount, setDollarAmount] = useState(0);

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
                    
                    <Tab.Group as="div" manual defaultIndex={tab} className="flex flex-col w-full min-h-full">
                        <Tab.List as="div" className="flex flex-row items-center justify-center w-full px-12 h-1/5">
                            <Tab as="button" className="flex items-center justify-center w-1/3 py-2 rounded-lg cursor-pointer ui-selected:font-bold ui-selected:bg-gray-900"><span>Buy</span></Tab>
                            <Tab as="button" className="flex items-center justify-center w-1/3 py-2 rounded-lg cursor-pointer ui-selected:font-bold ui-selected:bg-gray-900"><span>Sell</span></Tab>
                            <Tab as="button" className="flex items-center justify-center w-1/3 py-2 rounded-lg cursor-pointer ui-selected:font-bold ui-selected:bg-gray-900"><span>Swap</span></Tab>
                        </Tab.List>
                        <Tab.Panels>
                            <Tab.Panel>
                                <div className="flex flex-col items-center justify-center w-full min-h-screen p-4">
                                    <div className="flex flex-col items-center justify-center w-full p-4 h-[75vh] pt-8">
                                        <div className="flex flex-row items-center justify-around w-48 mb-8 h-1/4">
                                            <span className="text-3xl text-purple-600">$</span><input className="w-24 h-full px-2 text-3xl text-purple-600 placeholder-purple-600 bg-gray-800 border-none form-input focus:border-none focus:outline-none" placeholder="0" type="number" value={dollarAmount} onChange={(e) => setDollarAmount(e.target.value)}/>
                                        </div>
                                        <div className="flex flex-col items-center justify-center w-full -mb-8 space-y-4 h-1/2">
                                            <Listbox value={selectedCrypto} onChange={setSelectedCrypto}>
                                                <div className="relative flex flex-col mt-1 space-y-2">
                                                    <Listbox.Label className="h-full py-2 text-center bg-gray-700 rounded-lg w-36">Buying</Listbox.Label>
                                                    <Listbox.Button className="relative flex items-center w-full py-2 pl-3 pr-10 text-left bg-gray-700 rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-purple-600 sm:text-sm">
                                                        <Image src={selectedCrypto.icon.url} width={16} height={16} layout="fixed" />
                                                        <span className="flex ml-3 truncate">{selectedCrypto.name}</span>
                                                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                            <ChevronUpDownIcon
                                                                className="w-5 h-5 text-gray-400"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    </Listbox.Button>
                                                    <Transition
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute flex flex-col items-start w-full py-1 mt-1 overflow-auto text-base bg-gray-700 rounded-md shadow-lg max-h-60 ring-1 ring-purple-600 ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {cryptos.map((crypto, cryptoIdx) => (
                                                                <Listbox.Option
                                                                    key={cryptoIdx}
                                                                    className={({ active }) =>
                                                                        `relative w-full flex cursor-default select-none py-2 pl-10 pr-4 ${
                                                                        active ? 'bg-gray-400 text-purple-600' : 'text-blue-400'
                                                                        }`
                                                                    }
                                                                    value={crypto}
                                                                >
                                                                {({ selected }) => (
                                                                    <>
                                                                        <Image src={crypto.icon.url} width={16} height={16} layout="fixed" />
                                                                        <span
                                                                            className={`ml-3 truncate ${
                                                                            selected ? 'font-medium' : 'font-normal'
                                                                            }`}
                                                                        >
                                                                            {crypto.name}
                                                                        </span>
                                                                        {selected ? (
                                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                                                                <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                                                            </span>
                                                                        ) : null}
                                                                    </>
                                                                )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </Listbox>

                                            <Listbox value={selectedNetwork} onChange={setSelectedNetwork}>
                                                <div className="relative flex flex-col mt-1 space-y-2">
                                                    <Listbox.Label className="h-full py-2 text-center bg-gray-700 rounded-lg w-36">Network</Listbox.Label>
                                                    <Listbox.Button className="relative flex items-center w-full py-2 pl-3 pr-10 text-left bg-gray-700 rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-purple-600 sm:text-sm">
                                                        <Image src={selectedNetwork.icon.url} width={16} height={16} layout="fixed" />
                                                        <span className="flex ml-3 truncate">{selectedNetwork.name}</span>
                                                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                            <ChevronUpDownIcon
                                                                className="w-5 h-5 text-gray-400"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    </Listbox.Button>
                                                    <Transition
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute flex flex-col items-start w-full py-1 mt-1 overflow-auto text-base bg-gray-700 rounded-md shadow-lg max-h-60 ring-1 ring-purple-600 ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {networks.map((network, networkIdx) => (
                                                                <Listbox.Option
                                                                    key={networkIdx}
                                                                    className={({ active }) =>
                                                                        `relative w-full flex cursor-default select-none py-2 pl-10 pr-4 ${
                                                                        active ? 'bg-gray-400 text-purple-600' : 'text-blue-400'
                                                                        }`
                                                                    }
                                                                    value={network}
                                                                >
                                                                {({ selected }) => (
                                                                    <>
                                                                        <Image src={network.icon.url} width={16} height={16} layout="fixed" />
                                                                        <span
                                                                            className={`ml-3 truncate ${
                                                                            selected ? 'font-medium' : 'font-normal'
                                                                            }`}
                                                                        >
                                                                            {network.name}
                                                                        </span>
                                                                        {selected ? (
                                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                                                                <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                                                            </span>
                                                                        ) : null}
                                                                    </>
                                                                )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </Listbox>
                                        </div>
                                        <div className="flex flex-row items-center justify-center w-full h-1/4">
                                            
                                        </div>
                                        <div className="flex flex-col items-center justify-center w-full">
                                            <button className="flex items-center justify-center w-1/2 py-6 text-3xl font-bold text-blue-400 bg-purple-600 rounded lg:1/3 hover:bg-purple-300 hover:text-blue-100 sm:text-xl"><span>Send</span></button>
                                        </div>
                                    </div>
                                </div>
                            </Tab.Panel>
                            <Tab.Panel>
                                <div className="flex flex-col items-center justify-center w-full min-h-screen p-4">
                                    <div className="flex flex-col items-center justify-center w-full p-4 h-[75vh] pt-8">
                                        <div className="flex flex-row items-center justify-around w-48 mb-8 h-1/4">
                                            <span className="text-3xl text-purple-600">$</span><input className="w-24 h-full px-2 text-3xl text-purple-600 placeholder-purple-600 bg-gray-800 border-none form-input focus:border-none focus:outline-none" placeholder="0" type="number" value={dollarAmount} onChange={(e) => setDollarAmount(e.target.value)}/>
                                        </div>
                                        <div className="flex flex-col items-center justify-center w-full -mb-8 space-y-4 h-1/2">
                                            <Listbox value={selectedCrypto} onChange={setSelectedCrypto}>
                                                <div className="relative flex flex-col mt-1 space-y-2">
                                                    <Listbox.Label className="h-full py-2 text-center bg-gray-700 rounded-lg w-36">Selling</Listbox.Label>
                                                    <Listbox.Button className="relative flex items-center w-full py-2 pl-3 pr-10 text-left bg-gray-700 rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-purple-600 sm:text-sm">
                                                        <Image src={selectedCrypto.icon.url} width={16} height={16} layout="fixed" />
                                                        <span className="flex ml-3 truncate">{selectedCrypto.name}</span>
                                                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                            <ChevronUpDownIcon
                                                                className="w-5 h-5 text-gray-400"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    </Listbox.Button>
                                                    <Transition
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute flex flex-col items-start w-full py-1 mt-1 overflow-auto text-base bg-gray-700 rounded-md shadow-lg max-h-60 ring-1 ring-purple-600 ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {cryptos.map((crypto, cryptoIdx) => (
                                                                <Listbox.Option
                                                                    key={cryptoIdx}
                                                                    className={({ active }) =>
                                                                        `relative w-full flex cursor-default select-none py-2 pl-10 pr-4 ${
                                                                        active ? 'bg-gray-400 text-purple-600' : 'text-blue-400'
                                                                        }`
                                                                    }
                                                                    value={crypto}
                                                                >
                                                                {({ selected }) => (
                                                                    <>
                                                                        <Image src={crypto.icon.url} width={16} height={16} layout="fixed" />
                                                                        <span
                                                                            className={`ml-3 truncate ${
                                                                            selected ? 'font-medium' : 'font-normal'
                                                                            }`}
                                                                        >
                                                                            {crypto.name}
                                                                        </span>
                                                                        {selected ? (
                                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                                                                <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                                                            </span>
                                                                        ) : null}
                                                                    </>
                                                                )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </Listbox>

                                            <Listbox value={selectedNetwork} onChange={setSelectedNetwork}>
                                                <div className="relative flex flex-col mt-1 space-y-2">
                                                    <Listbox.Label className="h-full py-2 text-center bg-gray-700 rounded-lg w-36">Network</Listbox.Label>
                                                    <Listbox.Button className="relative flex items-center w-full py-2 pl-3 pr-10 text-left bg-gray-700 rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-purple-600 sm:text-sm">
                                                        <Image src={selectedNetwork.icon.url} width={16} height={16} layout="fixed" />
                                                        <span className="flex ml-3 truncate">{selectedNetwork.name}</span>
                                                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                            <ChevronUpDownIcon
                                                                className="w-5 h-5 text-gray-400"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    </Listbox.Button>
                                                    <Transition
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute flex flex-col items-start w-full py-1 mt-1 overflow-auto text-base bg-gray-700 rounded-md shadow-lg max-h-60 ring-1 ring-purple-600 ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {networks.map((network, networkIdx) => (
                                                                <Listbox.Option
                                                                    key={networkIdx}
                                                                    className={({ active }) =>
                                                                        `relative w-full flex cursor-default select-none py-2 pl-10 pr-4 ${
                                                                        active ? 'bg-gray-400 text-purple-600' : 'text-blue-400'
                                                                        }`
                                                                    }
                                                                    value={network}
                                                                >
                                                                {({ selected }) => (
                                                                    <>
                                                                        <Image src={network.icon.url} width={16} height={16} layout="fixed" />
                                                                        <span
                                                                            className={`ml-3 truncate ${
                                                                            selected ? 'font-medium' : 'font-normal'
                                                                            }`}
                                                                        >
                                                                            {network.name}
                                                                        </span>
                                                                        {selected ? (
                                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                                                                <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                                                            </span>
                                                                        ) : null}
                                                                    </>
                                                                )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </Listbox>
                                        </div>
                                        <div className="flex flex-row items-center justify-center w-full h-1/4">
                                            
                                        </div>
                                        <div className="flex flex-col items-center justify-center w-full">
                                            <button className="flex items-center justify-center w-1/2 py-6 text-3xl font-bold text-blue-400 bg-purple-600 rounded lg:1/3 hover:bg-purple-300 hover:text-blue-100 sm:text-xl"><span>Send</span></button>
                                        </div>
                                    </div>
                                </div>
                            </Tab.Panel>
                            <Tab.Panel>
                                <div className="flex flex-col items-center justify-center w-full min-h-screen p-4">
                                    <div className="flex flex-col items-center justify-center w-full p-4 h-[75vh] pt-8">
                                        <div className="flex flex-row items-center justify-around w-48 mb-8 h-1/4">
                                            <span className="text-3xl text-purple-600">$</span><input className="w-24 h-full px-2 text-3xl text-purple-600 placeholder-purple-600 bg-gray-800 border-none form-input focus:border-none focus:outline-none" placeholder="0" type="number" value={dollarAmount} onChange={(e) => setDollarAmount(e.target.value)}/>
                                        </div>
                                        <div className="flex flex-col items-center justify-center w-full -mb-8 space-y-4 h-1/2">
                                            <Listbox value={selectedCrypto} onChange={setSelectedCrypto}>
                                                <div className="relative flex flex-col mt-1 space-y-2">
                                                    <Listbox.Label className="h-full py-2 text-center bg-gray-700 rounded-lg w-36">Swaping</Listbox.Label>
                                                    <Listbox.Button className="relative flex items-center w-full py-2 pl-3 pr-10 text-left bg-gray-700 rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-purple-600 sm:text-sm">
                                                        <Image src={selectedCrypto.icon.url} width={16} height={16} layout="fixed" />
                                                        <span className="flex ml-3 truncate">{selectedCrypto.name}</span>
                                                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                            <ChevronUpDownIcon
                                                                className="w-5 h-5 text-gray-400"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    </Listbox.Button>
                                                    <Transition
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute flex flex-col items-start w-full py-1 mt-1 overflow-auto text-base bg-gray-700 rounded-md shadow-lg max-h-60 ring-1 ring-purple-600 ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {cryptos.map((crypto, cryptoIdx) => (
                                                                <Listbox.Option
                                                                    key={cryptoIdx}
                                                                    className={({ active }) =>
                                                                        `relative w-full flex cursor-default select-none py-2 pl-10 pr-4 ${
                                                                        active ? 'bg-gray-400 text-purple-600' : 'text-blue-400'
                                                                        }`
                                                                    }
                                                                    value={crypto}
                                                                >
                                                                {({ selected }) => (
                                                                    <>
                                                                        <Image src={crypto.icon.url} width={16} height={16} layout="fixed" />
                                                                        <span
                                                                            className={`ml-3 truncate ${
                                                                            selected ? 'font-medium' : 'font-normal'
                                                                            }`}
                                                                        >
                                                                            {crypto.name}
                                                                        </span>
                                                                        {selected ? (
                                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                                                                <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                                                            </span>
                                                                        ) : null}
                                                                    </>
                                                                )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </Listbox>

                                            <Listbox value={selectedForCrypto} onChange={setSelectedForCrypto}>
                                                <div className="relative flex flex-col mt-1 space-y-2">
                                                    <Listbox.Label className="h-full py-2 text-center bg-gray-700 rounded-lg w-36">For</Listbox.Label>
                                                    <Listbox.Button className="relative flex items-center w-full py-2 pl-3 pr-10 text-left bg-gray-700 rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-purple-600 sm:text-sm">
                                                        <Image src={selectedForCrypto.icon.url} width={16} height={16} layout="fixed" />
                                                        <span className="flex ml-3 truncate">{selectedForCrypto.name}</span>
                                                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                            <ChevronUpDownIcon
                                                                className="w-5 h-5 text-gray-400"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    </Listbox.Button>
                                                    <Transition
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute flex flex-col items-start w-full py-1 mt-1 overflow-auto text-base bg-gray-700 rounded-md shadow-lg max-h-60 ring-1 ring-purple-600 ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {cryptos.map((crypto, cryptoIdx) => (
                                                                <Listbox.Option
                                                                    key={cryptoIdx}
                                                                    className={({ active }) =>
                                                                        `relative w-full flex cursor-default select-none py-2 pl-10 pr-4 ${
                                                                        active ? 'bg-gray-400 text-purple-600' : 'text-blue-400'
                                                                        }`
                                                                    }
                                                                    value={crypto}
                                                                >
                                                                {({ selected }) => (
                                                                    <>
                                                                        <Image src={crypto.icon.url} width={16} height={16} layout="fixed" />
                                                                        <span
                                                                            className={`ml-3 truncate ${
                                                                            selected ? 'font-medium' : 'font-normal'
                                                                            }`}
                                                                        >
                                                                            {crypto.name}
                                                                        </span>
                                                                        {selected ? (
                                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                                                                <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                                                            </span>
                                                                        ) : null}
                                                                    </>
                                                                )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </Listbox>

                                            <Listbox value={selectedNetwork} onChange={setSelectedNetwork}>
                                                <div className="relative flex flex-col mt-1 space-y-2">
                                                    <Listbox.Label className="h-full py-2 text-center bg-gray-700 rounded-lg w-36">Network</Listbox.Label>
                                                    <Listbox.Button className="relative flex items-center w-full py-2 pl-3 pr-10 text-left bg-gray-700 rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-purple-600 sm:text-sm">
                                                        <Image src={selectedNetwork.icon.url} width={16} height={16} layout="fixed" />
                                                        <span className="flex ml-3 truncate">{selectedNetwork.name}</span>
                                                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                            <ChevronUpDownIcon
                                                                className="w-5 h-5 text-gray-400"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    </Listbox.Button>
                                                    <Transition
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute flex flex-col items-start w-full py-1 mt-1 overflow-auto text-base bg-gray-700 rounded-md shadow-lg max-h-60 ring-1 ring-purple-600 ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {networks.map((network, networkIdx) => (
                                                                <Listbox.Option
                                                                    key={networkIdx}
                                                                    className={({ active }) =>
                                                                        `relative w-full flex cursor-default select-none py-2 pl-10 pr-4 ${
                                                                        active ? 'bg-gray-400 text-purple-600' : 'text-blue-400'
                                                                        }`
                                                                    }
                                                                    value={network}
                                                                >
                                                                {({ selected }) => (
                                                                    <>
                                                                        <Image src={network.icon.url} width={16} height={16} layout="fixed" />
                                                                        <span
                                                                            className={`ml-3 truncate ${
                                                                            selected ? 'font-medium' : 'font-normal'
                                                                            }`}
                                                                        >
                                                                            {network.name}
                                                                        </span>
                                                                        {selected ? (
                                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                                                                <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                                                            </span>
                                                                        ) : null}
                                                                    </>
                                                                )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </Listbox>
                                        </div>
                                        <div className="flex flex-row items-center justify-center w-full h-1/4">
                                            
                                        </div>
                                        <div className="flex flex-col items-center justify-center w-full">
                                            <button className="flex items-center justify-center w-1/2 py-6 text-3xl font-bold text-blue-400 bg-purple-600 rounded lg:1/3 hover:bg-purple-300 hover:text-blue-100 sm:text-xl"><span>Send</span></button>
                                        </div>
                                    </div>
                                </div>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
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

export default BuySellSwap;