import { wyreHeaders } from "./headers";

const getCards = async () => {
  const GET_ENDPOINT = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/strapi-plugin-wyre/get-debit-card`;
  const settings = {
    method: "GET",
    headers: wyreHeaders(),
  };

  try {
    const response = await fetch(GET_ENDPOINT, settings);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  } catch (error) {
    console.error("There was an error!", error.toString());
  }
};

const addCard = async (data) => {
  // Data: {"number":"7676444455556874","cvv":"777","month":"7","year":"27","issuer":"VISA","nickname":"xxxx xxxx xxxx 6874"}
  console.log(`Data: ${JSON.stringify(data)}`);

  // const CREATE_ENDPOINT = `${process.env.NEXT_PUBLIC_STRAPI_URL}api/strapi-plugin-wyre/add-debit-card`;
  const CREATE_ENDPOINT = `${process.env.NEXT_PUBLIC_STRAPI_URL}api/strapi-plugin-wyre/add-debit-card`;

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

const addAddress = async (data) => {
  // Address Data: {"street1":"Mainstreet 12Apt 645","city":"Boston","state":"NY","postalCode":"54217","country":"US"}
  console.log(`Address Data: ${JSON.stringify(data)}`);

  const CREATE_ADDRESS_ENDPOINT = `${process.env.NEXT_PUBLIC_STRAPI_URL}api/strapi-plugin-wyre/add-address`;

  const settings = {
    method: "POST",
    headers: wyreHeaders(),
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(CREATE_ADDRESS_ENDPOINT, settings);

    if (!response.ok) {
      throw new Error("Network response was not ok", response);
    }

    return response.json();
  } catch (error) {
    console.error("There was an error!", error.toString());
  }
};

export { getCards, addCard, addAddress };
