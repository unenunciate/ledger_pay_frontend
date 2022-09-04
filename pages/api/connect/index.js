
import {getStytch} from '../../../utils/stytch';

async function handler(req, res) {
  console.log("1")
  if (req.method === 'POST') { 
    const stytchClient = getStytch();
    const data = JSON.parse(req.body);
    console.log("2")
    try {
      
      await stytchClient.magicLinks.email.loginOrCreate({
        email: data.email,
        login_magic_link_url: `${process.env.NEXT_PUBLIC_NEXT_URL}/connect/validate/withMagic?token={}`,
        signup_magic_link_url: `${process.env.NEXT_PUBLIC_NEXT_URL}/connect/signup?token={}`,
      });
      console.log("3");
      return res.status(200).end();
    } catch (error) {
      const errorString = JSON.stringify(error);
      console.log(errorString);
      return res.status(400).json({ message: errorString });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default handler;
