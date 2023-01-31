import React, { useEffect, useState } from 'react';
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import RequiredField from '../../../../Components/RequiredField/RequiredField';
import useMessageAlert from '../../../../Hooks/useMessageAlert';
import useRequest from '../../../../Hooks/useRequest';
import CardFooter from '../../../../Layouts/InnerLayouts/CardFooter';
import GeneralLayout from '../../../../Layouts/InnerLayouts/GeneralLayout';
import { MACHINES_PATH } from '../../../../Paths';
import { Endpoints, FolderName } from '../../../../Utils/Endpoints';

const EditUser = () => {

    const request = useRequest();
    const { guid } = useParams();
    const { replace } = useHistory();

    const { MessageElement, setMessage } = useMessageAlert('editMachineErrorMessage');

    const [data, setData] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => { fetchData() }, [])

    const fetchData = () => {
        request('get', Endpoints(FolderName.MACHINES).GET, { guid }, true)
            .then(res => {
                setData(res.machine);
                setLoaded(true);
            }).catch(e => setMessage(e, setLoaded))
    }

    const handleText = e => {
        const { id, value } = e.target;
        setData({ ...data, [id]: value })
    }

    const handleSubmit = (e) => {
        e && e.preventDefault();
        if (checkForm()) {
            request('post', Endpoints(FolderName.MACHINES).UPDATE, { ...data }, true)
                .then(res => { replace(MACHINES_PATH) })
                .catch(setMessage)
        } else setMessage('Revise todos los campos obligatorios')
    }

    const checkForm = () => {
        const { name } = data;
        return !!name;
    }

    return (
        <GeneralLayout
            loaded={loaded}
            ErrorElement={MessageElement}
            showBackButton
            title="Editar Máquina">
            <Form onSubmit={handleSubmit}>
                <FormGroup controlId="name" className="mb-2">
                    <Row>
                        <Col sm={12} md={6}>
                            <FormLabel className='font-weight-bold'>Nombre: <RequiredField /></FormLabel>
                        </Col>
                        <Col sm={12} md={6}>
                            <FormControl
                                value={data.name}
                                onChange={handleText}
                                placeholder="Nombre" />
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup controlId="description" className="mb-2">
                    <Row>
                        <Col sm={12} md={6}>
                            <FormLabel className='font-weight-bold'>Descripción:</FormLabel>
                        </Col>
                        <Col sm={12} md={6}>
                            <FormControl
                                style={{ maxHeight: 200, minHeight: 100 }}
                                as="textarea"
                                value={data.description}
                                onChange={handleText}
                                placeholder="Descripción" />
                        </Col>
                    </Row>
                </FormGroup>
                <CardFooter>
                    <Button type="submit" size="sm" onClick={handleSubmit}>Guardar</Button>
                </CardFooter>
            </Form>
        </GeneralLayout>
    )
}

export default EditUser;