import {useEffect, useRef, useState} from "react";

const useTimeout = (callback, delay) => {
    const timeoutRef = useRef(null);
    const timeoutTimestamp = useState(0);

    const delayRef = useRef(delay);

    const savedCallback = useRef(callback);

    const updateDelay = (newDelay) => {
        delayRef.current = newDelay;
        window.clearTimeout(timeoutRef.current);
    }

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const tick = () => savedCallback.current();

        if (typeof delay.current === 'number' && delay.current !== 0) {
            timeoutRef.current = window.setTimeout(tick, delay.current);
            setTimeoutTimestamp(Date.now());
            return () => window.clearTimeout(timeoutRef.current);
        }
    }, [delayRef.current]);

    return {timeoutRef, updateDelay, timeoutTimestamp, delayRef};
};

export default useTimeout;