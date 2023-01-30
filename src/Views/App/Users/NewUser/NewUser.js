import React, { useState } from 'react';
import { Button, Col, Form, FormControl, FormGroup, FormLabel, FormSelect, InputGroup, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import RequiredField from '../../../../Components/RequiredField/RequiredField';
import useMessageAlert from '../../../../Hooks/useMessageAlert';
import useRequest from '../../../../Hooks/useRequest';
import CardFooter from '../../../../Layouts/InnerLayouts/CardFooter';
import GeneralLayout from '../../../../Layouts/InnerLayouts/GeneralLayout';
import SectionLayout from '../../../../Layouts/InnerLayouts/SectionLayout';
import { USERS_PATH } from '../../../../Paths';
import { Endpoints, FolderName } from '../../../../Utils/Endpoints';
import { encryptString } from '../../../../Utils/GeneralFunctions';
import { Roles } from '../../../../Utils/Roles';

const NewUser = () => {

    const [data, setData] = useState({});

    const request = useRequest();
    const { replace } = useHistory();

    const { MessageElement, setMessage } = useMessageAlert('newUserMessageAlert');

    const [showPassword, setShowPassword] = useState(false);

    const handleText = e => {
        const { value, id } = e.target;
        setData({ ...data, [id]: value })
    }

    const generatePassword = () => {
        let finalPassword = Math.random().toString(36).slice(-8);
        handleText({ target: { id: 'password', value: finalPassword } });
    }

    const handleSubmit = (e) => {
        e && e.preventDefault();
        if (checkForm()) {
            request('post', Endpoints(FolderName.USER).CREATE, { ...data, password: encryptString(data.password) }, true)
                .then(res => replace(USERS_PATH))
                .catch(setMessage)
        } else setMessage('Revise todos los campos obligatorios');
    }

    const checkForm = () => {
        const { name, lastname, email, roleid, password } = data;
        return (!!name && !!lastname && !!email && !!roleid && !!password);
    }

    return (
        <GeneralLayout
            showBackButton
            ErrorElement={MessageElement}
            title="Nuevo Usuario">
            <Form onSubmit={handleSubmit}>
                <SectionLayout
                    title="Perfil"
                    description="Detalles sobre el perfil">
                    <FormGroup controlId='name' className='mb-2'>
                        <Row>
                            <Col sm={12} md={5}>
                                <FormLabel className='font-weight-bold'>Nombre: <RequiredField /></FormLabel>
                            </Col>
                            <Col sm={12} md={7}>
                                <FormControl
                                    value={data.name}
                                    onChange={handleText}
                                    placeholder="Nombre..." />
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup controlId='lastname' className='mb-2'>
                        <Row>
                            <Col sm={12} md={5}>
                                <FormLabel className='font-weight-bold'>Apellidos: <RequiredField /></FormLabel>
                            </Col>
                            <Col sm={12} md={7}>
                                <FormControl
                                    value={data.lastname}
                                    onChange={handleText}
                                    placeholder="Apellidos..." />
                            </Col>
                        </Row>
                    </FormGroup>
                </SectionLayout>
                <SectionLayout
                    title="Usuario"
                    description="Detalles sobre el usuario">
                    <FormGroup controlId='email' className='mb-2'>
                        <Row>
                            <Col sm={12} md={5}>
                                <FormLabel className='font-weight-bold'>Email: <RequiredField /></FormLabel>
                            </Col>
                            <Col sm={12} md={7}>
                                <FormControl
                                    value={data.email}
                                    onChange={handleText}
                                    placeholder="Email..." />
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup controlId='roleid' className='mb-2'>
                        <Row>
                            <Col sm={12} md={5}>
                                <FormLabel className='font-weight-bold'>Role: <RequiredField /></FormLabel>
                            </Col>
                            <Col sm={12} md={7}>
                                <FormSelect
                                    onChange={handleText}
                                    defaultValue="default">
                                    <option disabled value="default">Selecciona...</option>
                                    {Roles.slice(1, Roles.length).map((item, index) => (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))}
                                </FormSelect>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup controlId='password' className='mb-2'>
                        <Row>
                            <Col sm={12} md={5}>
                                <FormLabel className='font-weight-bold'>Contraseña: <RequiredField /></FormLabel>
                            </Col>
                            <Col sm={12} md={7}>
                                <InputGroup >
                                    <FormControl
                                        value={data.password}
                                        onChange={handleText}
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Contraseña..." />
                                    <Button
                                        onClick={() => setShowPassword(showPassword => !showPassword)}
                                        size="sm"
                                        className='px-3'
                                        variant="outline-secondary"
                                        id="button-addon2">
                                        {showPassword
                                            ? <i className='material-icons'>&#xe8f4;</i>
                                            : <i className='material-icons'>&#xe8f5;</i>
                                        }
                                    </Button>
                                </InputGroup>
                                <div className='d-flex justify-content-end align-items-center w-100 py-2'>
                                    <Button onClick={generatePassword} size="sm" variant="outline-secondary" className='py-0 px-2'>Generar</Button>
                                </div>
                            </Col>
                        </Row>
                    </FormGroup>
                </SectionLayout>
                <CardFooter>
                    <Button type="submit" size="sm" onClick={handleSubmit}>Guardar</Button>
                </CardFooter>
            </Form>
        </GeneralLayout>
    )
}

export default NewUser;