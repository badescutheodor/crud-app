import React, { Component } from 'react';
import { Col, Container, Row, Form, FormGroup, Input, Button, Label, Alert } from 'reactstrap';
import Nav from './Nav';
import client from './client';
import propTypes from 'prop-types';

export default class Login extends Component {
    static contextTypes = {
        router: propTypes.object.isRequired
    };

    constructor() {
        super();
        document.title = 'Authenticate';
        this.state = {
            form: {
                username: '',
                password: '',
                error: false
            }
        }
    }

    componentDidMount() {
        const { router } = this.context;

        if ( localStorage.getItem('TOKEN') )
        {
            router.history.push('/admin');
        }
    }

    _change(e) {
        const { target } = e;

        this.setState({
            form: {
                ...this.state.form,
                [target.name]: target.value
            }
        });
    }

    async _login() {
        const { router } = this.context;
        const { username, password } = this.state.form;

        try
        {
            const res = await client.post('/login', {
                username,
                password
            });

            if ( res.headers.authorization )
            {
                const [name, token] = res.headers.authorization.split(" ");
                localStorage.setItem(name, token);
                router.history.push('/admin');
            }
        }
        catch(e)
        {
            this.setState({
                form: {
                    username: '',
                    password: '',
                    error: true
                }
            })
        }
    }

    onKeyPress(e) {
        if ( e.nativeEvent.which === 13 )
        {
            this._login().catch(console.error);
        }
    }

    render() {
        return (
            <Container>
                <Nav/>
                <Row style={{marginTop: 50}}>
                    <Col xs={{ size: 6, offset: 3 }}>
                        <Form>
                            <h2>Login</h2>
                            <br />
                            <Alert color="danger" isOpen={this.state.form.error} toggle={e => this.setState({ form: { ...this.state.form, error: false } })}>
                                Invalid credentials
                            </Alert>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input type="text" name="username" id="username" autoFocus onKeyPress={e => this.onKeyPress(e)} onChange={e => this._change(e)} value={this.state.username}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password" name="password" id="password" onKeyPress={e => this.onKeyPress(e)} onChange={e => this._change(e)} value={this.state.password} />
                            </FormGroup>
                            <Button onClick={e => this._login()}>Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}