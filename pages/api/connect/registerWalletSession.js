
import {getStytch} from '../../../utils/stytch';
import axios from 'axios';

async function handler(req, res) {

  if (req.method === 'POST') { 
    console.log("here 1")
    const data = req.body;
    console.log(JSON.stringify(data));
    let list
    //`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/findFromStytchId?stytchId=${data.stytchId}&stytchAuthMethod=Wallet&authIdentifier=${data.authIdentifier}
    const u = "https://strapi-slim-chance-backend.onrender.com/api/findFromStytchID?stytchId=user-test-2ce85f07-1b51-4a0d-835b-b1771edfdae9&stytchAuthMethod=Wallet&authIdentifier=0xe0a95bde2672bbd12263c31bf818384ca4dfea87";
    try {
      list = await axios.get({ url: u, headers: {
        "Content-Type": "text/plain",
        "Accept": "*/*",
        "Host": `${process.env.NEXT_PUBLIC_STRAPI_URL}`,
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
        "Access-Control-Allow-Origin":"*"
      }})
      list = list.body;   // 'Content-Type': 'application/x-www-form-urlencoded',
      /** 
      if(list?.length) {
        list = list.find((item)=> {
            return item.stytchId === data.stytchId;
        })
      }
      */
      console.log("here 3")
      list.sessionWithWallet = true;
      console.log( list  + "list should before");
      res.body = JSON.stringify(list)   
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