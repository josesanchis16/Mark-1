import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import ReactSelect from "react-select";
import Loader from "../../../Components/Loader/Loader";
import RequiredField from "../../../Components/RequiredField/RequiredField";
import useMessageAlert from "../../../Hooks/useMessageAlert";
import useModalManager from "../../../Hooks/useModalManager";
import useRequest from "../../../Hooks/useRequest";
import { Endpoints } from "../../../Utils/Endpoints";
import { hideModals } from "../../../Utils/GeneralFunctions";
import { ModalNames } from "../../../Utils/ModalNames";

const NewRecordModal = () => {

    const { ErrorElement, setErrorMessage } = useMessageAlert('errorMessage');

    const { onModalUpdate } = useModalManager(ModalNames.NewRecordModal);
    const post = useRequest();

    const [machines, setMachines] = useState([]);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);

    const [data, setData] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        onModalUpdate('show', () => fetchData());
        onModalUpdate('show', () => setData({
            recordNumber: '',
            user: null,
            userid: -1,
            machine: null,
            machineid: -1,
            description: '',
            tirada: '',
            date: moment(new Date()).format("YYYY-MM-DD"),
            startDate: null,
            endDate: null
        }));
    }, [])

    const fetchData = async () => {
        try {
            const machinesRes = await post(Endpoints.GET_ALL_MACHINES, {}, true);
            const usersRes = await post(Endpoints.GET_ALL_USERS, {}, true);
            const ordersRes = await post(Endpoints.GET_ALL_ORDERS, {}, true);

            if (machinesRes.status && usersRes.status && ordersRes.status) {
                setMachines(machinesRes.machines);
                setUsers(usersRes.users);
                setOrders(ordersRes.orders);
            }

            setLoaded(true);

        } catch (error) {
            console.log(error);
        }
    }

    const handleText = (e) => {
        const { id, value } = e.target;
        console.log(id);
        if (id === 'startDate') {
            let now = moment().format("YYYY-MM-DD HH:mm");
            setData({ ...data, [id]: now })
        } else setData({ ...data, [id]: value })
    }

    const handleSelect = (e) => {
        const { id, value, label } = e;
        setData({ ...data, [`${id}id`]: value, [id]: e });
    }

    const handleSubmit = (e) => {
        e && e.preventDefault();
        let now = moment().format("YYYY-MM-DD HH:mm");
        let newData = { ...data };
        newData.startDate = now;
        if (checkForm()) {
            post(Endpoints.SAVE_RECORD, { ...newData }, true)
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
        const { recordNumber, userid, machineid } = data;
        return (!!recordNumber && Number.isInteger(+recordNumber) && !!userid && !!machineid);
    }

    return (
        <div className="modal fade" id={ModalNames.NewRecordModal} tabindex="-1" aria-labelledby={`${ModalNames.NewRecordModal}Label`} aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <Form onSubmit={handleSubmit}>
                        <div className="modal-header d-flex justify-content-between align-items-start w-100">
                            <h3 className="mb-0">Nuevo registro</h3>
                            <div>
                                <Button variant="link" onClick={hideModals}>
                                    <Icon path={mdiClose} size="20" color="red" />
                                </Button>
                            </div>
                        </div>
                        <div className="modal-body">
                            {loaded ?
                                <>
                                    <Row>
                                        <Col sm={12} md={4}>
                                            <Form.Group controlId="recordNumber" className="mb-2">
                                                <Form.Label>No. Pedido <RequiredField /></Form.Label>
                                                <Form.Control
                                                    value={data.recordNumber}
                                                    onChange={handleText}
                                                    placeholder="No. Pedido" />
                                            </Form.Group>
                                        </Col>
                                        <Col sm={12} md={4}>
                                            <Form.Group controlId="orderid" className="mb-2">
                                                <Form.Label>Order de trabajo <RequiredField /></Form.Label>
                                                <ReactSelect
                                                    placeholder="Selecciona"
                                                    value={data.order}
                                                    options={orders.map((order, index) => ({ id: 'order', value: order.id, label: order.number }))}
                                                    onChange={handleSelect} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={12} md={6}>
                                            <Form.Group controlId="user" className="mb-2">
                                                <Form.Label>Operario <RequiredField /></Form.Label>
                                                <ReactSelect
                                                    placeholder="Selecciona"
                                                    value={data.user}
                                                    options={users.map((user, index) => ({ id: 'user', value: user.id, label: `${user.name} ${user.lastname ? ` ${user.lastname}` : ''}` }))}
                                                    onChange={handleSelect} />
                                            </Form.Group>
                                        </Col>
                                        <Col sm={12} md={6}>
                                            <Form.Group controlId="machine" className="mb-2">
                                                <Form.Label>Máquina <RequiredField /></Form.Label>
                                                <ReactSelect
                                                    placeholder="Selecciona"
                                                    value={data.machine}
                                                    options={machines.map((user, index) => ({ id: 'machine', value: user.id, label: `${user.name} ${user.lastname ? ` ${user.lastname}` : ''}` }))}
                                                    onChange={handleSelect} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={12}>
                                            <Form.Group controlId="tirada" className="mb-2">
                                                <Form.Label>Tirada</Form.Label>
                                                <Form.Control
                                                    onChange={handleText}
                                                    value={data.tirada}
                                                    placeholder="Tirada"
                                                />
                                            </Form.Group >
                                        </Col>
                                    </Row>
                                    <Row>
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
                                    </Row>
                                    <Row>
                                        <Col sm={12} md={6}>
                                            <Form.Group controlId="date" className="mb-2">
                                                <Form.Label>Fecha</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    value={data.date}
                                                    disabled={true}
                                                    placeholder="dd/mm/yyyy" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    {/* <Row>
                                        <Col xs={6}>
                                            <Form.Group controlId="startDate" className="mb-2">
                                                <Form.Label>Hora inicio </Form.Label>
                                                <Form.Control
                                                    disabled={data.startDate}
                                                    onClick={handleText}
                                                    type="button"
                                                    value={data.startDate && moment(data.startDate).format("HH:mm") || 'Empezar'}
                                                    placeholder="dd/mm/yyyy" />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group controlId="endDate" className="mb-2">
                                                <Form.Label>Hora fin</Form.Label>
                                                <Form.Control
                                                    disabled={true}
                                                    onChange={handleText}
                                                    type="button"
                                                    min={data.startDate}
                                                    value={data.endDate || 'Finalizar'}
                                                    placeholder="dd/mm/yyyy" />
                                            </Form.Group>
                                        </Col>
                                    </Row> */}
                                </>
                                :
                                <Loader />
                            }
                        </div>
                        <div className="modal-footer d-flex justify-content-between align-items-center w-100">
                            {loaded &&
                                <>
                                    <div>
                                        <ErrorElement className="my-0" />
                                    </div>
                                    <div>
                                        <Button onClick={hideModals} variant="link" className="text-decoration-none text-secondary">Cancel</Button>
                                        <Button variant="secondary" type="submit">Guardar</Button>
                                    </div>
                                </>}
                        </div>
                    </Form>
                </div>
            </div >
        </div >
    )
}

export default NewRecordModal;