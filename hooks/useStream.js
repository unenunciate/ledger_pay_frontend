import { useEffect, useState, useReducer } from 'react';
import { Stream } from 'xstream';

const useStream = (s = null, initialState = null) => {
	const [current, setCurrent] = useState(initialState);
    const [stream, dispatchStream] = useReducer((state, action) => (action.payload ? state = Stream.from(action.payload) : state = null), s);

	useEffect(() => {
        let sub;

        if(stream !== null) {
            console.log(JSON.stringify(stream));
            sub = stream?.subscribe({
                next: setCurrent,
            });
        }

		return () => sub ? sub.unsubscribe() : null;
	}, [stream]);

	// Just return our current value, since that's the thing we're interested in
	// (to render) when using this hook:
	return {current, dispatchStream};
};

export default useStream;