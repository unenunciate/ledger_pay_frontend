import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const Signup = () => {
  const { user, updateUser } = useAuth();

  const router = useRouter();

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');

  const [credential, setCredential] = useState('');

  const [invalidEmail, setInvalidEmail] = useState(true);
  const [invalidPhone, setInvalidPhone] = useState(true);

  const isValidEmail = (emailValue) => {
    const regex = /\S+@\S+\.\S+/;

    let result;

    String(emailValue).length > 5 ? result = regex.test(emailValue) : result = false;

    return result;
  };

  const isValidPhone = (phoneValue) => {
    const regex = /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g;
    return regex.test(phoneValue);
  };

  const onCredentialChange = (c) => {
    setCredential(c);

    if (isValidEmail(c)) {
      setInvalidEmail(false);
    } else {
      setInvalidEmail(true);
    }

    if (isValidPhone(c)) {
      setInvalidPhone(false);
    } else {
      setInvalidPhone(true);
    }
  };

  const onSignupSubmit = async (e) => {
    e.preventDefault();

    let res;

    if(!invalidEmail || !invalidPhone) {
      res = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/stytches/createUserWithCredential?credential=${credential}`, invalidEmail ? {phone: credential, username, name, pasword: "notusedXXAS"} : {email: credential, username, name, pasword: "notusedXXAS"});
    }
    
    if(res?.data) {
      updateUser(res.data);
    }
  };

  useEffect(() => {
    if(user?.id) {
      router.push('/');
    } 
  }, [user])
  
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen bg-gradient-to-b from-green-600 to-orange-600'>
      <section className='flex flex-col items-center justify-center w-5/6 pb-6 bg-gray-300 rounded-xl shadow-xl boarder-2 boarder-gray-500 md:w-3/4 lg:w-1/2 2xl:w-1/3 shadow-gray-500'>
        <Link href='https://www.ledgerpay.com'><a className='items-center w-1/3 my-12 text-2xl text-center text-white'>LedgerPay</a></Link>

        <div className='flex items-center w-3/4 h-16 mb-4'/>
       
        <div div className='w-3/4 h-full space-y-6'>
          <form onSubmit={onSignupSubmit} className={`w-full flex flex-col space-y-12 justify-center items-center ${false ? 'invisiable' : ''}`}>
              <input
                className={`w-full bg-gray-300 border-2 border-gray-500 text-gray-500 rounded-xl text-center px-2 py-2 shadow-xl shadow-gray-500`}
                placeholder='Email or Phone'
                value={credential}
                onChange={(e) => onCredentialChange(e.target.value)}
                type="text"
              />

              <input
                className={`w-full bg-gray-300 border-2 border-gray-500 text-gray-500 rounded-xl text-center px-2 py-2 shadow-xl shadow-gray-500`}
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
              />

              <input
                className={`w-full bg-gray-300 border-2 border-gray-500 text-gray-500 rounded-xl text-center px-2 py-2 shadow-xl shadow-gray-500`}
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              />

              <input disabled={(!invalidEmail || !invalidPhone) || name.length < 3 || username.length < 3 } className='w-2/3 h-8 shadow-xl border-2 shadow-green-400 text-green-600 border-green-600 bg-gray-300 rounded-xl text-bold hover:border-green-400 hover:text-green-400 hover:bg-gray-100 active:scale-75' type="submit" value="Submit" />
            </form>
        </div>
      </section>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  // Get the token out of query parameters from the magic link redirect
  /**let token;

  try {
    token = context.query.token[1];
  } catch { }

  const address = context.query?.address;

  // If no token is present, something went wrong. Display an error.
  if (!token && !address) {
    return { props: { error: 'No magic link token or address present.' } };
  }
  if(token) {
        try {
            // Validate the token with Stytch, and create a session.
            const stytch = getStytch();
            const response = await stytch.magicLinks.authenticate(token, {
            session_duration_minutes: 30,
            });

            // Save Stytch session to a cookie
            const cookies = new Cookies(context.req, context.res);
            cookies.set('api_webauthn_session', response.session_token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 30, // 30 minutes
            });

            
            return {
            props: {
                validationMethod: '',
                creditential: ''
            },
            };
        } catch (error) {
            // If authenticate fails display the error.
            return { props: { error: JSON.stringify(error) } };
        }
    } else if(address) {

    }
    */
   return { props: {}}
};

export default Signup;
