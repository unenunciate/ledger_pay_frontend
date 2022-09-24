
import { getStytch } from 'stytch';

async function handler(req, res) {
  if (req.method === 'POST') { 
    const stytchClient = getStytch();
    
    const data = JSON.parse(req.body);
    try {
      
      await stytchClient.magicLinks.email.loginOrCreate({
        email: data.email,
        login_magic_link_url: `${process.env.NEXT_PUBLIC_NEXT_URL}/connect/validate/?token={}`,
        signup_magic_link_url: `${process.env.NEXT_PUBLIC_NEXT_URL}/connect/signup?token={}`,
      });
      return res.status(200).end();
    } catch (error) {
      const errorString = JSON.stringify(error);
      console.log(errorString);
      return res.status(400).json({ message: errorString });
    }
  } else {
    // Handle any other HTTP method
    return res.status(405).end();
  }
}

export default handler;
