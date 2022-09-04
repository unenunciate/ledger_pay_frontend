import { useEffect, useRef } from "react";

const useUpdateEffect = (effect, dependencies = []) => {
    const loadRef = useRef(false);
  
    useEffect(() => {
        if (loadRef.current === false) {
            loadRef.current = true;
        } else {
            return effect();
        }
    }, dependencies);
}

export default useUpdateEffect;