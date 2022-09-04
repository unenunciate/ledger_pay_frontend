import { initStytch, StytchProvider } from '@stytch/stytch-react';
import { createContext, useState, useMemo, useEffect} from 'react';
import useUpdateEffect from '../hooks/useUpdateEffect';
import useStream from '../hooks/useStream';
import { useCookies }  from 'react-cookie';
import * as ethers from 'ethers';
import axios from 'axios';
import { isEmpty } from 'lodash';

const AuthContext = createContext(null);

const temp = {profileImage:"https://pbs.twimg.com/profile_images/1438589426158952453/2qo7fieI_400x400.jpg", username: "", first_name: "", completedProfile: false};

const stytchOptions = {
    
}

const AuthProvider = ({children}) => {
    const [user, setUser] = useState({});

    const [wallet, setWallet] = useState({});
    const [provider, setProvider] = useState(ethers.getDefaultProvider('https://polygon-mumbai.gateway.pokt.network/v1/lb/62ff2f0b852035003a873a88'));
    const [repolled, setRepolled] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const stytch = useMemo(() => (initStytch(process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN, stytchOptions)), [stytchOptions]);

    useEffect(() => {
        if(cookies.user?.id !== user?.id || !isEmpty(cookies.user) && isEmpty(user) || repolled) {
            console.log(cookies.user);
            setUser(cookies.user);
            setRepolled(false);
        }
    }, [cookies]);
    

    useUpdateEffect(() => {
        if(user?.sessionWithWallet) {
            const signer = ethers.Signer.connect(provider);
            signer.connect(provider)
            setWallet(signer);
        }
    }, [user])

    const triggerEmailLogin = async (email) => {

        const req = await fetch(`${process.env.NEXT_PUBLIC_NEXT_URL}/api/connect`, {
            url: `${process.env.NEXT_PUBLIC_NEXT_URL}/api/connect/index`,
            method: 'POST',
            body: JSON.stringify({
              email,
            })
        });

        if(req.status === 200) {
          //  const data = JSON.parse(req.body);
          //  listenForConnection(data.sessionId);
        } else {
           console.log({message: JSON.stringify(req.status)});
        }
    };

    const listenForConnection = async (sessionId) => {
        //TO DO: setup socket to listen to next for when next recieves callback from stytch then set cookie
    }

    const triggerEthereumLogin = async () => {
        /* Request user's wallet address */
        const [crypto_wallet_address] = await window.ethereum.request({
            method: 'eth_requestAccounts',
        });

        /* Ask Stytch to generate a challenge for the user */
        const { challenge } = await stytch.cryptoWallets.authenticateStart({
        crypto_wallet_address,
        crypto_wallet_type: 'ethereum',
        });

        /* Ask the user's browser to sign the challenge */
        const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [challenge, crypto_wallet_address],
        });

        /* Send the signature back to Stytch for validation */
        const s = await stytch.cryptoWallets.authenticate({
            crypto_wallet_address,
            crypto_wallet_type: 'ethereum',
            signature,
            session_duration_minutes: 120,
        });

        const registerURL = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/findFromStytchID?stytchId=${s.user_id}&stytchAuthMethod=Wallet&authIdentifier=${crypto_wallet_address}`;
        //const req = await fetch(registerURL, {method: "POST", url: registerURL, data: JSON.stringify({stytchId: s.data.id})});
        const req = await axios(registerURL);

        console.log(req.data);
   
        setCookie('user', req.data?.user ? {...req.data.user, stytchStrapiId:req.data.id, sessionWithWallet: true} : { stytchStrapiId:req.data.id, sessionWithWallet: true }, {maxAge:120}); 
    };

    const updateUser = (updates) => {
        setRepolled(true);
        setCookie('user', {...updates,...cookies.user}, {maxAge:120})
    }

    const disconnect = async () => {
        await stytch.session.revoke();
        const req = await fetch({method: 'POST', url: `${NEXT_PUBLIC_NEXT_URL}/api/disconnect`});
        removeCookie('user', {});
    };

    return (
        <AuthContext.Provider value={{user, setUser, stytch, wallet, triggerEmailLogin, triggerEthereumLogin, disconnect, updateUser}} >
            <StytchProvider stytch={stytch}>
                {children}
            </StytchProvider>
        </AuthContext.Provider>
    )
}

export {
    AuthContext,
    AuthProvider
}