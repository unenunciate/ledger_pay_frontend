import '../styles/globals.css'

import { AuthProvider } from "../contexts/auth";
import { UpdateProvider } from "../contexts/update";
import { NotificationProvider } from "../contexts/notification";
import { CookiesProvider } from 'react-cookie';

const App = ({ Component, pageProps }) => {
  return (
    <CookiesProvider>
      <AuthProvider>
        <UpdateProvider>
          <NotificationProvider>
            <Component {...pageProps} />
          </NotificationProvider>
        </UpdateProvider>
      </AuthProvider>
    </CookiesProvider>
  );
}

export default App;
