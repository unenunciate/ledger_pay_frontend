import { useQuery } from "@tanstack/react-query";

const GET_ENDPOINT = `${process.env.NEXT_PUBLIC_STRAPI_URL}api/strapi-plugin-wyre/get-bank-accounts`;

const useBankAccounts = () => {
  const {
    data: bankAccounts,
    isLoading,
    error,
  } = useQuery(["bankAccounts"], () =>
    fetch(GET_ENDPOINT).then((resp) => resp.json())
  );

  return { bankAccounts, isLoading, error };
};

export default useBankAccounts;
