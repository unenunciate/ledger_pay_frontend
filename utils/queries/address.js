import { wyreHeaders } from "./headers";

const addAddress = async (data) => {
  // Address Data: {"street1":"Mainstreet 34 Apt 77","city":"New York","state":"NY","postalCode":"10001","country":"US"}
  console.log(`Address Data from address.js: ${JSON.stringify(data)}`);

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

export { addAddress };
