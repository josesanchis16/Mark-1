import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import useMessageAlert from "../../../Hooks/useMessageAlert";
import useModalManager from "../../../Hooks/useModalManager";
import useRequest from "../../../Hooks/useRequest";
import { Endpoints } from "../../../Utils/Endpoints";
import { hideModals } from "../../../Utils/GeneralFunctions";
import { ModalNames } from "../../../Utils/ModalNames";

const DeleteRecordModal = () => {

    const { ErrorElement, setErrorMessage } = useMessageAlert('errorMessage');

    const { getModalData } = useModalManager(ModalNames.DeleteRecordModal);

    const post = useRequest();

    const [guid, setGuid] = useState('');

    useEffect(() => {
        getModalData(({ guid }) => setGuid(guid));
    })

    const handleSubmit = (e) => {
        e && e.preventDefault();
        post(Endpoints.DELETE_RECORD, { guid }, true)
            .then(res => {
                if (res.status) hideModals()
                else {
                    switch (res.code) {
                        case 0:
                        case 1:
                        case 2:
                        case 4:
                            setErrorMessage('Error interno de servidor');
                            break;
                        case 3:
                            setErrorMessage('Error en la sesión del usuario.');
                        case 5:
                            setErrorMessage('Pedido no encontrado');
                            break;
                        case 5:
                            setErrorMessage('Error al eliminar el pedido');
                            break;
                        default:
                            setErrorMessage('Error desconocido');
                    }
                }
            })
    }

    return (
        <div className="modal fade" id={ModalNames.DeleteRecordModal} tabindex="-1" aria-labelledby={`${ModalNames.DeleteRecordModal}Label`} aria-hidden="true">
            <div className="modal-dialog modal-md">
                <div className="modal-content">
                    <Form onSubmit={handleSubmit}>
                        <div className="modal-header d-flex justify-content-between align-items-start w-100">
                            <h3 className="mb-0">Eliminar pedido</h3>
                            <div>
                                <Button variant="link" onClick={hideModals}>
                                    <Icon path={mdiClose} size="20" color="red" />
                                </Button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <p className="mb-0">Realmente desea eliminar el pedido?</p>
                            <small><b><i>**Esta acción no se puede deshacer**</i></b></small>
                        </div>
                        <div className="modal-footer d-flex justify-content-between align-items-center w-100">
                            <div>
                                <ErrorElement className="my-0" />
                            </div>
                            <div>
                                <Button onClick={hideModals} variant="link" className="text-decoration-none text-secondary">Cancelar</Button>
                                <Button type="submit" variant="danger">Eliminar</Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div >
        </div >
    )
}

export default DeleteRecordModal;