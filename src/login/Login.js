import React from 'react';
import Form from 'react-bootstrap/Form';
import { Button, Container } from 'react-bootstrap';

function Login() {

    const handleSubmission = () => { }

    return (
        <div className="App">
            <Container>
                <header className="App-header">
                <h3> Login:</h3>
                <div style={{ marginTop: "30px", width: "500px" }}>
                    <>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                        </Form>
                    </>
                    <div>
                        <Button className="button" size="sm" variant="info" onClick={() => handleSubmission()} style={{ marginRight: "10px" }}>Sign In</Button>
                        <Button className="button" size="sm" variant="info" onClick={() => handleSubmission()}>Login</Button>
                    </div>
                </div>
            </header>
            </Container>
        </div>
    );
}

export default Login;
