import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import Nav from './Nav';
import client from './client';

class ArticleItem extends Component {
    render() {
        const { article } = this.props;

        return (
            <Col xs={12} style={{margin: '20px 0'}}>
                <Link to={`/${article.id}`}>
                    <h3>{article.title}</h3>
                </Link>
                <hr />
                <p>{article.content.slice(0, 120)}...</p>
            </Col>
        );
    }
}

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
            posts: []
        }
    }

    async componentDidMount() {
        try
        {
            const { data } = await client.post('/post/list');

            this.setState({
                posts: data
            });
        }
        catch(e)
        {
            console.error(e);
        }
    }

    render() {
        return (
            <Container>
                <Nav/>
                <Row style={{marginTop: 50}}>
                    {this.state.posts.map((article, key) => <ArticleItem key={key} article={article}/>)}
                </Row>
            </Container>
        );
    }
}