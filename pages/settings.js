import Head from "next/head";

import dynamic from "next/dynamic";

import Header from "../components/Header";
import CardInfo from "../components/CardInfo";
import BankInfo from "../components/BankInfo";

import {
  QueryClient,
  dehydrate
} from '@tanstack/react-query';

import useAuth from "../hooks/useAuth";
import { useState } from "react";
import useWorldId from "../hooks/useWorldId";

import { useAccount } from "@web3modal/react";

const WorldIDWidget = dynamic(
  () => import("@worldcoin/id").then((mod) => mod.WorldIDWidget),
  { ssr: false }
);

const Settings = ({ }) => {
  const { user, recoveryMode, setRecoveryMode, triggerEthereumLogin } =
    useAuth();
  const { updateAction, onVerificationSuccess } = useWorldId();
  const [openCI, setOpenCI] = useState(false);
  const [openBI, setOpenBI] = useState(false);

  const { address } = useAccount();

  return (
    <div className="w-full h-full">
      <Head>
        <title>LedgerPay - Settings</title>
      </Head>

      <Header />

      <div className="min-h-[90vh] w-full justify-center items-center bg-gray-800 flex">
        <section className="flex flex-col items-center justify-center w-full max-h md:w-3/4 xl:w-1/2">
          <div className="flex flex-col items-center justify-center w-full space-y-6 text-blue-400">
            {
              <>
                <div className="flex flex-col items-center justify-center space-y-2">
                  <span>Payment Information</span>
                  <button
                    className="flex items-center justify-center w-48 h-12 bg-purple-600 rounded-lg text-bold hover:border-pruple-300 hover:text-blue-100 hover:bg-purple-300 active:scale-75"
                    onClick={() => {
                      setOpenCI(true);
                    }}
                  >
                    <span>Debit Card</span>
                  </button>
                  <CardInfo open={openCI} setOpen={setOpenCI} tab={0} />
                  <button
                    className="flex items-center justify-center w-48 h-12 bg-purple-600 rounded-lg text-bold hover:border-pruple-300 hover:text-blue-100 hover:bg-purple-300 active:scale-75"
                    onClick={() => {
                      setOpenBI(true);
                    }}
                  >
                    <span>Bank Account</span>
                  </button>
                  <BankInfo open={openBI} setOpen={setOpenBI} tab={0} />
                </div>
                <div className="flex flex-col items-center justify-center space-y-2"></div>
              </>
            }
          </div>

          <div className="flex flex-col items-center justify-center w-full space-y-6 text-blue-400">
            {user?.worldcoinSetup ? (
                <>
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <span>Worldcoin Recovery</span>
                    <button
                      className="flex items-center justify-center w-24 h-12 bg-purple-600 rounded-lg text-bold hover:border-pruple-300 hover:text-blue-100 hover:bg-purple-300 active:scale-75"
                      onClick={() => {
                        setRecoveryMode(true);
                        triggerEthereumLogin();
                      }}
                    >
                      <span>Connect</span>
                    </button>
                    <button
                      className="flex items-center justify-center w-24 h-12 bg-purple-600 rounded-lg text-bold hover:border-pruple-300 hover:text-blue-100 hover:bg-purple-300 active:scale-75"
                      disabled={!recoveryMode}
                      onClick={() => updateAction("recover")}
                    >
                      <span>Recover</span>
                      <WorldIDWidget
                        actionId={process.env.NEXT_PUBLIC_WORLD_ID_ACTION_ID}
                        signal={`${recoveryMode ? address : ""}`}
                        enableTelemetry
                        onSuccess={(verificationResponse) =>
                          onVerificationSuccess(verificationResponse)
                        }
                        onError={(error) => console.error(error)}
                      />
                    </button>

                    <button
                      className="flex items-center justify-center w-24 h-12 bg-purple-600 rounded-lg text-bold hover:border-pruple-300 hover:text-blue-100 hover:bg-purple-300 active:scale-75"
                      onClick={() => updateAction("revoke")}
                    >
                      <span>Disable</span>
                    </button>

                    <button
                    className="flex items-center justify-center w-24 h-12 bg-purple-600 rounded-lg text-bold hover:border-pruple-300 hover:text-blue-100 hover:bg-purple-300 active:scale-75"
                    onClick={() => updateAction("approve")}
                  >
                    <span>Enable</span>
                  </button>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-2"></div>
                 
                </>
              ) : (
              <>
                <span>Worldcoin Recovery</span>
                <WorldIDWidget
                  actionId={process.env.NEXT_PUBLIC_WORLD_ID_ACTION_ID}
                  signal={`${address}`}
                  enableTelemetry
                  onSuccess={(verificationResponse) =>
                    onVerificationSuccess(verificationResponse)
                  }
                  onError={(error) => console.error(error)}
                />
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;


export async function getServerSideProps(context) {
  const queryClient = new QueryClient();

  return {
      props: {
          dehydratedState: dehydrate(queryClient),
          token: context.resolvedUrl?.searchParameters?.token ?? null
      },
  }
}