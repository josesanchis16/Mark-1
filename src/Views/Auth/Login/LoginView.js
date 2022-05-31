import React, { useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LoginView = () => {

    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});

    const checkForm = () => {
        return data.email && data.password && !errors.password && !errors.email;
    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Form onSubmit={() => { }} style={{ maxWidth: 500 }} className="w-100">
                <Card className="p-4 shadow rounded">
                    <Card.Header className='border-0 bg-white'>
                        <Card.Title as={"h3"} className="fw-normal mb-0">
                            Login
                        </Card.Title>
                    </Card.Header>
                    <Card.Body className="p-4">
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
                        <div className='d-flex justify-content-center align-items-center'>
                            <Button disabled={!checkForm()} type="submit" variant="outline-secondary" className="border-0">Login</Button>
                        </div>
                        <div className='w-100 d-flex justify-content-between align-items-center mt-2'>
                            <Link to={''}>Forgot Password</Link>
                            <Link to={''}>Create an account</Link>
                        </div>
                    </Card.Footer>
                </Card>
            </Form>
        </Container>
    )
}

export default LoginView;