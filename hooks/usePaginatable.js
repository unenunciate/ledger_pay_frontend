import { useState } from "react";
import { useRouter } from 'next/router';
import useUpdateEffect from "./useUpdateEffect";

const usePaginatable = (p, pm, ep, l) => {
    const router = useRouter();

    const [page, setPage] = useState(p);
    const [pageMax, setPageMax] = useState(pm);

    const [list, setList] = useState(l);

    const [endpoint, setEndpoint] = useState(ep);

    const changePage = async () => {
        const url = `${endpoint}${String(endpoint).charAt(String(endpoint).length - 1) === '?' ? '' : '&'}page=${page}`;
        const res = await fetch({method: "get", url: url});
        const data = (JSON.parse(res.body))?.data;

        if (!data || data.results.length < 1) {
            setList([]);
            setPage(0);
            setPageMax(0);
        } else {
            setList(data.results);
        }

        router.push(url, url, {shallow: true});
    }

    const updateEndpoint = async () => {
        const url = `${endpoint}${String(endpoint).charAt(String(endpoint).length - 1) === '?' ? '' : '&'}page=1`;
        const res = await fetch({method: "get", url: url});
        const data = (JSON.parse(res.body))?.data;

        if (!data || data.results.length < 1) {
            setList([]);
            setPage(0);
            setPageMax(0);
        } else {
            setList(data.results);
            setPage(1);
            setPageMax(data.pageMax);
        }

        router.push(url, url, {shallow: true});
    }

    useUpdateEffect(() => {
        console.log(endpoint);
       // updateEndpoint();
    }, [endpoint]);

    useUpdateEffect(() => {
        console.log(page);
    //changePage();
    }, [page]);

    return {list, page, pageMax, setEndpoint, setPage, endpoint};
}

export default usePaginatable;
    