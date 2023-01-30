import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import useMessageAlert from "../../../Hooks/useMessageAlert";
import useModalManager from "../../../Hooks/useModalManager";
import useRequest from "../../../Hooks/useRequest";
import ModalLayout from "../../../Layouts/ModalLayout/ModalLayout";
import { Endpoints, FolderName } from "../../../Utils/Endpoints";
import { hideModals } from "../../../Utils/GeneralFunctions";
import { ModalNames } from "../../../Utils/ModalNames";

const RemoveInputModal = () => {

    const request = useRequest();

    const { MessageElement, setMessage } = useMessageAlert('removeInputErrorModal');
    const { getModalData } = useModalManager(ModalNames.RemoveInput);

    const [guid, setGuid] = useState('');

    useEffect(() => {
        getModalData(({ guid }) => setGuid(guid));
    }, [])

    const handleSubmit = () => {
        request('post', Endpoints(FolderName.INPUT).DELETE, { guid }, true)
            .then(res => { hideModals() })
            .catch(setMessage)
    }

    return (
        <ModalLayout
            title="Eliminar entrada"
            id={ModalNames.RemoveInput}
            footer={(
                <>
                    <Button size="sm" onClick={hideModals} variant="link" className="text-decoration-none text-secondary">Cancelar</Button>
                    <Button size="sm" onClick={handleSubmit} variant="danger">Eliminar</Button>
                </>
            )}>
            <MessageElement className="my-0" />
            <Form onSubmit={handleSubmit} className='p-2'>
                <p className="mb-0">Realmente desea eliminar la entrada?</p>
                <small><b><i>**Esta acción no se puede deshacer**</i></b></small>
            </Form>
        </ModalLayout>
    )
}
export default RemoveInputModal;