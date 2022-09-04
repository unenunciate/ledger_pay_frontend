import { initStytch, StytchProvider } from '@stytch/stytch-react';
import { createContext, useState, useMemo} from 'react';

const UpdateContext = createContext(null);


const UpdateProvider = ({children}) => {
 

    return (
        <UpdateContext.Provider value={{}} >
            {children}
        </UpdateContext.Provider>
    )
}

export {
    UpdateContext,
    UpdateProvider
}