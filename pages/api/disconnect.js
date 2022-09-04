import Cookies from 'cookies';

async function handler(req, res) {
  const cookies = new Cookies(req, res);
  // Delete the session cookie by setting maxAge to 0
  cookies.set('user', {}, { maxAge: 0 });

  return res.status(200).end();
}

export default handler;
