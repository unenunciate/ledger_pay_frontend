import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const Signup = () => {
  const { user, updateUser, isConnected, triggerEthereumLogin } = useAuth();

  const router = useRouter();

  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');

  const [invalidEmail, setInvalidEmail] = useState(true);
  const [invalidPhone, setInvalidPhone] = useState(true);
  const [invalidBirthday, setInvalidBirthday] = useState(true);

  const isValidEmail = (emailValue) => {
    const regex = /\S+@\S+\.\S+/;

    let result;

    String(emailValue).length > 5 ? result = regex.test(emailValue) : result = false;

    setInvalidEmail(!result);
  };

  const isValidPhone = (phoneValue) => {
    const regex = /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g;
    setInvalidPhone(!regex.test(phoneValue));
  };

  const isValidBirthday = (birthdayValue) => {
    const regex = /^(?:0[1-9]|[12]\d|3[01])([\/.-])(?:0[1-9]|1[012])\1(?:19|20)\d\d$/;
    setInvalidBirthday(!regex.test(birthdayValue));
  };

  const onSignupSubmit = async (e) => {
    e.preventDefault();

    let res;

    res = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/strapi-stytch-provider/createStytch`, {stytchUUID: res.data.user_id});

    if(!invalidEmail || !invalidPhone || !invalidBirthday) {
      res = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/strapi-stytch-provider/createUserFromStytch`, {username, firstName, lastName, email, phone, birthday, stytches: [res.data.id]});
    }
    
    if(res?.user?.username) {
      updateUser(res.data.user);
    }
  };

  useEffect(() => {
    if(isConnected()) {
      router.push('/');
    } 
  }, [user])
  
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen bg-gradient-to-b from-purple-600 to-blue-400'>
      <section className='flex flex-col items-center justify-center w-5/6 py-6 pb-6 bg-gray-800 shadow-xl rounded-xl md:w-3/4 lg:w-1/2 2xl:w-1/3 shadow-gray-800'>
        <Link href={"https://www.ledgepay.io"}><a className="flex items-center h-full px-6 rounded-lg hover:bg-gray-900"><Image width={32} height={32} src="/LedgePay.png" layout="fixed" /></a></Link>
       
        <div className='w-3/4 h-full space-y-6'>
          <form onSubmit={onSignupSubmit} className={`w-full flex flex-col space-y-12 justify-center items-center ${false ? 'invisiable' : ''}`}>
              <input
                className={`h-full px-2 py-2 text-center text-blue-400 placeholder-blue-400 bg-gray-700 border-none rounded-lg w-full form-input focus:border-none focus:outline-none`}
                placeholder='Email'
                value={email}
                onChange={(e) => {
                  isValidEmail(e.target.value);
                  setEmail(e.target.value);
                }}
                type="text"
              />

            <input
                className={`h-full px-2 py-2 text-center text-blue-400 placeholder-blue-400 bg-gray-700 border-none rounded-lg w-full form-input focus:border-none focus:outline-none`}
                placeholder='Phone'
                value={phone}
                onChange={(e) => {
                  isValidPhone(e.target.value);
                  setPhone(e.target.value);
                }}
                type="text"
              />

              <input
                className={`h-full px-2 py-2 text-center text-blue-400 placeholder-blue-400 bg-gray-700 border-none rounded-lg w-full form-input focus:border-none focus:outline-none`}
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
              />

              <input
                className={`h-full px-2 py-2 text-center text-blue-400 placeholder-blue-400 bg-gray-700 border-none rounded-lg w-full form-input focus:border-none focus:outline-none`}
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
              />

              <input
                className={`h-full px-2 py-2 text-center text-blue-400 placeholder-blue-400 bg-gray-700 border-none rounded-lg w-full form-input focus:border-none focus:outline-none`}
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
              />

            <input
                className={`h-full px-2 py-2 text-center text-blue-400 placeholder-blue-400 bg-gray-700 border-none rounded-lg w-full form-input focus:border-none focus:outline-none`}
                placeholder='Birthday'
                value={birthday}
                onChange={(e) => {
                  isValidBirthday(e.target.value);
                  setBirthday(e.target.value);
                }}
                type="text"
              />

              <button onClick={() => triggerEthereumLogin()} className={`relative w-2/3 shadow-sm font-bold shadow-purple-600 hover:shadow-purple-300 text-blue-400 py-2 bg-purple-600 rounded-lg text-bold hover:border-pruple-300 hover:text-blue-100 hover:bg-purple-300 active:scale-75`} >
                <span className='w-full text-center'>Wallet</span>
              </button>

              <input disabled={(!invalidEmail || !invalidPhone || invalidBirthday) || firstName.length < 3 || lastName.length < 3 || username.length < 3 } className='relative w-2/3 py-2 font-bold text-blue-400 bg-purple-600 shadow-md shadow-purple-600 hover:shadow-purple-300 rounded-xl text-bold hover:border-pruple-300 hover:text-blue-100 hover:bg-purple-300 active:scale-75' type="submit" value="Submit" />
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
