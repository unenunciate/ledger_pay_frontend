import { initStytch, StytchProvider } from '@stytch/stytch-react';
import { createContext, useState, useMemo} from 'react';

const NotificationContext = createContext(null);


const NotificationProvider = ({children}) => {
 

    return (
        <NotificationContext.Provider value={{}} >
            {children}
        </NotificationContext.Provider>
    )
}

export {
    NotificationContext,
    NotificationProvider
}