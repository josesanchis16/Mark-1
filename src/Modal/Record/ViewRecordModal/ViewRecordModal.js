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

const ViewRecordModal = ({ }) => {

    const { ErrorElement, setErrorMessage } = useMessageAlert('errorMessage');

    const { getModalData } = useModalManager(ModalNames.ViewRecordModal);
    const post = useRequest();

    const [machines, setMachines] = useState([]);
    const [users, setUsers] = useState([]);

    const [editMode, setEditMode] = useState(false);

    const [data, setData] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        getModalData(({ guid }) => {
            fetchData(guid)
        });
    }, [])

    const fetchData = (guid) => {
        post(Endpoints.GET_RECORD_BY_GUID, { guid }, true)
            .then(recordRes => {
                if (recordRes.status) {
                    setData({ ...recordRes.record, date: moment(recordRes.record.date).format("YYYY-MM-DD") });
                    post(Endpoints.GET_ALL_MACHINES, {}, true)
                        .then(machinesResponse => {
                            if (machinesResponse.status) {
                                setMachines(machinesResponse.machines);
                                post(Endpoints.GET_ALL_WORKERS, {}, true)
                                    .then(workersResponse => {
                                        if (workersResponse.status) {
                                            setUsers(workersResponse.users);
                                        }
                                    })
                            }
                            setLoaded(true);
                        })
                }
            })
    }

    const handleText = (e) => {
        const { id, value } = e.target;
        if (id === 'startDate' || id === "endDate") {
            let now = moment().format("YYYY-MM-DD HH:mm");
            setData({
                ...data,
                [id]: now
            })
        } else {
            setData({
                ...data,
                [id]: value
            })
        }
    }

    const handleSelect = (e) => {
        const { id, value, label } = e;
        setData({
            ...data,
            [`${id}id`]: value,
            [id]: e
        });
    }

    const handleSubmit = (e) => {
        e && e.preventDefault();
        if (checkForm()) {
            post(Endpoints.UPDATE_RECORD, { ...data }, true)
                .then(res => {
                    if (res.status) hideModals()
                    else {
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
                                setErrorMessage('Error al actualizar el pedido');
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
        const { recordNumber, userid, machineid, tirada, startDate } = data;
        return (recordNumber && Number.isInteger(+recordNumber) && userid && machineid && tirada && startDate);
    }

    return (
        <div className="modal fade" id={ModalNames.ViewRecordModal} tabindex="-1" aria-labelledby={`${ModalNames.ViewRecordModal}Label`} aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <Form onSubmit={handleSubmit}>
                        <div className="modal-header d-flex justify-content-between align-items-start w-100">
                            <h3 className="mb-0">Ver registro</h3>
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
                                                <Form.Label>No. Pedido</Form.Label>
                                                <Form.Control
                                                    value={data.recordNumber}
                                                    onChange={handleText}
                                                    placeholder="No. Pedido" />
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
                                                <Form.Label>Tirada <RequiredField /></Form.Label>
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
                                                    onChange={handleText}
                                                    value={data.date}
                                                    disabled={true}
                                                    placeholder="dd/mm/yyyy" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    {/* <Row>
                                        <Col xs={6}>
                                            <Form.Group controlId="startDate" className="mb-2">
                                                <Form.Label>Hora inicio</Form.Label>
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
                                                    disabled={!data.startDate || data.endDate}
                                                    onClick={handleText}
                                                    type="button"
                                                    min={data.startDate}
                                                    value={data.endDate && moment(data.endDate).format("HH:mm") || 'Finalizar'}
                                                    placeholder="dd/mm/yyyy" />
                                            </Form.Group>
                                        </Col>
                                    </Row> */}
                                </>
                                :
                                <div>
                                    <Loader />
                                </div>
                            }
                        </div>
                        {loaded &&
                            <div className="modal-footer d-flex justify-content-between align-items-center w-100">
                                <div>
                                    <ErrorElement className="mb-0" />
                                </div>
                                <div>
                                    <Button onClick={hideModals} variant="link" className="text-decoration-none text-secondary">Cancelar</Button>
                                    <Button variant="secondary" type="submit">Guardar</Button>
                                </div>
                            </div>
                        }
                    </Form>
                </div>
            </div >
        </div >
    )
}

export default ViewRecordModal