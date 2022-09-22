import { useQuery } from "@tanstack/react-query";

const GET_ENDPOINT = `${process.env.NEXT_PUBLIC_STRAPI_URL}api/strapi-plugin-wyre/get-debit-card`;

const useCards = () => {
  const {
    data: cards,
    isLoading,
    error,
  } = useQuery(["cards"], () =>
    fetch(GET_ENDPOINT).then((resp) => resp.json())
  );

  return { cards, isLoading, error };
};

export default useCards;
