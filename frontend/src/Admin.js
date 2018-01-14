import React, { Component } from 'react';
import {
    Col,
    Container,
    Row,
    Form,
    FormGroup,
    Input,
    Button,
    Label,
    Table,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import client from './client';

export default class Admin extends Component {
    static contextTypes = {
        router: propTypes.object.isRequired
    };

    constructor() {
        super();
        document.title = 'Admin';

        this.state = {
            modal: false,
            posts: [],
            form: {
                title: '',
                content: ''
            }
        };
    }

    async componentDidMount() {
        const { router } = this.context;

        if ( !localStorage.getItem('TOKEN') )
        {
            return router.history.push('/login');
        }

        await this._sync();
    }

    async _save() {
        const { title, content } = this.state.form;

        try
        {
            const res = await client.post('/post/add', {
                title,
                content
            });

            this.setState({
                modal: false,
                form: {
                    title: '',
                    content: ''
                }
            });

            await this._sync();
        }
        catch(e)
        {
            console.error(e);
        }
    }

    async _delete(id) {
        try
        {
            const res = await client.post('/post/remove', {
                id
            });

            await this._sync();
        }
        catch(e)
        {
            console.error(e);
        }
    }

    async _sync() {
        const { data } = await client.post('/post/list');

        this.setState({
            posts: data
        });

        console.log(this.state);
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

    render() {
        return (
            <Container>
                <Nav/>
                <Modal isOpen={this.state.modal} toggle={e => this.setState({ modal: !this.state.modal })}>
                    <ModalHeader>
                        <i className="fa fa-book" style={{ marginRight: 5 }} />
                        Create article
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input type="text" name="title" id="title" onChange={e => this._change(e)} autoFocus />
                        </FormGroup>
                        <FormGroup>
                            <Label for="textarea">Content</Label>
                            <Input type="textarea" name="content" id="content" onChange={e => this._change(e)} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={e => this._save()}>Post article</Button>
                    </ModalFooter>
                </Modal>
                <Row style={{marginTop: 50, marginBottom: 30}}>
                    <Col xs={12}>
                        <Button color="success" onClick={e => this.setState({ modal: true })}>
                            Create post
                            <i className="fa fa-plus-circle" style={{marginLeft: 13}} />
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Content</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                                {this.state.posts.map((item, key) =>
                                    <tr key={key}>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.title}</td>
                                        <td>{`${item.content.slice(0, 50)}...`}</td>
                                        <td>
                                            <Button color="danger" style={{ marginRight: 10 }} onClick={e => this._delete(item.id)}>
                                                <i className="fa fa-trash-o" />
                                            </Button>
                                            <Link to={`/${item.id}`}>
                                                <i className="fa fa-eye" />
                                            </Link>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        );
    }
}