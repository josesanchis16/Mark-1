import { Endpoints, FolderName } from "../Utils/Endpoints";
import { StorageKeys } from "../Utils/StorageKeys";
import useRequest from "./useRequest";

const useCheckUser = () => {

    const request = useRequest();

    return async function () {

        let token = localStorage.getItem(StorageKeys.TOKEN)

        if (token) {
            return request('post', Endpoints(FolderName.USER).CHECK_USER, {}, true)
                .then(res => {
                    return res;
                })
                .catch(e => {
                    console.error(e);
                    return false;
                })
        } else {
            return false;
        }
    }
};


export default useCheckUser;