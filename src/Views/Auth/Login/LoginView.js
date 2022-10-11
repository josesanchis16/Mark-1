import React, { useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { APP_PATH } from '../../../Paths';

const LoginView = () => {

    const { replace } = useHistory();

    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});

    const checkForm = () => {
        return data.email && data.password && !errors.password && !errors.email;
    }

    const handleForm = (e) => {
        e.preventDefault();
        replace(APP_PATH)
    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Form onSubmit={handleForm} style={{ maxWidth: 350 }} className="w-100 d-flex flex-column justify-content-center align-items-center">
                <Card className="p-4 shadow rounded w-100">
                    <Card.Header className='border-0 bg-white'>
                        <Card.Title as={"h3"} className="fw-normal mb-0">
                            Login
                        </Card.Title>
                    </Card.Header>
                    <Card.Body className="p-3">
                        <Form.Group controlId='email' className="mb-2">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                value={data.email}
                                placeholder="Type email..." />
                        </Form.Group>
                        <Form.Group controlId='password' className="mb-2">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                value={data.password}
                                placeholder="Type password" />
                        </Form.Group>
                    </Card.Body>
                    <Card.Footer className="border-0 bg-white">
                        <div className='d-flex justify-content-end align-items-center'>
                            <Button type="submit" variant="secondary" className="border-0">Login</Button>
                        </div>
                    </Card.Footer>
                </Card>
                <div className='w-100 px-3 d-flex justify-content-between align-items-center mt-2'>
                    <Link to={''}>Forgot Password</Link>
                    <Link to={''}>Create account</Link>
                </div>
            </Form>
        </Container>
    )
}

export default LoginView;