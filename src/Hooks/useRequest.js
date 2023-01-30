import axios from "axios";
import { GlobalConfig } from "../Configuration";
import { StorageKeys } from "../Utils/StorageKeys";

const useRequest = () => {

    return async function (method, url, obj, useToken = false) {
        let object = {
            apiKey: GlobalConfig.apiKey,
            ...obj
        }

        if (useToken) {
            let token = localStorage.getItem(StorageKeys.TOKEN)
            console.log({ token });
            object = { ...object, token }
        }

        const getResponse = (res) => {
            if (res.status === 200) {
                if (res.data.status) {
                    delete res.status;
                    console.log({ ...res });
                    return res.data;
                } else throw res.data.message;
            } else throw `${res.statusText}`;
        }

        switch (method) {
            case 'get':
                url = `${url}?`
                Object.keys(object).map(key => {
                    let value = object[key];
                    url += `${key}=${value}&`;
                })
                console.log({ url });
                return await axios.get(url)
                    .then(res => {
                        return getResponse(res);
                    }).catch(e => {
                        throw e.message || e;
                    })
            case 'post':
                return await axios.post(
                    url,
                    object, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8" //Avoid OPTIONS request
                    }
                })
                    .then(res => {
                        return getResponse(res);
                    })
                    .catch(e => {
                        throw e.message || e;
                    })
        }
    }
};


export default useRequest;