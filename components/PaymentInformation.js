import { Transition, Tab } from "@headlessui/react";

import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "../utils/queries";
import { getWalletPriceHistory } from "../utils/queries/covalent";
//import { request } from "@strapi/helper-plugin";

const PaymentInformation = ({ open, setOpen, tab }) => {
  //   const [isLoading, setIsLoading] = useState(true);
  const [cardNumber, setCardNumber] = useState("");
  const [cvc, setCVC] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const [accountNumber, setAccountNumber] = useState("");
  const [accountOwner, setAccountOwner] = useState("");
  const [accountAddress, setAccountAddress] = useState("");

  const backgroundRef = useRef(null);

  const fetchUsers = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) {
      throw new Error("error: response was not ok");
    }
    return res.json();
  };

  const { data, status, isLoading } = useQuery(["users"], fetchUsers);
  console.log(data);
  //console.log(status);

  // https://ledger-pay-backend.onrender.com/api/strapi-plugin-wyre/addDebitCard
  // `${process.env.NEXT_PUBLIC_STRAPI_URL}api/strapi-plugin-wyre/add-address`
  // `${process.env.NEXT_PUBLIC_STRAPI_URL}api/strapi-plugin-wyre/update-profile`
  //   console.log(
  //     `${process.env.NEXT_PUBLIC_STRAPI_URL}api/strapi-plugin-wyre/addDebitCard`
  //   );

  //   useEffect(async () => {
  //     if (isLoading === false) {
  //       // await fetchUsers();
  //       console.log(isLoading);
  //     }
  //   }, [isLoading]);

  async function updateData(data) {
    try {
      return await request(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}api/strapi-plugin-wyre/addDebitCard`,
        {
          method: "POST",
        }
      );
    } catch (e) {
      console.log("error", e);
    }
  }

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
                <span>Credit Card</span>
              </Tab>
              <Tab
                as="button"
                className="flex items-center justify-center w-1/2 py-2 rounded-lg cursor-pointer ui-selected:font-bold ui-selected:bg-gray-900"
              >
                <span>Bank Account</span>
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <div className="flex flex-col items-center justify-center w-full min-h-screen p-4">
                  <div className="flex flex-col items-center justify-center w-full p-4 h-[75vh] pt-8">
                    <div className="flex flex-col space-y-2">
                      <div className="flex flex-row space-y-2 w-full">
                        <div className="flex flex-row space-x-2 basis-1/4">
                          <label className="h-full py-2 text-left text-blue-400 w-40">
                            Card Number
                          </label>
                        </div>
                        <div className="flex flex-row space-x-2 basis-3/4">
                          <input
                            className="h-full px-2 py-2 text-center text-blue-400 placeholder-blue-400 bg-gray-700 border-none rounded-lg w-80 form-input focus:border-none focus:outline-none"
                            placeholder="1234 5678 9999 1234"
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex flex-row space-y-2 w-full">
                        <div className="flex flex-row space-x-2 basis-1/4">
                          <label className="h-full py-2 text-left text-blue-400 w-40">
                            CVC
                          </label>
                        </div>
                        <div className="flex flex-row space-x-2 basis-3/4">
                          <input
                            className="h-full px-2 py-2 text-center text-blue-400 placeholder-blue-400 bg-gray-700 border-none rounded-lg w-80 form-input focus:border-none focus:outline-none"
                            placeholder="123"
                            type="text"
                            value={cvc}
                            onChange={(e) => setCVC(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex flex-row space-y-2 w-full">
                        <div className="flex flex-row space-x-2 basis-1/4">
                          <label className="h-full py-2 text-left text-blue-400 w-40">
                            Name
                          </label>
                        </div>
                        <div className="flex flex-row space-x-2 basis-3/4">
                          <input
                            className="h-full px-2 py-2 text-center text-blue-400 placeholder-blue-400 bg-gray-700 border-none rounded-lg w-80 form-input focus:border-none focus:outline-none"
                            placeholder="Firstname Lastname"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex flex-row space-y-2 w-full">
                        <div className="flex flex-row space-x-2 basis-1/4">
                          <label className="h-full py-2 text-left text-blue-400 w-40">
                            Address
                          </label>
                        </div>
                        <div className="flex flex-row space-x-2 basis-3/4">
                          <input
                            className="h-full px-2 py-2 text-center text-blue-400 placeholder-blue-400 bg-gray-700 border-none rounded-lg w-80 form-input focus:border-none focus:outline-none"
                            placeholder="Street 123, NY, 10001 New York"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row items-center justify-center w-full h-1/4"></div>
                    <div className="flex flex-col items-center justify-center w-full">
                      <button className="flex items-center justify-center w-1/2 py-6 text-3xl font-bold text-blue-400 bg-purple-600 rounded lg:1/3 hover:bg-purple-300 hover:text-blue-100 sm:text-xl">
                        <span>Save</span>
                      </button>
                    </div>
                  </div>
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className="flex flex-col items-center justify-center w-full min-h-screen p-4">
                  <div className="flex flex-col items-center justify-center w-full p-4 h-[75vh] pt-8">
                    <div className="flex flex-col space-y-2">
                      <div className="flex flex-row space-y-2 w-full">
                        <div className="flex flex-row space-x-2 basis-1/4">
                          <label className="h-full py-2 text-left text-blue-400 w-40">
                            Account Number
                          </label>
                        </div>
                        <div className="flex flex-row space-x-2 basis-3/4">
                          <input
                            className="h-full px-2 py-2 text-center text-blue-400 placeholder-blue-400 bg-gray-700 border-none rounded-lg w-80 form-input focus:border-none focus:outline-none"
                            placeholder="1234 5678 9999 1234 5555 "
                            type="text"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex flex-row space-y-2 w-full">
                        <div className="flex flex-row space-x-2 basis-1/4">
                          <label className="h-full py-2 text-left text-blue-400 w-40">
                            Name
                          </label>
                        </div>
                        <div className="flex flex-row space-x-2 basis-3/4">
                          <input
                            className="h-full px-2 py-2 text-center text-blue-400 placeholder-blue-400 bg-gray-700 border-none rounded-lg w-80 form-input focus:border-none focus:outline-none"
                            placeholder="Firstname Lastname"
                            type="text"
                            value={accountOwner}
                            onChange={(e) => setAccountOwner(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex flex-row space-y-2 w-full">
                        <div className="flex flex-row space-x-2 basis-1/4">
                          <label className="h-full py-2 text-left text-blue-400 w-40">
                            Address
                          </label>
                        </div>
                        <div className="flex flex-row space-x-2 basis-3/4">
                          <input
                            className="h-full px-2 py-2 text-center text-blue-400 placeholder-blue-400 bg-gray-700 border-none rounded-lg w-80 form-input focus:border-none focus:outline-none"
                            placeholder="Street 123, NY, 10001 New York"
                            type="text"
                            value={accountAddress}
                            onChange={(e) => setAccountAddress(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row items-center justify-center w-full h-1/4"></div>
                    <div className="flex flex-col items-center justify-center w-full">
                      <button className="flex items-center justify-center w-1/2 py-6 text-3xl font-bold text-blue-400 bg-purple-600 rounded lg:1/3 hover:bg-purple-300 hover:text-blue-100 sm:text-xl">
                        <span>Save</span>
                      </button>
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

export default PaymentInformation;
