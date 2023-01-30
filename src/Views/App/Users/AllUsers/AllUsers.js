import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomTable from '../../../../Components/CustomTable/CustomTable';
import useMessageAlert from '../../../../Hooks/useMessageAlert';
import useModalManager from '../../../../Hooks/useModalManager';
import useRequest from '../../../../Hooks/useRequest';
import GeneralLayout from '../../../../Layouts/InnerLayouts/GeneralLayout';
import DeleteUserModal from '../../../../Modal/User/DeleteUserModal/DeleteUserModal';
import { NEW_USER_PATH } from '../../../../Paths';
import { Endpoints, FolderName } from '../../../../Utils/Endpoints';
import { ModalNames } from '../../../../Utils/ModalNames';
import { UserColumns } from './UsersColumns';

const AllUsers = () => {

    const request = useRequest();

    const { email } = useSelector(state => state.User);

    const { onModalUpdate } = useModalManager(ModalNames.DeleteUserModal);
    const { MessageElement, setMessage } = useMessageAlert('allUsersErrorMessage');

    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => { onModalUpdate('hidden', fetchData) }, [])
    useEffect(() => { fetchData() }, [])

    const fetchData = (page = 0, search = "") => {
        request('get', Endpoints(FolderName.USER).GET_ALL, { page, search }, true)
            .then(res => {
                setUsers(res.users);
                setTotalPages(res.totalPages)
                setLoaded(true);
            }).catch(e => setMessage(e, setLoaded))
    }

    return (
        <>
            {/* Modals */}
            <DeleteUserModal />

            {/* Content */}
            <GeneralLayout
                title="Usuarios"
                loaded={loaded}
                ErrorElement={MessageElement}
                rightSection={(
                    <Button size="sm" as={Link} to={NEW_USER_PATH}>+ Nuevo Usuario</Button>
                )}>
                <CustomTable
                    totalPages={totalPages}
                    onEventHandle={fetchData}
                    data={users}
                    columns={UserColumns(email)} />
            </GeneralLayout>
        </>
    )
}

export default AllUsers;