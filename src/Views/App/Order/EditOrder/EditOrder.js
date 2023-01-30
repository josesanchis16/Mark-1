import React, { useEffect, useState } from 'react';
import { Button, Col, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import useMessageAlert from '../../../../Hooks/useMessageAlert';
import useRequest from '../../../../Hooks/useRequest';
import CardFooter from '../../../../Layouts/InnerLayouts/CardFooter';
import GeneralLayout from '../../../../Layouts/InnerLayouts/GeneralLayout';
import { ORDERS_PATH } from '../../../../Paths';
import { Endpoints, FolderName } from '../../../../Utils/Endpoints';

const EditOrder = () => {

    const { guid } = useParams();
    const { replace } = useHistory();
    const request = useRequest();

    const { MessageElement, setMessage } = useMessageAlert('newOrderMessageError');

    const [data, setData] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => { fetchData() }, [])

    const fetchData = () => {
        request('get', Endpoints(FolderName.ORDER).GET, { guid }, true)
            .then(res => {
                setData(res.order);
                setLoaded(true)
            }).catch(e => setMessage(e, setLoaded))
    }

    const handleSubmit = () => {
        request('post', Endpoints(FolderName.ORDER).CREATE, { order: data.inputs, ...data }, true)
            .then(res => replace(ORDERS_PATH))
            .catch(setMessage)
    }

    const handleText = e => {
        const { value, id } = e.target;
        setData({ ...data, [id]: value });
    }

    const handleInputText = (e, index) => {
        const { value } = e.target;
        const inputsCopy = [...data.inputs];
        inputsCopy[index].value = value;
        setData({ ...data, inputs: [...inputsCopy] });
    }

    return (
        <GeneralLayout
            showBackButton
            loaded={loaded}
            ErrorElement={MessageElement}
            title="Editar Orden">
            {data.inputs?.map((input, index) => (
                <FormGroup key={index} controlId={input.key} className="mb-2">
                    <Row>
                        <Col sm={12} md={4}>
                            <FormLabel>{input.label}:</FormLabel>
                        </Col>
                        <Col sm={12} md={8}>
                            {
                                input.identifier.includes('observaciones')
                                    ? <FormControl
                                        as="textarea"
                                        style={{ minHeight: 100, height: 150, maxHeight: 300 }}
                                        onChange={(e) => handleInputText(e, index)}
                                        value={input.value}
                                        placeholder={input.key} />
                                    : <FormControl
                                        value={input.value}
                                        onChange={(e) => handleInputText(e, index)}
                                        placeholder={input.key} />
                            }
                        </Col>
                    </Row>
                </FormGroup>
            ))}
            <CardFooter>
                <Button size="sm" onClick={handleSubmit}>Guardar</Button>
            </CardFooter>
        </GeneralLayout >
    )
}

export default EditOrder;