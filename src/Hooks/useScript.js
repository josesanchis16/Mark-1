import { useEffect } from 'react';

const useScript = (url, guid) => {
    useEffect(() => {
        const div = document.getElementById("main__div__container");
        div.setAttribute('guid', guid);

        let script = document.createElement('script');
        script.async = true;
        script.src = url;
        div.appendChild(script)
    }, [url, guid]);
};

export default useScript;