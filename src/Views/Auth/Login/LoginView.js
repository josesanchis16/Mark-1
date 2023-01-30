import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import useCheckUser from '../../../Hooks/useCheckUser';
import { RECORDS_PATH } from '../../../Paths';
import { Endpoints, FolderName } from '../../../Utils/Endpoints';
import { StorageKeys } from '../../../Utils/StorageKeys';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import logo from '../../../Assets/images/castell_encuadernacion.png';
import useMessageAlert from '../../../Hooks/useMessageAlert';
import useRequest from '../../../Hooks/useRequest';
import { getSetUserAction } from '../../../Redux/Reducers/User/Actions';
import { encryptString } from '../../../Utils/GeneralFunctions';
import { Roles } from '../../../Utils/Roles';

const LoginView = () => {

    const dispatch = useDispatch();
    const request = useRequest();

    const { MessageElement, setMessage } = useMessageAlert('loginErrorMessage');
    const checkUser = useCheckUser();

    const { replace } = useHistory();

    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        checkUser()
            .then(loggedIn => {
                if (loggedIn) replace(RECORDS_PATH)
            })
    }, [])

    const handleEmail = (e) => {
        const { value } = e.target;
        let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
        let valid = pattern.test(value);
        if (value === '') valid = true;
        setData({ ...data, email: value, emailError: !valid });
    }

    const handlePassword = (e) => {
        const { value } = e.target;
        let pattern = /(?!^[0-9]*$)(?!^[a-zA-Z!@#$%^&*()_+=<>?]*$)^([a-zA-Z!@#$%^&*()_+=<>?0-9]{6,15})$/g;
        let valid = pattern.test(value);
        if (value === '') valid = true;
        setData({ ...data, password: value, passwordError: !valid });
    }

    const handleLogin = (e) => {
        e && e.preventDefault();
        if (checkForm) {
            request('post', Endpoints(FolderName.USER).LOGIN,
                {
                    email: data.email,
                    password: encryptString(data.password)
                })
                .then(res => {
                    localStorage.setItem(StorageKeys.TOKEN, res.user.token);
                    localStorage.setItem(StorageKeys.ROLE, encryptString(Roles.find(item => item.id === +res.user.role).name));
                    dispatch(getSetUserAction(res.user));
                    replace(RECORDS_PATH);
                })
                .catch(setMessage)
        } else setMessage('Revisa los campos requeridos');
    }

    const checkForm = () => {
        return data.email && data.password && !data.passwordError && !data.emailError;
    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Form onSubmit={handleLogin} style={{ maxWidth: 500 }} className="w-100 d-flex flex-column justify-content-center align-items-center">
                <img src={logo} alt="escandallo_logo" style={{ width: 256, height: 'auto' }} />
                <Card className="p-0 shadow rounded overflow-hidden" style={{ minWidth: 300 }}>
                    <Card.Header className='bg-white'>
                        <Card.Title as={"h3"} className="fw-normal mb-0 pb-3 d-flex justify-content-center align-items-center w-100">
                            Inicio de sesión
                        </Card.Title>
                    </Card.Header>
                    <Card.Body className="p-4">
                        <Form.Group controlId='email' className="mb-2">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                isInvalid={data.emailError}
                                value={data.email}
                                onChange={handleEmail}
                                placeholder="Type email..." />
                        </Form.Group>
                        <Form.Group controlId='password' className="mb-2">
                            <Form.Label>Contraseña:</Form.Label>
                            <Form.Control
                                isInvalid={data.passwordError}
                                type="password"
                                value={data.password}
                                onChange={handlePassword}
                                placeholder="Type password" />
                        </Form.Group>
                    </Card.Body>
                    <Card.Footer className="border-0 bg-white d-flex justify-content-center align-items-center flex-column">
                        <div className='w-100 d-flex justify-content-end align-items-center'>
                            <Button disabled={!checkForm()} type="submit" variant={checkForm() ? 'secondary' : 'outline-secondary'} className="border-0">Iniciar sesión</Button>
                        </div>
                    </Card.Footer>
                    <MessageElement />
                </Card>
            </Form>
        </Container>
    )
}

export default LoginView;