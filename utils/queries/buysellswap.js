import { wyreHeaders } from "./headers";

// const getBankAccounts = async () => {
//   const GET_ENDPOINT = `${process.env.NEXT_PUBLIC_STRAPI_URL}api/strapi-plugin-wyre/get-bank-account`;
//   const settings = {
//     method: "GET",
//     headers: wyreHeaders,
//   };

//   try {
//     const response = await fetch(GET_ENDPOINT, settings);

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     return response.json();
//   } catch (error) {
//     console.error("There was an error!", error.toString());
//   }
// };

const buyCrypto = async (data) => {
  // Data: {"amount": "90","sourceCurrency": "USD","destCurrency": "ETH","dest": "0x9E01E0E60dF079136a7a1d4ed97d709D5Fe3e341"}
  console.log(`Data: ${JSON.stringify(data)}`);

  const CREATE_ENDPOINT = `${process.env.NEXT_PUBLIC_STRAPI_URL}api/strapi-plugin-wyre/create-payment-order`;

  const settings = {
    method: "POST",
    headers: wyreHeaders(),
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(CREATE_ENDPOINT, settings);

    if (!response.ok) {
      throw new Error("Network response was not ok", response);
    }

    return response.json();
  } catch (error) {
    console.error("There was an error!", error.toString());
  }
};

// const addAddress = async (data) => {
//   // Address Data: {"street1":"Mainstreet 34 Apt 77","city":"New York","state":"NY","postalCode":"10001","country":"US"}
//   console.log(`Address Data from bankaccounts.js: ${JSON.stringify(data)}`);

//   const CREATE_ADDRESS_ENDPOINT = `${process.env.NEXT_PUBLIC_STRAPI_URL}api/strapi-plugin-wyre/add-address`;

//   const settings = {
//     method: "POST",
//     headers: wyreHeaders,
//     body: JSON.stringify(data),
//   };

//   try {
//     const response = await fetch(CREATE_ADDRESS_ENDPOINT, settings);

//     if (!response.ok) {
//       throw new Error("Network response was not ok", response);
//     }

//     return response.json();
//   } catch (error) {
//     console.error("There was an error!", error.toString());
//   }
// };

export { buyCrypto };
