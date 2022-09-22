import { Tab } from "@headlessui/react";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../utils/queries";
import { addAddress } from "../utils/queries/cards";

const AddressPanel = () => {
  const [street1, setStreet1] = useState("");
  const [street2, setStreet2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  return (
    <Tab.Panel>
      <div className="flex flex-col items-center justify-center w-full min-h-screen p-4">
        <div className="flex flex-col items-center justify-center w-full p-4 h-[75vh] pt-8">
          <div className="flex flex-col space-y-2">
            <div className="flex flex-row w-full space-y-2">
              <div className="flex flex-row space-x-2 basis-1/4">
                <label className="w-40 h-full py-2 text-left text-blue-400">
                  Street
                </label>
              </div>
              <div className="flex flex-row space-x-2 basis-3/4">
                <input
                  className="h-full px-2 py-2 text-center text-blue-400 placeholder-blue-400 bg-gray-700 border-none rounded-lg w-80 form-input focus:border-none focus:outline-none"
                  placeholder="123 Main ST"
                  type="text"
                  value={street1}
                  onChange={(e) => setStreet1(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-row w-full space-y-2">
              <div className="flex flex-row space-x-2 basis-1/4">
                <label className="w-40 h-full py-2 text-left text-blue-400">
                  Street
                </label>
              </div>
              <div className="flex flex-row space-x-2 basis-3/4">
                <input
                  className="h-full px-2 py-2 text-center text-blue-400 placeholder-blue-400 bg-gray-700 border-none rounded-lg w-80 form-input focus:border-none focus:outline-none"
                  placeholder="Apt 123"
                  type="text"
                  value={street2}
                  onChange={(e) => setStreet2(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-row w-full space-y-2">
              <div className="flex flex-row space-x-2 basis-1/4">
                <label className="w-40 h-full py-2 text-left text-blue-400">
                  City
                </label>
              </div>
              <div className="flex flex-row space-x-2 basis-3/4">
                <input
                  className="h-full px-2 py-2 text-center text-blue-400 placeholder-blue-400 bg-gray-700 border-none rounded-lg w-80 form-input focus:border-none focus:outline-none"
                  placeholder="New York"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-row w-full space-y-2">
              <div className="flex flex-row space-x-2 basis-1/4">
                <label className="w-40 h-full py-2 text-left text-blue-400">
                  State
                </label>
              </div>
              <div className="flex flex-row space-x-2 basis-3/4">
                <input
                  className="h-full px-2 py-2 text-center text-blue-400 placeholder-blue-400 bg-gray-700 border-none rounded-lg w-80 form-input focus:border-none focus:outline-none"
                  placeholder="NY"
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-row w-full space-y-2">
              <div className="flex flex-row space-x-2 basis-1/4">
                <label className="w-40 h-full py-2 text-left text-blue-400">
                  Postal Code
                </label>
              </div>
              <div className="flex flex-row space-x-2 basis-3/4">
                <input
                  className="h-full px-2 py-2 text-center text-blue-400 placeholder-blue-400 bg-gray-700 border-none rounded-lg w-80 form-input focus:border-none focus:outline-none"
                  placeholder="12345"
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-row w-full space-y-2">
              <div className="flex flex-row space-x-2 basis-1/4">
                <label className="w-40 h-full py-2 text-left text-blue-400">
                  Country
                </label>
              </div>
              <div className="flex flex-row space-x-2 basis-3/4">
                <input
                  className="h-full px-2 py-2 text-center text-blue-400 placeholder-blue-400 bg-gray-700 border-none rounded-lg w-80 form-input focus:border-none focus:outline-none"
                  placeholder="US"
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center justify-center w-full h-1/4"></div>
          <div className="flex flex-col items-center justify-center w-full">
            <button
              onClick={() =>
                addAddress({
                  street1: street1 + street2,
                  city: city,
                  state: state,
                  postalCode: postalCode,
                  country: country,
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
  );
};

export default AddressPanel;
