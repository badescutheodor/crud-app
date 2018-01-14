import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import Nav from './Nav';
import client from './client';
import propTypes from 'prop-types';

export default class Post extends Component {
    static contextTypes = {
        router: propTypes.object.isRequired
    };

    constructor() {
        super();
        document.title = 'Blog';
        this.state = {
            title: '',
            content: ''
        }
    }

    async componentDidMount() {
        const { router } = this.context;
        const { id } =  router.route.match.params;

        try
        {
            const { data } = await client.post('/post/find', [id]);
            document.title = `Blog -${data[0].title}`;

            this.setState({
                title: data[0].title,
                content: data[0].content
            });
        }
        catch(e)
        {
            console.error(e);
        }
    }

    render() {
        const { title, content } = this.state;

        return (
            <Container>
                <Nav/>
                <Row style={{marginTop: 50}}>
                    <Col xs={12}>
                        <h2>{title}</h2>
                        <hr />
                        <p>{content}</p>
                    </Col>
                </Row>
            </Container>
        );
    }
}