import * as stytch from 'stytch';

let client;

const getStytch = () => {
  if (!client) {
    client = new stytch.Client({
      project_id: process.env.NEXT_PUBLIC_STYTCH_PROJECT_ID || '',
      secret: process.env.STYTCH_SECRET_KEY || '',
      env: process.env.NEXT_PUBLIC_PRODUCTION === 'true' ? stytch.envs.live : stytch.envs.test,
    });
  }

  return client;
};

export {getStytch};
