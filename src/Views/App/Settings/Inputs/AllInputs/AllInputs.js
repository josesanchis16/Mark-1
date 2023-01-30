import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CustomTable from '../../../../../Components/CustomTable/CustomTable';
import useMessageAlert from '../../../../../Hooks/useMessageAlert';
import useModalManager from '../../../../../Hooks/useModalManager';
import useRequest from '../../../../../Hooks/useRequest';
import GeneralLayout from '../../../../../Layouts/InnerLayouts/GeneralLayout';
import RemoveInputModal from '../../../../../Modal/Settings/RemoveInput/RemoveInputModal';
import { SETTINGS_NEW_INPUT_PATH } from '../../../../../Paths';
import { Endpoints, FolderName } from '../../../../../Utils/Endpoints';
import { ModalNames } from '../../../../../Utils/ModalNames';
import { InputsColumns } from './InputsColumns';

const AllInputsView = () => {

    const request = useRequest();

    const { MessageElement, setMessage } = useMessageAlert('articleMessageError');

    const { onModalUpdate } = useModalManager(ModalNames.RemoveInput);

    const [inputs, setInputs] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => fetchData(), []);
    useEffect(() => onModalUpdate('hidden', fetchData), [])

    const fetchData = (page = 0, search = '') => {
        request('get', Endpoints(FolderName.INPUT).GET_ALL, { page, search }, true)
            .then(res => {
                if (res.status) {
                    setInputs(res.inputs);
                    setTotalPages(res.totalPages || 1);
                    setLoaded(true);
                }
            }).catch(e => setMessage(e, setLoaded))
    }

    return (
        <>
            {/* Modals */}
            <RemoveInputModal />

            {/* Content */}
            <GeneralLayout
                loaded={loaded}
                ErrorElement={MessageElement}
                title='Entradas'
                rightSection={(
                    <Button size="sm" as={Link} to={SETTINGS_NEW_INPUT_PATH}>+ Nueva entrada</Button>
                )}>
                <CustomTable
                    totalPages={totalPages}
                    onEventHandle={fetchData}
                    data={inputs}
                    columns={InputsColumns()} />
            </GeneralLayout>
        </>
    )
}

export default AllInputsView;