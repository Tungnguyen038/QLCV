import { useEffect, useRef, useState } from "react";


function useLoading(timeout = 2000) {
    const [isLoading, setIsloading] = useState(true);
    const timeoutRef = useRef();
    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            setIsloading(false);
        }, timeout);
        return () => clearTimeout(timeoutRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return [isLoading, setIsloading];
}
export default useLoading;