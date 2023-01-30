import React, { useState } from 'react';
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Loader from '../../../../Components/Loader/Loader';
import RequiredField from '../../../../Components/RequiredField/RequiredField';
import useMessageAlert from '../../../../Hooks/useMessageAlert';
import useRequest from '../../../../Hooks/useRequest';
import CardFooter from '../../../../Layouts/InnerLayouts/CardFooter';
import GeneralLayout from '../../../../Layouts/InnerLayouts/GeneralLayout';
import { ORDERS_PATH } from '../../../../Paths';
import { Endpoints, FolderName } from '../../../../Utils/Endpoints';

const NewOrder = () => {

    const { push } = useHistory();
    const request = useRequest();

    const { MessageElement, setMessage } = useMessageAlert('newOrderMessageError');

    const [data, setData] = useState({ serie: '1' });
    const [orderFetched, setOrderFetched] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [fetching, setFetching] = useState(false);

    const search = (e) => {
        e && e.preventDefault();
        if (checkForm()) {
            setLoaded(true);
            setFetching(true);
            request('get', Endpoints(FolderName.ORDER).SEARCH, { ...data }, true)
                .then(res => {
                    setOrderFetched(res.order);
                    setFetching(false);
                }).catch(e => setMessage(e, setLoaded))
        } else setMessage('Revise los campos requeridos');
    }

    const handleSubmit = () => {
        request('post', Endpoints(FolderName.ORDER).CREATE, { order: orderFetched, ...data }, true)
            .then(res => push(ORDERS_PATH))
            .catch(setMessage)
    }

    const handleText = e => {
        const { value, id } = e.target;
        setData({ ...data, [id]: value });
    }

    const handleInputText = (e, index) => {
        const { value } = e.target;
        const orderFetchedCopy = [...orderFetched];
        orderFetchedCopy[index].value = value;
        setOrderFetched([...orderFetchedCopy]);
    }

    const checkForm = () => {
        const { numero, serie } = data;
        return (!!numero && !!serie);
    }

    return (
        <GeneralLayout
            showBackButton
            isPanel={false}
            title="Nueva Orden">
            <div className='mb-3 overflow-hidden bg-white rounded shadow p-1 p-md-4'>
                <MessageElement />
                <Form onSubmit={search} className='p-1'>
                    <Row className='mb-2'>
                        <Col sm={12} md={6}>
                            <FormGroup controlId='numero'>
                                <FormLabel>N. Orden: <RequiredField /></FormLabel>
                                <FormControl
                                    value={data.numero}
                                    placeholder="N. Orden"
                                    onChange={handleText} />
                            </FormGroup>
                        </Col>
                        <Col sm={12} md={6}>
                            <FormGroup controlId='serie'>
                                <FormLabel>Serie: <RequiredField /></FormLabel>
                                <FormControl
                                    value={data.serie}
                                    placeholder="N. Orden"
                                    onChange={handleText} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <div className='w-100 d-flex justify-content-end align-items-center'>
                        <Button type="submit" size="sm">Buscar</Button>
                    </div>
                </Form>
            </div>
            <div className='mb-3 p-2 p-md-4 bg-white rounded shadow'>
                {loaded ?
                    fetching ? <Loader />
                        : <div>
                            {orderFetched.map((input, index) => (
                                <FormGroup key={index} controlId={input.key} className="mb-2">
                                    <Row>
                                        <Col sm={12} md={4}>
                                            <FormLabel>{input.label}:</FormLabel>
                                        </Col>
                                        <Col sm={12} md={8}>
                                            {
                                                input.key.includes('observaciones')
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
                        </div>
                    :
                    <div className='p-5'>
                        <p className='mb-0 text-center text-muted'>Utiliza el buscador para encontrar la orden de trabajo.</p>
                    </div>
                }
            </div>
        </GeneralLayout >
    )
}

export default NewOrder;