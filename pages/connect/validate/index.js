import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useStytchUser, useStytchLazy } from '@stytch/stytch-react';

const OAUTH_TOKEN = 'oauth';
const MAGIC_LINKS_TOKEN = 'magic_links';

const Validate = () => {
  const user = useStytchUser();
  const stytch = useStytchLazy();
  const router = useRouter();

  useEffect(() => {
    const stytch_token_type = router?.query?.stytch_token_type?.toString();
    const token = router?.query?.token?.toString();
    if (token && stytch_token_type === OAUTH_TOKEN) {
      stytch.oauth.authenticate(token, {
        session_duration_minutes: 30,
      });
    } else if (token && stytch_token_type === MAGIC_LINKS_TOKEN) {
      stytch.magicLinks.authenticate(token, {
        session_duration_minutes: 30,
      });
    }
  }, [router, stytch]);

  useEffect(() => {
    if (typeof window && user) {
      router.replace('/profile');
    }
  }, [router, user]);

  return <><div className='w-full h-screen bg-green-600'></div></>;
};

export const getServerSideProps = async (context) => {
  // Get the token out of query parameters from the magic link redirect
  const token = context.query.token[1];

 // const nextSession = context.res.cookies("nextSession");

  // If no token is present, something went wrong. Display an error.
  if (!token) {
    return { props: { error: 'No magic link token present.' } };
  }

  try {
    console.log(token);
    // Validate the token with Stytch, and create a session.
    const stytch = loadStytch();
    const response = await stytch.magicLinks.authenticate(token, {
      session_duration_minutes: 30,
    });
    console.log('b')
    // Save Stytch session to a cookie
    const cookies = new Cookies(context.req, context.res);
    cookies.set('api_webauthn_session', response.session_token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 30, // 30 minutes
    });

    // Redirect user to a profile page for second factor authentication
    return {
      redirect: {
        permanent: false,
        destination: '/account/profile',
      },
    };
  } catch (error) {
    // If authenticate fails display the error.
    return { props: { error: JSON.stringify(error) } };
  }
};

export default Validate;