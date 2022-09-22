import { Transition, Tab } from "@headlessui/react";

import AddressPanel from "./AddressPanel";

import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "../utils/queries";

const CardInfo = ({ open, setOpen, tab }) => {
  const [number, setNumber] = useState("");
  const [cvv, setCVV] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

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
          <button
            onClick={() => setOpen(false)}
            className="absolute px-2 py-1 text-xl font-bold text-purple-600 rounded cursor-pointer hover:text-purple-300 left-2 top-2 hover:bg-gray-900 active:scale-75"
          >
            X
          </button>

          <Tab.Group
            as="div"
            manual
            defaultIndex={tab}
            className="flex flex-col w-full min-h-full"
          >
            <Tab.List
              as="div"
              className="flex flex-row items-center justify-center w-full px-12 h-1/5"
            >
              <Tab
                as="button"
                className="flex items-center justify-center w-1/2 py-2 rounded-lg cursor-pointer ui-selected:font-bold ui-selected:bg-gray-900"
              >
                <span>Debit Card</span>
              </Tab>
              <Tab
                as="button"
                className="flex items-center justify-center w-1/2 py-2 rounded-lg cursor-pointer ui-selected:font-bold ui-selected:bg-gray-900"
              >
                <span>Address</span>
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <div className="flex flex-col items-center justify-center w-full min-h-screen p-4">
                  <div className="flex flex-col items-center justify-center w-full p-4 h-[75vh] pt-8">
                    <div className="flex flex-col space-y-2">
                      <div className="flex flex-row w-full space-y-2">
                        <div className="flex flex-row space-x-2 basis-1/4">
                          <label className="w-40 h-full py-2 text-left text-blue-400">
                            Card Number
                          </label>
                        </div>
                        <div className="flex flex-row space-x-2 basis-3/4">
                          <input
                            className="h-full px-2 py-2 text-center text-blue-400 placeholder-blue-400 bg-gray-700 border-none rounded-lg w-80 form-input focus:border-none focus:outline-none"
                            placeholder="1234 5678 9999 1234"
                            type="text"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex flex-row w-full space-y-2">
                        <div className="flex flex-row space-x-2 basis-1/4">
                          <label className="w-40 h-full py-2 text-left text-blue-400">
                            CVV
                          </label>
                        </div>
                        <div className="flex flex-row space-x-2 basis-3/4">
                          <input
                            className="h-full px-2 py-2 text-center text-blue-400 placeholder-blue-400 bg-gray-700 border-none rounded-lg w-80 form-input focus:border-none focus:outline-none"
                            placeholder="123"
                            type="text"
                            value={cvv}
                            onChange={(e) => setCVV(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex flex-row w-full space-y-2">
                        <div className="flex flex-row space-x-2 basis-1/4">
                          <label className="w-40 h-full py-2 text-left text-blue-400">
                            Expiration Date
                          </label>
                        </div>
                        <div className="flex flex-row space-x-2 basis-3/4">
                          <input
                            className="w-40 h-full px-2 py-2 text-center text-blue-400 placeholder-blue-400 bg-gray-700 border-none rounded-lg form-input focus:border-none focus:outline-none"
                            placeholder="11"
                            type="text"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                          />
                          <input
                            className="w-40 h-full px-2 py-2 text-center text-blue-400 placeholder-blue-400 bg-gray-700 border-none rounded-lg form-input focus:border-none focus:outline-none"
                            placeholder="27"
                            type="text"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row items-center justify-center w-full h-1/4"></div>
                    <div className="flex flex-col items-center justify-center w-full">
                      <button
                        onClick={() =>
                          saveAction({
                            number: number,
                            cvv: cvv,
                            month: month,
                            year: year,
                          })
                        }
                        className="flex items-center justify-center w-1/2 py-6 text-3xl font-bold text-blue-400 bg-purple-600 rounded lg:1/3 hover:bg-purple-300 hover:text-blue-100 sm:text-xl"
                      >
                        <span>Save</span>
                      </button>
                    </div>
                  </div>
                </div>
              </Tab.Panel>
              <AddressPanel />
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

export default CardInfo;
