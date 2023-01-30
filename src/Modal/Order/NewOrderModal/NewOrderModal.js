import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Loader from "../../../Components/Loader/Loader";
import RequiredField from "../../../Components/RequiredField/RequiredField";
import useMessageAlert from "../../../Hooks/useMessageAlert";
import useModalManager from "../../../Hooks/useModalManager";
import useRequest from "../../../Hooks/useRequest";
import { Endpoints } from "../../../Utils/Endpoints";
import { hideModals } from "../../../Utils/GeneralFunctions";
import { ModalNames } from "../../../Utils/ModalNames";

const NewOrderModal = () => {

    const { MessageElement: ErrorElement, setMessage: setErrorMessage } = useMessageAlert('errorMessage');

    const { onModalUpdate } = useModalManager(ModalNames.NewOrderModal);
    const post = useRequest();

    const [data, setData] = useState({});

    const [loadingInputData, setLoadingInputData] = useState(false);
    const [inputData, setInputData] = useState([]);

    useEffect(() => {
        onModalUpdate('show', () => setData({
            year: '',
            date: '',
            amount: '',
            refClient: '',
            deliveryDate: '',
            number: '',
            description: '',
        }));
    }, []);

    const handleText = (e) => {
        const { id, value } = e.target;
        setData({ ...data, [id]: value })
    }

    const handleInputsData = () => {
        setLoadingInputData(true);
        setInputData(['']);
        //post("")
        //.then(res => {
        setTimeout(() => {
            setLoadingInputData(false);
        }, 2000)
        //setInputData(res.inputs);
        //})
    }

    const handleSubmit = (e) => {
        e && e.preventDefault();
        if (checkForm()) {
            post(Endpoints.SAVE_ORDER, { ...data }, true)
                .then(res => {
                    if (res.status) {
                        hideModals();
                    } else {
                        switch (res.code) {
                            case 0:
                            case 1:
                                setErrorMessage('Error interno de servidor');
                                break;
                            case 2:
                            case 3:
                                setErrorMessage('Error en la sesión del usuario.');
                                break;
                            case 4:
                                setErrorMessage('Error al crear el pedido');
                                break;
                            default:
                                setErrorMessage('Error desconocido');
                        }
                    }
                })
        } else {
            setErrorMessage('Revise los campos requeridos');
        }
    }

    const checkForm = () => {
        const { number, amount } = data;
        return (!!number && Number.isInteger(+number) && !!amount && Number.isInteger(+amount));
    }

    return (
        <div className="modal fade" id={ModalNames.NewOrderModal} tabindex="-1" aria-labelledby={`${ModalNames.NewOrderModal}Label`} aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <Form onSubmit={handleSubmit}>
                        <div className="modal-header d-flex justify-content-between align-items-start w-100">
                            <h3 className="mb-0">Nueva orden</h3>
                            <div>
                                <Button variant="link" onClick={hideModals}>
                                    <Icon path={mdiClose} size="20" color="red" />
                                </Button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <Row>
                                <Col sm={12} md={4} className="d-flex justify-content-center align-items-end">
                                    <Form.Group controlId="number">
                                        <Form.Label>No. Pedido <RequiredField /></Form.Label>
                                        <Form.Control
                                            value={data.number}
                                            onChange={handleText}
                                            placeholder="No. Pedido" />
                                    </Form.Group>
                                </Col>
                                <Col sm={12} md={4} className="d-flex justify-content-center align-items-end">
                                    <Form.Group controlId="serie">
                                        <Form.Label>Serie <RequiredField /></Form.Label>
                                        <Form.Control
                                            value={data.serie}
                                            onChange={handleText}
                                            placeholder="Serie" />
                                    </Form.Group>
                                </Col>
                                <Col sm={12} md={4} className="d-flex justify-content-center align-items-end">
                                    <Button onClick={handleInputsData} className="w-100">Buscar</Button>
                                </Col>
                            </Row>

                            {/* Inputs */}
                            {inputData.length > 0 &&
                                (loadingInputData ?
                                    <div className="p-5 d-flex justify-content-center align-items-center w-100">
                                        <Loader />
                                    </div>
                                    :
                                    <div>
                                        <pre>{JSON.stringify(inputData, null, 4)}</pre>
                                    </div>)
                            }

                            {/* Uncomment when we want to activate the observation section */}
                            {/* <Row>
                                <Col sm={12}>
                                    <Form.Group controlId="description" className="mb-2">
                                        <Form.Label>Observaciones</Form.Label>
                                        <Form.Control
                                            style={{ minHeight: 100, maxHeight: 200 }}
                                            as="textarea"
                                            value={data.description}
                                            onChange={handleText}
                                            placeholder="Observaciones" />
                                    </Form.Group>
                                </Col>
                            </Row> */}
                        </div>
                        <div className="modal-footer d-flex justify-content-between align-items-center w-100">
                            <div>
                                <ErrorElement className="my-0" />
                            </div>
                            <div>
                                <Button onClick={hideModals} variant="link" className="text-decoration-none text-secondary">Cancel</Button>
                                <Button variant="secondary" type="submit">Guardar</Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div >
        </div >
    )
}

export default NewOrderModal;