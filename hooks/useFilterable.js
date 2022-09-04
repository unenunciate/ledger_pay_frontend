import { useState, useCallback } from "react";

import serialize from '../utils/serialize';

const useFilterable = (fq = []) => {
    const [filterQuery, setFilterQuery] = useState(fq);
    const [filterQueryString, setFilterQueryString] = useState('');

    const updateFilterQuery = useCallback((toUpdate) => {
        const filtered = filterQuery.filter((filter) => (filter.id === toUpdate.id))
        const withUpdate = [...filtered, toUpdate];
        
        setFilterQuery(withUpdate);

        if(withUpdate.length > 0) {
            setFilterQueryString(serialize(withUpdate)); 
        } else {
            setFilterQueryString('');
        }
    }, [filterQuery]);

    return {filterQuery, updateFilterQuery, filterQueryString};
}

export default useFilterable;