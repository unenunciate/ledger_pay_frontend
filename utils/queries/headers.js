import {makeHeaderValueString} from '../ClientConfigurations'

const covalentHeaders = () => {
  const encode = Buffer.from(process.env.NEXT_PUBLIC_COVALENT_API_KEY + ":");
  const encoded = encode.toString("base64");

  return new Headers({
    Authorization: `Basic ${encoded}`,
    Accept: "*/*",
    Connection: "keep-alive",
    "Content-Type": "application/json",
  });
};
const strapiHeaders = () => {
  return new Headers({
    Accept: "*/*",
    Connection: "keep-alive",
    "Content-Type": "application/json",
  });
};
const wyreHeaders = () => {
  return new Headers({
    Accept: "application/json",
    Connection: "keep-alive",
    "Content-Type": "application/json",
  });
};
const bundlerHeaders = (chainId) => {
  return new Headers({
    Accept: "*/*",
    Connection: "keep-alive",
    "Content-Type": "application/json",
    'Bundler-Utilize-Configuration': makeHeaderValueString(chainId)
  });
};

export { strapiHeaders, covalentHeaders, wyreHeaders, bundlerHeaders};
