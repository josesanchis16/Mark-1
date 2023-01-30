import { encryptString } from "../Utils/GeneralFunctions";
import { Roles } from "../Utils/Roles";
import { StorageKeys } from "../Utils/StorageKeys";

const useRoleManagement = () => {

    const role = localStorage.getItem(StorageKeys.ROLE);

    return {
        isSuperAdmin: role === encryptString(Roles[0].name),
        isAdmin: role === encryptString(Roles[1].name),
        isWorker: role === encryptString(Roles[2].name)
    }
};


export default useRoleManagement;